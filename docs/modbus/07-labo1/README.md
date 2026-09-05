# Labo 1 — De Waveshare-module configureren en testen

## Doelstellingen

Na dit labo kan je:
- de Waveshare Modbus POE ETH Relay (B) configureren voor Modbus TCP-communicatie;
- het verschil tussen "storage" en "non-storage" gateway type verklaren;
- de configuratie verifiëren met sscom, zonder ESP32 of programmeercode.

## Benodigdheden

- Waveshare Modbus POE ETH Relay (B), verbonden met je netwerk (PoE of externe voeding).
- Een pc/laptop in hetzelfde netwerksegment (`192.168.1.x/24`).
- [Vircom](https://files.waveshare.com/wiki/common/VirCom_en.rar) geïnstalleerd.
- [sscom](https://files.waveshare.com/wiki/Modbus%20POE%20ETH%20Relay/Sscom5.13.1_for_Modbus_POE_ETH_Relay_B.zip)
  uitgepakt (portable, geen installatie nodig).

## Opdracht 1.1 — Module opzoeken en configureren

1. Open Vircom, klik op `Device` → `Auto Search`.
2. Noteer het huidige IP-adres, MAC-adres en firmwareversie van de gevonden module.
3. Dubbelklik de module om de instellingen te openen.
4. Controleer dat **IP mode** op static staat, met adres `192.168.1.200`.
5. Zet **Advanced Settings → Transfer Protocol** op **Modbus TCP protocol**.
6. Zet **More Advanced Settings → Modbus Gateway Type** op **non-storage / multi-host
   non-storage**.
7. Klik **Modify Setting**, gevolgd door **Restart Dev**.

**Vraag 1.1a:** Welke poort gebruikt de module nadat je Modbus TCP protocol hebt ingesteld, en
waarom verandert deze automatisch?

**Vraag 1.1b:** Wat zou er (volgens de documentatie) kunnen gebeuren als je het gateway type op
"storage" laat staan in plaats van "non-storage"?

## Opdracht 1.2 — Verbinding testen met sscom

1. Open sscom, zet de taal desgewenst op Engels.
2. Stel de verbinding in: **TCP Client**, Remote IP `192.168.1.200`, Remote Port `502`.
3. Controleer/stel het Local IP in (moet in hetzelfde subnet zitten).
4. Klik **Connect**.

**Vraag 1.2a:** Aan welk signaal op de module zelf zie je dat de TCP-verbinding gelukt is?

## Opdracht 1.3 — Modbus TCP-commando's importeren en testen

1. Ga naar het **Send Multi-Char**-venster, klik **Import ini**, en selecteer `modbus tcp.ini`.
2. Vink het commando "relay 1 on" aan en klik op **SEND** (niet SendFile!).
3. Controleer fysiek: hoor/zie je het relais schakelen?
4. Vink "relay 1 on" uit, vink "relay 1 off" aan, en verstuur opnieuw.

**Vraag 1.3a:** Noteer de exacte hex-bytes die verstuurd worden voor "relay 1 on". Herken je hierin
de MBAP-header en de PDU uit hoofdstuk 4?

**Vraag 1.3b:** Wat ontvang je terug in het receive-venster? Vergelijk dit met wat je verstuurd
hebt.

## Opdracht 1.4 — Alle relais tegelijk aansturen

Zoek in de registerkaart (hoofdstuk 5, §5.2) het adres op dat gebruikt wordt om **alle relais
tegelijk** aan/uit te zetten.

1. Bouw zelf (op papier of in een teksteditor) het Modbus TCP-commando op om alle relais tegelijk
   in te schakelen, uitgaande van slave ID 1.
2. Verstuur dit commando via het vrije invoerveld van sscom (zet **Verify op None**, want dit is
   Modbus TCP, geen RTU).
3. Controleer of alle 8 relais tegelijk schakelen.

**Vraag 1.4a:** Welk adres en welke functiecode heb je gebruikt?

## Reflectievragen

1. Wat is het verschil tussen wat je in dit labo deed (sscom) en wat je in latere labo's zal doen
   (ESP32 met MicroPython)? Welk deel van de communicatie blijft identiek?
2. Waarom is het aan te raden om een configuratie eerst te verifiëren met een tool zoals sscom,
   vooraleer je een microcontroller programmeert?
