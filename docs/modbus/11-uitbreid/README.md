# Labo 5 — Uitbreiding: control modes, flash-commando's en holding registers

## Doelstellingen

Na dit labo kan je:
- de relais-control-mode van een kanaal uitlezen en wijzigen via holding registers (functiecodes
  0x03 en 0x06);
- een relais laten "flashen" (kort aan/uit) via een speciaal commando;
- de softwareversie van de module opvragen.

## Benodigdheden

- ESP32 + Waveshare-module, zoals in de vorige labo's.

## Opdracht 5.1 — Control mode van een relais uitlezen

De control mode van elk relaiskanaal wordt bijgehouden in een **holding register**
(`0x1000`-`0x1007`, zie hoofdstuk 5, §5.2 en §5.5), uitleesbaar met functiecode **0x03** (Read
Holding Registers).

1. Schrijf een functie `modbus_read_holding_register(address, quantity=1)` die functiecode 0x03
   gebruikt.
2. Lees de control mode van relais 1 uit (adres `0x1000`) en print het resultaat.
3. Vergelijk de teruggekregen waarde met de tabel uit hoofdstuk 5, §5.5 (Normal / Linkage / Toggle /
   Edge Trigger).

**Vraag 5.1a:** Hoeveel bytes bevat de response voor één holding register, en hoe verschilt dit van
de response op een `Read Discrete Inputs`-verzoek (Labo 3)?

## Opdracht 5.2 — Control mode wijzigen

Gebruik functiecode **0x06** (Write Single Register) om de control mode van relais 1 te wijzigen.

1. Schrijf een functie `modbus_write_holding_register(address, value)`.
2. Zet relais 1 in **Toggle mode** (`0x0002`).
3. Test hardwarematig: sluit een drukcontact aan op DI1/DGND, en controleer of relais 1 nu toggelt
   telkens wanneer je het contact kort sluit — **zonder dat je ESP32-script iets doet**.
4. Zet relais 1 nadien terug op **Normal mode** (`0x0000`), zodat je Modbus-commando's uit de
   vorige labo's opnieuw werken.

**Vraag 5.2a:** Waarom moest je in Labo 4 zelf software schrijven om flanken te detecteren, terwijl
dit hier "gratis" door de module zelf gebeurt? Wat is de trade-off?

## Opdracht 5.3 — Relais laten flashen

Gebruik het **flash-on/flash-off**-commando (adres `0x0200`-`0x0207` resp. `0x0400`-`0x0407`, zie
hoofdstuk 5, §5.2) om relais 1 gedurende 1 seconde te laten inschakelen en dan automatisch weer uit
te schakelen, zonder dat je ESP32-script zelf hoeft te wachten en een uit-commando te sturen.

1. Bouw het Modbus-commando op: functiecode `0x05`, adres `0x0200` (flash-on kanaal 1), waarde =
   aantal × 100ms (dus `0x000A` voor 1000ms).
2. Verstuur dit vanaf je ESP32 en controleer het gedrag van het relais.

**Vraag 5.3a:** Wat is het voordeel van dit ingebouwde flash-commando ten opzichte van zelf
`modbus_write_coil(0, True)` gevolgd door `time.sleep(1)` en `modbus_write_coil(0, False)`?

## Opdracht 5.4 — Softwareversie en device-adres opvragen

1. Lees het holding register op adres `0x8000` uit (softwareversie).
2. Zet de teruggekregen waarde om naar een leesbaar versienummer (bv. `0x0064` → `100` → `V1.00`).
3. Lees ook het device-adres uit op `0x4000` en bevestig dat dit `0x0001` is.

## Eindopdracht — Combinatietoepassing

Bouw, gebruikmakend van alles wat je in deze cursus geleerd hebt, een klein systeem dat:
- bij het opstarten alle relais controleert en op **Normal mode** zet;
- de softwareversie van de module logt naar de console;
- in een lus de status van alle 8 DI-kanalen uitleest;
- voor elk actief DI-kanaal het overeenkomstige relais gedurende 2 seconden laat "flashen" via het
  ingebouwde flash-commando;
- elke fout (bv. tijdelijk netwerkprobleem) opvangt zonder dat het script crasht.

## Reflectievragen

1. Welke van de vier functiecodes die je doorheen deze cursus gebruikt hebt (0x01, 0x02, 0x03,
   0x05, 0x06) werkt op welk type Modbus-data (coils, discrete inputs, holding registers)?
2. Stel dat je dit systeem in een echte industriële omgeving zou inzetten: welke aanvullende
   maatregelen (foutafhandeling, beveiliging, monitoring) zou je overwegen, gezien Modbus zelf geen
   authenticatie voorziet (zie hoofdstuk 4, §4.7)?
