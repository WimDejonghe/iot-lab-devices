# Hoofdstuk 4 — Modbus TCP

## 4.1 Wat is Modbus TCP?

Modbus TCP verpakt hetzelfde soort Modbus-berichten als Modbus RTU, maar dan **zonder CRC** en
**verstuurd via een standaard TCP/IP-verbinding** in plaats van een seriële lijn. Dit maakt Modbus
bruikbaar over Ethernet-netwerken, WiFi, en zelfs het internet (al is dat laatste af te raden zonder
extra beveiliging, aangezien Modbus zelf geen authenticatie of encryptie voorziet).

De standaardpoort voor Modbus TCP is **poort 502**.

## 4.2 Opbouw van een Modbus TCP-bericht

Een Modbus TCP-bericht bestaat uit twee delen:

```
[ MBAP Header ]  [ PDU (Protocol Data Unit) ]
   7 bytes           N bytes
```

De **PDU** is exact dezelfde functiecode + data die je ook in een RTU-bericht zou vinden — enkel
zonder het device-adres en zonder CRC. In plaats daarvan komt er een **MBAP-header** (Modbus
Application Protocol header) vóór te staan.

### MBAP-header in detail

| Veld | Grootte | Beschrijving |
|---|---|---|
| Transaction ID | 2 bytes | Uniek per verzoek; server stuurt dit ongewijzigd terug. Handig om requests en responses te koppelen bij meerdere gelijktijdige verzoeken |
| Protocol ID | 2 bytes | Altijd `0x0000` voor Modbus |
| Length | 2 bytes | Aantal bytes dat nog volgt (unit ID + PDU) |
| Unit ID | 1 byte | Komt overeen met het device-adres van RTU (bij een enkel apparaat via TCP meestal `0x01`) |

## 4.3 Voorbeeld: relais 1 inschakelen via Modbus TCP

Vergelijk met het RTU-commando uit hoofdstuk 3:

```
Modbus RTU:  01 05 00 00 FF 00 8C 3A
Modbus TCP:  00 00 00 00 00 06 01 05 00 00 FF 00
```

| Bytes (TCP) | Betekenis |
|---|---|
| `00 00` | Transaction ID |
| `00 00` | Protocol ID (altijd 0) |
| `00 06` | Length: er volgen nog 6 bytes |
| `01` | Unit ID = 1 |
| `05` | Functiecode = Write Single Coil |
| `00 00` | Coil-adres = 0 |
| `FF 00` | Waarde = AAN |

Je ziet: de CRC (`8C 3A`) is volledig weggelaten — TCP/IP zorgt zelf al voor foutcontrole op
netwerkniveau, dus een extra Modbus-CRC is overbodig.

## 4.4 Waarom is er geen CRC nodig in Modbus TCP?

TCP/IP bevat op meerdere lagen al ingebouwde foutcontrole (checksums op IP- en TCP-niveau,
retransmissie bij pakketverlies). Een extra CRC op Modbus-niveau zou dus overbodige overhead zijn.

## 4.5 Modbus TCP versus "Modbus RTU over TCP"

Dit is een veelvoorkomende bron van verwarring, ook bij de Waveshare-module:

- **Modbus TCP** (native): het bericht heeft een MBAP-header, geen CRC. Dit is wat je krijgt als je
  in Vircom de "Transfer Protocol" instelt op **Modbus TCP protocol**.
- **Modbus RTU over TCP** (ook wel "transparant"/"passthrough" genoemd): het volledige RTU-bericht
  (inclusief CRC) wordt gewoon "as-is" door een TCP-verbinding gestuurd, zonder MBAP-header. Dit is
  de **standaardinstelling** van de Waveshare-module ("Transfer Protocol: None").

Beide varianten gebruiken hetzelfde fysieke TCP-kanaal, maar het bericht zelf ziet er anders uit.
In deze cursus werken we met **native Modbus TCP**, omdat dit het standaardformaat is dat de
meeste Modbus-bibliotheken en -tools verwachten.

## 4.6 Eén, meerdere of blijvende verbindingen?

Bij Modbus TCP kan je kiezen:
- **Kortstondige verbinding**: voor elk verzoek een nieuwe TCP-verbinding openen en sluiten. Simpel
  te implementeren, iets trager (TCP-handshake bij elk verzoek). Dit is de aanpak die we in de
  labo's gebruiken.
- **Blijvende verbinding**: één TCP-verbinding openhouden en er meerdere verzoeken na elkaar over
  sturen. Efficiënter, maar vereist iets meer foutafhandeling (bv. verbinding die wegvalt).

## 4.7 Voor- en nadelen van TCP versus RTU

| | Modbus RTU | Modbus TCP |
|---|---|---|
| Fysieke laag | Seriële lijn (RS-485/232) | Ethernet/WiFi |
| Snelheid | Beperkt door baudrate | Hoger (Ethernet-snelheden) |
| Meerdere gelijktijdige clients | Moeilijk (half-duplex) | Mogelijk (elke client eigen TCP-verbinding) |
| Bereik | ~1200m (RS-485) | Beperkt door netwerkinfrastructuur, kan ook over internet (afgeraden zonder beveiliging) |
| Overhead per bericht | Klein (CRC16 = 2 bytes) | Iets groter (MBAP-header = 7 bytes + TCP/IP-overhead) |
| Beveiliging | Geen | Geen (tenzij aangevuld met VPN/TLS-achtige oplossingen) |

## 4.8 Wat volgt

In hoofdstuk 5 passen we deze theorie toe op de **Waveshare Modbus POE ETH Relay (B)**-module:
welke registers ze aanbiedt, hoe je ze configureert, en hoe je haar communicatie test.
