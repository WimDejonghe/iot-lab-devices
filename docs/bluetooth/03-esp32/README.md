---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# MicroPython voor ESP32

Dit is de MicroPython code die op de esp32 kan draaien. 
Pas naam van uw device aan en zorg voor unieke UUID's.

```python
#deze code draait op de esp32 en zal via Bluetooth beschikbaar zijn voor connectie.
#deze code draait goed op de ESP32 feather V1
#een RPI wordt gebruikt om connectie te kunnen maken met de ESP32.
#code op de rpi is ble_mqtt_bridge.py
#die code op de rpi zal connectie maken met de ESP32 via BLE en zal anderszijds connectie leggen met een MQTT broker.
#bidirectionele comm is dan mogelijk.
#Beide codes staan op mijn laptop :
#C:\Users\u0113763\OneDrive - Hogeschool VIVES\VIVES\VakkenHBO5\esp32\python\bluetooth


import bluetooth
import time
from micropython import const

# ---------------------------------------------------------
# BLE events
# ---------------------------------------------------------

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)

# ---------------------------------------------------------
# Nordic UART Service UUID's: PAS CODES AAN !!!!!
# ---------------------------------------------------------

_UART_UUID = bluetooth.UUID(
    "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" #zorg hier voor unieke codes!!!!
)

_UART_TX = bluetooth.UUID(
    "6E400003-B5A3-F393-E0A9-E50E24DCCA9E" #zorg hier voor unieke codes!!!!
)

_UART_RX = bluetooth.UUID(
    "6E400002-B5A3-F393-E0A9-E50E24DCCA9E" #zorg hier voor unieke codes!!!!
)


class BLEUART:

    def __init__(self, name="ESP32-Feather"):

        self.name = name

        self.ble = bluetooth.BLE()
        self.ble.active(True)
        self.ble.irq(self._irq)

        ((self.tx_handle, self.rx_handle),) = \
            self.ble.gatts_register_services([
                (
                    _UART_UUID,
                    (
                        (_UART_TX, bluetooth.FLAG_NOTIFY),
                        (_UART_RX, bluetooth.FLAG_WRITE),
                    ),
                ),
            ])

        self.connections = set()

        self.last_command = None

        self._advertise()

    # -------------------------------------------------

    def _irq(self, event, data):

        if event == _IRQ_CENTRAL_CONNECT:

            conn_handle, _, _ = data

            self.connections.add(conn_handle)

            print("BLE verbonden")

        elif event == _IRQ_CENTRAL_DISCONNECT:

            conn_handle, _, _ = data

            self.connections.discard(conn_handle)

            print("BLE verbroken")

            self._advertise()

        elif event == _IRQ_GATTS_WRITE:

            conn_handle, value_handle = data

            if value_handle == self.rx_handle:

                data = self.ble.gatts_read(self.rx_handle)

                try:

                    self.last_command = data.decode().strip()

                    print(
                        "Ontvangen:",
                        self.last_command
                    )

                except:

                    pass

    # -------------------------------------------------

    def send(self, text):

        if isinstance(text, str):

            text = text.encode()

        for conn in self.connections:

            self.ble.gatts_notify(
                conn,
                self.tx_handle,
                text
            )

    # -------------------------------------------------

    def connected(self):

        return len(self.connections) > 0

    # -------------------------------------------------

    def get_command(self):

        cmd = self.last_command

        self.last_command = None

        return cmd

    # -------------------------------------------------

    def _advertise(self):

        payload = bytearray(b"\x02\x01\x06")

        name = self.name.encode()

        payload += bytes(
            [len(name)+1, 0x09]
        )

        payload += name

        self.ble.gap_advertise(
            100000,
            adv_data=payload
        )

        print("Advertising...")


# =====================================================
# HOOFDPROGRAMMA
# =====================================================

ble = BLEUART()

teller = 0

while True:

    if ble.connected():

        # iedere seconde teller versturen

        ble.send(f"TELLER:{teller}")

        teller += 1

        # is er een opdracht ontvangen?

        cmd = ble.get_command()

        if cmd is not None:

            print("COMMAND =", cmd)

            # voorbeeld

            if cmd == "LEDON":

                print("LED moet aan")

            elif cmd == "LEDOFF":

                print("LED moet uit")

    time.sleep(1)

```