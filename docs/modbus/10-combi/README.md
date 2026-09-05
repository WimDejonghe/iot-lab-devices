# Labo 4 — Input/output-logica combineren

## Doelstellingen

Na dit labo kan je:
- een eenvoudige regellus schrijven die een digitale ingang uitleest en op basis daarvan een
  relais aanstuurt, volledig softwarematig vanaf de ESP32;
- het verschil begrijpen tussen deze softwarematige aanpak en de ingebouwde "Linkage mode" van de
  module zelf (hoofdstuk 5, §5.5).

## Benodigdheden

- ESP32 + Waveshare-module, zoals in de vorige labo's.
- Een schakelaar/drukknop op DI1/DGND.

## Opdracht 4.1 — DI1 koppelen aan relais 1 (softwarematig)

Schrijf een script dat in een oneindige lus:
1. de status van DI1 uitleest;
2. relais 1 inschakelt als DI1 actief is, en uitschakelt als DI1 niet actief is;
3. dit elke 200ms herhaalt.

```python
while True:
    di_status = modbus_read_discrete_input(0)
    modbus_write_coil(0, di_status)
    time.sleep(0.2)
```

**Vraag 4.1a:** Dit gedrag lijkt sterk op de ingebouwde **Linkage mode** van de module (hoofdstuk
5). Wat is het fundamentele verschil tussen deze softwarematige aanpak en Linkage mode qua
snelheid, netwerkbelasting, en betrouwbaarheid?

## Opdracht 4.2 — Toggle-logica met een drukknop

Pas je script aan zodat relais 1 **toggelt** telkens wanneer DI1 van "niet actief" naar "actief"
overgaat (een klassieke drukknop-toggle, in plaats van een niveaugestuurde koppeling). Dit vraagt
dat je software zelf de **vorige status** van DI1 bijhoudt om een "flank" (overgang) te detecteren.

```python
vorige_status = False

while True:
    huidige_status = modbus_read_discrete_input(0)
    if huidige_status and not vorige_status:
        modbus_toggle_coil(0)   # uit Labo 2, opdracht 2.4
    vorige_status = huidige_status
    time.sleep(0.1)
```

**Vraag 4.2a:** Waarom is een korte polling-interval (bv. 100ms) hier belangrijker dan in opdracht
4.1?

**Vraag 4.2b:** Wat zou er kunnen misgaan als je knop "prelt" (bounce) — dus meerdere korte
aan/uit-overgangen genereert bij het indrukken? Hoe zou je dit kunnen opvangen in je code (denk aan
een korte `sleep()` na een gedetecteerde flank)?

## Opdracht 4.3 — Twee ingangen, twee relais

Breid het systeem uit: DI1 stuurt relais 1, DI2 stuurt relais 2, onafhankelijk van elkaar, in
dezelfde lus.

**Vraag 4.3a:** Hoeveel Modbus-verzoeken verstuur je per lus-iteratie in deze opzet? Zou je dit
kunnen optimaliseren door gebruik te maken van de functies uit Labo 3, opdracht 3.3?

## Reflectievragen

1. In welke situaties zou je **de ingebouwde Linkage/Toggle/Edge-modus van de module** verkiezen
   boven een softwarematige lus op de ESP32? Denk aan betrouwbaarheid bij netwerkuitval.
2. In welke situaties is de softwarematige aanpak net flexibeler?
