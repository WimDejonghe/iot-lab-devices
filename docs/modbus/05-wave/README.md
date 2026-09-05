# Hoofdstuk 5 — Waveshare Modbus POE ETH Relay (B)

## 5.1 Overzicht van de module

De Waveshare Modbus POE ETH Relay (B) is een industriële module met:
- **8 relaisuitgangen** (DO) — 1NO/1NC-contacten, tot 10A/250VAC of 10A/30VDC per kanaal;
- **8 digitale ingangen** (DI) — 5-36V, ondersteunt zowel passieve (droog contact) als actieve
  (NPN/PNP) ingangssignalen;
- **Modbus RTU of Modbus TCP** over Ethernet, met **PoE**-ondersteuning (IEEE 802.3af);
- standaard IP-adres **`192.168.1.200`**.

| Specificatie | Waarde |
|---|---|
| Voeding | PoE, of 7-36V DC via voedingsklem |
| Relaiskanalen | 8, contactvorm 1NO+1NC |
| Contactbelasting | ≤10A 250VAC / ≤10A 30VDC |
| Digitale ingang | 8DI, 5-36V, passief/actief (NPN/PNP), optocoupler-geïsoleerd |
| Protocol | Modbus RTU of Modbus TCP |

## 5.2 Registerkaart (Development Protocol V2)

| Adres (HEX) | Inhoud | Waarde | Rechten | Functiecode |
|---|---|---|---|---|
| `0x0000`–`0x0007` | Relais kanaal 1-8 | `0xFF00`=aan, `0x0000`=uit, `0x5500`=toggle | R/W | 01, 05, 0F |
| `0x00FF` | Alle relais tegelijk | idem | W | 05 |
| `0x0100`–`0x0107` | Relais toggle-adres kanaal 1-8 | `0xFF00`=toggle, `0x0000`=ongewijzigd | W | 05, 0F |
| `0x0200`–`0x0207` | Flash ON kanaal 1-8 | interval = waarde × 100ms | W | 05 |
| `0x0400`–`0x0407` | Flash OFF kanaal 1-8 | interval = waarde × 100ms | W | 05 |
| `1x0000`–`1x0007` | DI-ingang kanaal 1-8 | status van de ingang | R | 02 |
| `4x1000`–`4x1007` | Relais control mode kanaal 1-8 | 0x0000-0x0003 (zie §5.5) | R/W | 03, 06, 10 |
| `4x4000` | Device-adres | vast `0x0001` | R | 03 |
| `4x8000` | Softwareversie | bv. `0x0064` = V1.00 | R | 03 |

> De prefix `1x` en `4x` in de tabel geeft aan tot welke datamodel-categorie het adres behoort
> (discrete input, resp. holding register) — zie hoofdstuk 2.

## 5.3 Configuratie: IP-adres behouden, protocol instellen

Het standaard IP-adres `192.168.1.200` hoeft niet gewijzigd te worden. Wat je wél moet instellen is
het **transfer protocol** op Modbus TCP, en het **gateway type** op non-storage.

### Via Vircom (aanbevolen)

1. Download en installeer [Vircom](https://files.waveshare.com/wiki/common/VirCom_en.rar).
2. `Device` → `Auto Search` → dubbelklik de gevonden module.
3. Laat **IP mode** op static staan met adres `192.168.1.200`.
4. Working mode: **TCP server**.
5. **Advanced Settings → Transfer Protocol** → **Modbus TCP protocol**. Zodra dit ingesteld staat,
   schakelt de module automatisch naar poort **502**.
6. **More Advanced Settings → Modbus Gateway Type** → **non-storage / multi-host non-storage**.
   > De standaardinstelling ("storage type") stuurt query's intern meermaals door, wat kan leiden
   > tot een niet-reagerende controller. Non-storage is vereist voor betrouwbare communicatie.
7. **Modify Setting** → **Restart Dev**.

### Via de webinterface (alternatief, minder parameters)

1. Open `http://192.168.1.200` in je browser.
2. Log in (standaard geen wachtwoord, of probeer `123456`).
3. Stel **Transfer Protocol** in op Modbus TCP en sla op.

## 5.4 Bedrading van de digitale ingangen (DI)

De DI-ingangen ondersteunen drie soorten aansluitingen:

**1. Droog contact (passief, geen externe voeding)**
- DI-klem verbinden met één kant van een schakelaar/contact, de andere kant naar **DGND**.
- Contact gesloten → ingang actief.

**2. Nat contact — NPN (laag actief)**
- **COM** → pluspool externe voeding (5-36V DC).
- **DI** → uitgang van de sensor/schakelaar.
- **DGND** → minpool van de voeding.
- Sensor schakelt naar GND → ingang actief.

**3. Nat contact — PNP (hoog actief)**
- **COM** → minpool externe voeding.
- **DI** → uitgang van de sensor/schakelaar.
- **DGND** → pluspool van de voeding.
- Sensor schakelt naar plus → ingang actief.

Alle 8 DI-kanalen delen dezelfde **DGND**.

## 5.5 Relais control modes

Elk relaiskanaal kan onafhankelijk in een van vier modi staan (holding register `4x1000`-`4x1007`):

| Waarde | Mode | Gedrag |
|---|---|---|
| `0x0000` | Normal | Relais wordt rechtstreeks via commando's gestuurd |
| `0x0001` | Linkage | Relaisstatus volgt automatisch de status van het bijhorende DI-kanaal — **reageert niet op commando's** |
| `0x0002` | Toggle | Relais toggelt telkens wanneer het DI-kanaal een puls ontvangt |
| `0x0003` | Edge Trigger | Relaisstatus wisselt telkens wanneer het DI-kanaal van niveau verandert |

> **Veelvoorkomende valkuil:** als een relais niet reageert op je Modbus-commando's, maar wel
> schakelt zodra je DI en DGND kortsluit, staat het kanaal waarschijnlijk in **Linkage mode**. Zet
> het terug op **Normal mode** om weer via software te kunnen sturen.

## 5.6 Communicatie testen met sscom

Voordat je de ESP32 inschakelt, is het aan te raden de configuratie te verifiëren met **sscom**
(gratis, portable):

1. Download de Waveshare-versie van sscom (bevat ook de `.ini`-bestanden met
   kant-en-klare commando's).
2. Open sscom → kies **TCP Client** als ComNum.
3. **Remote IP**: `192.168.1.200`, **Remote Port**: `502`.
4. **Local IP**: het IP van je pc in hetzelfde subnet (meestal automatisch ingevuld); **Local
   Port**: leeg/`0` laten.
5. Klik **Connect** — het groene lampje op de netwerkpoort van de module moet gaan branden.
6. Ga naar **Send Multi-Char** → **Import ini** → selecteer `modbus tcp.ini`.
7. Vink een commando aan (bv. "relay1 on") en klik op **SEND**.
8. Controleer: relais klikt hoorbaar, en je krijgt een respons terug in het ontvangst-venster.

## 5.7 Wat volgt

In hoofdstuk 6 bekijken we hoe je vanuit **MicroPython op een ESP32** deze Modbus TCP-berichten zelf
opbouwt en verstuurt — zonder externe Modbus-bibliotheek, via een gewone socketverbinding.
