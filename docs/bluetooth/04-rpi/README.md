---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Python code RPi

Dit is de Python code die op de Raspberry Pi kan draaien. 
Pas de code aan in analogie met uw aanpassingen bij de ESP32 code.

```python
#deze code draait in een environment op de RPI waarin bleak en paho zijn geinstalleerd
#code zoekt naar ESP32

import asyncio
import threading
import time

import paho.mqtt.client as mqtt
from bleak import BleakScanner, BleakClient


# ============================================================
# INSTELLINGEN
# ============================================================

DEVICE_NAME = "ESP32-Feather"

#kies uw broker
MQTT_BROKER = "***********________***********"
MQTT_PORT = 1883
#ga zelf na of er credentials nog moeten worden toegevoegd op toegang te krijgen tot de broker.

#kies uw topics op de broker
MQTT_DATA_TOPIC = "????????/esp32/data"
MQTT_CMD_TOPIC = "????????/esp32/cmd"

#deze volgende parameters moeten identiek zijn aan de parameters (best ook uniek) aan die de parameters op de ESP32
UART_SERVICE_UUID = (
    "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
)

UART_TX_UUID = (
    "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
)

UART_RX_UUID = (
    "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
)


# ============================================================
# GLOBALE VARIABELEN
# ============================================================

ble_client = None
ble_rx = None

ble_connected = False
mqtt_connected = False

ble_loop = None


# ============================================================
# MQTT
# ============================================================

def mqtt_on_connect(client, userdata, flags, reason_code, properties=None):

    global mqtt_connected

    if reason_code == 0:

        mqtt_connected = True

        print("MQTT verbonden met", MQTT_BROKER)

        client.subscribe(MQTT_CMD_TOPIC)

        print(
            "MQTT subscribe:",
            MQTT_CMD_TOPIC
        )

    else:

        mqtt_connected = False

        print(
            "MQTT verbinding mislukt:",
            reason_code
        )


def mqtt_on_disconnect(client, userdata, disconnect_flags, reason_code, properties=None):

    global mqtt_connected

    mqtt_connected = False

    print("MQTT verbinding verbroken")


def mqtt_on_message(client, userdata, msg):

    print()
    print(
        "MQTT -> Python:",
        msg.topic,
        msg.payload.decode()
    )

    command = msg.payload.decode().strip()

    # Commando via BLE naar ESP32 sturen
    if ble_loop is not None:

        asyncio.run_coroutine_threadsafe(
            send_ble(command),
            ble_loop
        )


def start_mqtt():

    client = mqtt.Client(
        mqtt.CallbackAPIVersion.VERSION2
    )

    client.on_connect = mqtt_on_connect
    client.on_disconnect = mqtt_on_disconnect
    client.on_message = mqtt_on_message

    print()
    print("Verbinden met MQTT broker:")
    print(MQTT_BROKER)

    client.connect(
        MQTT_BROKER,
        MQTT_PORT,
        60
    )

    client.loop_start()

    return client

# ============================================================
# BLE NOTIFICATIES
# ============================================================

def ble_notification_handler(sender, data):

    bericht = data.decode(
        "utf-8",
        errors="replace"
    ).strip()

    print()
    print(
        "BLE -> Python:",
        bericht
    )

    # BLE-data naar MQTT publiceren
    if mqtt_client is not None:

        result = mqtt_client.publish(
            MQTT_DATA_TOPIC,
            bericht
        )

        if result.rc == mqtt.MQTT_ERR_SUCCESS:

            print(
                "Python -> MQTT:",
                MQTT_DATA_TOPIC,
                "=",
                bericht
            )

        else:

            print(
                "MQTT publish fout:",
                result.rc
            )


# ============================================================
# BLE VERBINDEN
# ============================================================

async def connect_ble():

    global ble_client
    global ble_rx
    global ble_connected

    print()
    print("Zoeken naar ESP32...")

    device = await BleakScanner.find_device_by_name(
        DEVICE_NAME,
        timeout=10
    )

    if device is None:

        print("ESP32 niet gevonden")

        return False

    print(
        "ESP32 gevonden:",
        device.address
    )

    try:

        ble_client = BleakClient(device)

        await ble_client.connect()

        print("BLE verbonden")

        services = ble_client.services

        # TX
        tx = services.get_characteristic(
            UART_TX_UUID
        )

        # RX
        ble_rx = services.get_characteristic(
            UART_RX_UUID
        )

        if tx is None:

            print("TX characteristic niet gevonden")

            await ble_client.disconnect()

            return False

        if ble_rx is None:

            print("RX characteristic niet gevonden")

            await ble_client.disconnect()

            return False

        # Notificaties activeren
        await ble_client.start_notify(
            tx,
            ble_notification_handler
        )

        ble_connected = True

        print(
            "BLE notificaties actief"
        )

        return True

    except Exception as e:

        print(
            "BLE verbindingsfout:",
            e
        )

        ble_connected = False

        return False


# ============================================================
# DATA VIA BLE NAAR ESP32 STUREN
# ============================================================

async def send_ble(message):

    global ble_connected

    if not ble_connected:

        print(
            "BLE niet verbonden - commando niet verzonden:"
        )

        print(message)

        return

    try:

        print(
            "Python -> BLE:",
            message
        )

        await ble_client.write_gatt_char(
            ble_rx,
            (message + "\n").encode("utf-8")
        )

        print("BLE commando verzonden")

    except Exception as e:

        print(
            "Fout bij BLE verzenden:",
            e
        )

        ble_connected = False


# ============================================================
# BLE VERBINDING BEWAKEN
# ============================================================

async def ble_loop_main():

    global ble_loop

    ble_loop = asyncio.get_running_loop()

    while True:

        if not ble_connected:

            await connect_ble()

        await asyncio.sleep(5)

# ============================================================
# HOOFDPROGRAMMA
# ============================================================

mqtt_client = None


async def main():

    global mqtt_client

    print()
    print("==========================================")
    print(" ESP32 BLE <-> MQTT bridge")
    print("==========================================")
    print()

    # MQTT starten
    mqtt_client = start_mqtt()

    # BLE blijven bewaken
    await ble_loop_main()


try:

    asyncio.run(main())

except KeyboardInterrupt:

    print()
    print("Programma gestopt")

finally:

    if mqtt_client is not None:

        mqtt_client.loop_stop()
        mqtt_client.disconnect()






```