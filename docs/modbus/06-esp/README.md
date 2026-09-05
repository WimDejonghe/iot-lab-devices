# Hoofdstuk 6 — ESP32 & MicroPython

## 6.1 Waarom geen externe Modbus-bibliotheek?

Er bestaan MicroPython-bibliotheken voor Modbus (bv. `umodbus`), maar voor een eenvoudige ESP32 die
enkel coils moet schrijven en discrete inputs moet lezen, is dat niet nodig. Een Modbus TCP-bericht
is — zoals je in hoofdstuk 4 zag — simpel genoeg om als ruwe bytes over een gewone `socket`-
verbinding te versturen. Dit heeft als voordeel:
- geen extra bibliotheek nodig (minder geheugengebruik op de ESP32);
- volledig inzicht in wat er precies verstuurd wordt (nuttig om te leren).

## 6.2 WiFi verbinden

```python
import network
import time

SSID = "jouw_wifi_ssid"
PASSWORD = "jouw_wifi_wachtwoord"

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

while not wlan.isconnected():
    time.sleep(0.5)

print("ESP32 IP:", wlan.ifconfig()[0])
```

> **Belangrijk:** de ESP32 moet in hetzelfde subnet zitten als de relaismodule
> (`192.168.1.x/24`), anders kan er geen TCP-verbinding tot stand komen.

## 6.3 Een Modbus TCP-frame opbouwen

Zoals gezien in hoofdstuk 4, bestaat een Modbus TCP-bericht uit een MBAP-header (7 bytes) gevolgd
door de PDU (functiecode + data). In Python bouw je dit op met een `bytearray`:

```python
frame = bytearray()
frame += transaction_id.to_bytes(2, 'big')
frame += protocol_id.to_bytes(2, 'big')
frame += length.to_bytes(2, 'big')
frame += bytes([slave_id, function_code])
frame += register_address.to_bytes(2, 'big')
frame += value.to_bytes(2, 'big')
```

`to_bytes(2, 'big')` zet een geheel getal om naar 2 bytes in **big-endian** volgorde (meest
significante byte eerst) — dit is de byte-volgorde die Modbus gebruikt.

## 6.4 Functie: relais schrijven (functiecode 0x05)

```python
import socket

RELAY_IP = "192.168.1.200"
RELAY_PORT = 502
SLAVE_ID = 0x01

def modbus_write_coil(channel, state):
    """
    channel: 0-7 (relais 1 t/m 8, 0-based)
    state: True = aan, False = uit
    """
    coil_addr = channel
    value = 0xFF00 if state else 0x0000

    frame = bytearray()
    frame += (0x0000).to_bytes(2, 'big')  # transaction id
    frame += (0x0000).to_bytes(2, 'big')  # protocol id
    frame += (0x0006).to_bytes(2, 'big')  # lengte
    frame += bytes([SLAVE_ID, 0x05])
    frame += coil_addr.to_bytes(2, 'big')
    frame += value.to_bytes(2, 'big')

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)
    try:
        s.connect((RELAY_IP, RELAY_PORT))
        s.send(frame)
        response = s.recv(16)
        return response
    finally:
        s.close()
```

## 6.5 Functie: discrete input lezen (functiecode 0x02)

```python
def modbus_read_discrete_input(channel):
    """Leest de status van één DI-kanaal (0-7)."""
    frame = bytearray()
    frame += (0x0000).to_bytes(2, 'big')
    frame += (0x0000).to_bytes(2, 'big')
    frame += (0x0006).to_bytes(2, 'big')
    frame += bytes([SLAVE_ID, 0x02])
    frame += channel.to_bytes(2, 'big')   # start adres
    frame += (0x0001).to_bytes(2, 'big')  # aantal ingangen

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)
    try:
        s.connect((RELAY_IP, RELAY_PORT))
        s.send(frame)
        response = s.recv(16)
        # response: [MBAP header (7 bytes)][slave][func][bytecount][databyte]
        status_byte = response[9]
        return bool(status_byte & 0x01)
    finally:
        s.close()
```

## 6.6 De opbouw van de response ontleden

Een typische response op een `Read Discrete Inputs`-verzoek ziet er zo uit:

```
00 00 00 00 00 04 01 02 01 00
```

| Bytes | Betekenis |
|---|---|
| `00 00` | Transaction ID (zelfde als in het request) |
| `00 00` | Protocol ID |
| `00 04` | Lengte: nog 4 bytes |
| `01` | Unit ID |
| `02` | Functiecode (bevestigt: dit is een antwoord op Read Discrete Inputs) |
| `01` | Aantal databytes dat volgt |
| `00` | De eigenlijke statusbyte — bit 0 = kanaal 1, bit 1 = kanaal 2, enz. |

Vandaar `response[9]` in de code hierboven: index 0-6 is de MBAP-header + unit ID, index 7 is de
functiecode, index 8 is het bytecount-veld, en index 9 is de eerste (en hier enige) databyte.

## 6.7 Foutafhandeling

Netwerkcommunicatie kan altijd falen (timeout, verbroken verbinding, ...). Vang dit af met
`try/except`, zodat je hoofdlus niet crasht bij een tijdelijk netwerkprobleem:

```python
try:
    modbus_write_coil(0, True)
except Exception as e:
    print("Modbus fout:", e)
```

## 6.8 Kortstondige versus blijvende verbinding

De voorbeeldfuncties hierboven openen en sluiten telkens een nieuwe TCP-verbinding. Dit is
eenvoudig en robuust voor low-frequency toepassingen (bv. elke paar seconden een commando), maar
minder efficiënt bij snelle, herhaalde communicatie. Voor de labo's in deze cursus volstaat de
kortstondige-verbindingaanpak ruimschoots.

## 6.9 Wat volgt

In de labo's die volgen ga je deze bouwstenen combineren: relais aansturen, ingangen uitlezen, en
uiteindelijk eenvoudige input/output-logica implementeren op de ESP32.
