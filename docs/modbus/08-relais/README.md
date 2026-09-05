# Labo 2 — Relais aansturen vanaf de ESP32

## Doelstellingen

Na dit labo kan je:
- vanuit MicroPython een Modbus TCP-frame opbouwen en versturen via een socket;
- een individueel relais en alle relais tegelijk aansturen vanaf de ESP32;
- de basiscode uit hoofdstuk 6 uitbreiden met extra functionaliteit.

## Benodigdheden

- ESP32 met MicroPython-firmware.
- Waveshare-module, geconfigureerd volgens Labo 1 (Modbus TCP, non-storage gateway).
- Beide toestellen in hetzelfde netwerksegment.

## Opdracht 2.1 — Basisverbinding en één relais schakelen

1. Vertrek van de WiFi-verbindingscode uit hoofdstuk 6, §6.2.
2. Implementeer de functie `modbus_write_coil(channel, state)` uit §6.4.
3. Schrijf een script dat relais 1 inschakelt, 2 seconden wacht, en het weer uitschakelt.
4. Print bij elke actie een duidelijke boodschap naar de console (bv. "Relais 1 -> AAN").

**Vraag 2.1a:** Wat gebeurt er als je de ESP32-code uitvoert terwijl de relaismodule niet
bereikbaar is (bv. verkeerd IP, of module uitgeschakeld)? Test dit bewust en beschrijf het gedrag.

## Opdracht 2.2 — Meerdere relais na elkaar aansturen

Breid je script uit zodat het **alle 8 relais na elkaar** kort inschakelt en weer uitschakelt (een
soort "lichtjesloop"), met een korte vertraging (bv. 300ms) tussen elk kanaal.

```python
for channel in range(8):
    modbus_write_coil(channel, True)
    time.sleep(0.3)
    modbus_write_coil(channel, False)
```

**Vraag 2.2a:** Hoe zou je dit script aanpassen zodat alle relais gelijktijdig aan zijn tijdens de
loop, in plaats van na elkaar uit te schakelen? (Tip: denk na over de volgorde van je
aan/uit-commando's.)

## Opdracht 2.3 — Alle relais in één commando aansturen

In Labo 1 (opdracht 1.4) heb je het adres opgezocht om alle relais tegelijk aan te sturen met **één
enkel Modbus-commando** (in plaats van 8 losse commando's).

1. Schrijf een functie `modbus_write_all_coils(state)` die dit adres gebruikt.
2. Vergelijk het netwerkverkeer (conceptueel): waarom is dit efficiënter dan 8 losse
   `modbus_write_coil()`-aanroepen?

## Opdracht 2.4 — Toggle-commando gebruiken

De registerkaart voorziet ook een **toggle-waarde** (`0x5500`) die je kan gebruiken in plaats van
expliciet `True`/`False` door te geven.

1. Schrijf een functie `modbus_toggle_coil(channel)` die deze toggle-waarde gebruikt.
2. Schrijf een script dat elke 2 seconden relais 1 toggelt, **zonder dat de ESP32 zelf moet
   bijhouden of het relais aan of uit staat**.

**Vraag 2.4a:** Wat is het voordeel van deze toggle-aanpak ten opzichte van het bijhouden van een
`relay_state`-variabele in je Python-code, zoals in het voorbeeld van hoofdstuk 6?

## Reflectievragen

1. Welke functiecode(s) heb je in dit labo gebruikt, en op welk type Modbus-data werken ze?
2. Wat zou er moeten gebeuren als een relais in "Linkage mode" staat (zie hoofdstuk 5, §5.5) en je
   toch probeert het via `modbus_write_coil()` te schakelen? Test dit eventueel bewust.
