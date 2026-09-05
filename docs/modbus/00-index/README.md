# Cursus Modbus RTU & TCP — met praktijkcase Waveshare Modbus POE ETH Relay (B) + ESP32

Welkom bij deze basiscursus Modbus. De cursus combineert theorie over het Modbus-protocol
(RTU en TCP) met praktische labo-opdrachten op een **Waveshare Modbus POE ETH Relay (B)**-module,
aangestuurd door een **ESP32 in MicroPython**.

## Doelgroep en voorkennis

- Je hebt basiskennis van netwerken (IP-adressen, subnetten, TCP/IP).
- Je hebt basiskennis van programmeren (Python/MicroPython).
- Je beschikt over een ESP32-bord met MicroPython-firmware, en een Waveshare Modbus POE ETH
  Relay (B)-module.

## Leerdoelen

Na deze cursus kan je:
- de opbouw en werking van het Modbus-protocol uitleggen (RTU en TCP);
- het onderscheid maken tussen coils, discrete inputs, holding registers en input registers;
- een Modbus TCP-frame manueel opbouwen en interpreteren;
- de Waveshare Modbus POE ETH Relay (B)-module configureren en testen;
- een ESP32 in MicroPython gebruiken om relaisuitgangen aan te sturen en digitale ingangen
  uit te lezen via Modbus TCP;
- eenvoudige input/output-logica implementeren op basis van Modbus-communicatie.

## Inhoudsopgave

### Theorie

| Hoofdstuk | Onderwerp |
|---|---|
| [01 — Inleiding tot Modbus](01_inleiding_modbus.md) | Geschiedenis, toepassingen, terminologie |
| [02 — Modbus basisprincipes](02_modbus_basisprincipes.md) | Datamodel, functiecodes, request/response |
| [03 — Modbus RTU](03_modbus_rtu.md) | Frame-opbouw, CRC16, seriële parameters |
| [04 — Modbus TCP](04_modbus_tcp.md) | MBAP-header, poort 502, RTU vs TCP |
| [05 — Waveshare Modbus POE ETH Relay (B)](05_waveshare_relay_module.md) | Hardware, registers, configuratie |
| [06 — ESP32 & MicroPython](06_esp32_micropython.md) | WiFi, sockets, Modbus-frames bouwen |

### Labo's

| Labo | Onderwerp |
|---|---|
| [Labo 1 — Module configureren en testen](07_labo1_module_configureren.md) | Vircom, sscom, Modbus TCP-protocol instellen |
| [Labo 2 — Relais aansturen vanaf ESP32](08_labo2_relais_aansturen.md) | Coils schrijven via MicroPython |
| [Labo 3 — Digitale ingang uitlezen](09_labo3_ingang_uitlezen.md) | Discrete inputs lezen via MicroPython |
| [Labo 4 — Input/output-logica combineren](10_labo4_combinatie.md) | Softwarematige koppeling DI → relais |
| [Labo 5 — Uitbreiding: control modes en flash-commando's](11_labo5_uitbreiding.md) | Holding registers, linkage/toggle mode |

## Gebruikte hardware in deze cursus

- **Waveshare Modbus POE ETH Relay (B)** — 8-kanaals relaismodule met 8 digitale ingangen (DI),
  aanstuurbaar via Modbus RTU of Modbus TCP, standaard IP-adres `192.168.1.200`.
- **ESP32** met MicroPython-firmware, verbonden via WiFi in hetzelfde subnet (`192.168.1.x`).
- **sscom** — gratis seriële/TCP-testtool (Waveshare-versie) voor het valideren van commando's.
- **Vircom** — configuratiesoftware van Waveshare voor de netwerkparameters van de module.
