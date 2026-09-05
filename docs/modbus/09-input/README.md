# Labo 3 — Digitale ingang (DI) uitlezen

## Doelstellingen

Na dit labo kan je:
- een digitale ingang van de Waveshare-module hardwarematig hoog/laag maken;
- deze status uitlezen vanaf de ESP32 via Modbus TCP (functiecode 0x02);
- meerdere ingangen tegelijk uitlezen in één verzoek.

## Benodigdheden

- ESP32 met MicroPython, module geconfigureerd zoals in Labo 1.
- Een stukje draad of een drukknopje, voor een eenvoudige testopstelling op DI1/DGND.

## Opdracht 3.1 — DI hardwarematig testen

1. Verbind **DI1** met **DGND** via een schakelaar, drukknop, of gewoon een los draadje
   (droog-contact-aansluiting, zie hoofdstuk 5 §5.4).
2. Laat het contact eerst open staan.

**Vraag 3.1a:** Welke van de drie bedradingsopties (droog contact, NPN, PNP) gebruik je hier, en
waarom is dit de eenvoudigste optie om te testen zonder externe voeding?

## Opdracht 3.2 — Eén ingang uitlezen vanaf de ESP32

1. Implementeer de functie `modbus_read_discrete_input(channel)` uit hoofdstuk 6, §6.5.
2. Schrijf een lus die elke seconde de status van DI1 uitleest en print.
3. Sluit het contact (draadjes tegen elkaar / knop indrukken) en controleer of de console-output
   verandert.

**Vraag 3.2a:** Welke functiecode gebruik je hier, en op welk type Modbus-data (zie hoofdstuk 2)
werkt deze?

**Vraag 3.2b:** Is de ingang "actief" (True) wanneer het contact **gesloten** of **open** is? Komt
dit overeen met wat je verwachtte?

## Opdracht 3.3 — Alle 8 DI-kanalen in één verzoek uitlezen

In plaats van 8 losse verzoeken (één per kanaal), kan je met **één Modbus-verzoek** de status van
alle 8 ingangen tegelijk opvragen door de "quantity" op 8 te zetten in plaats van 1.

1. Schrijf een functie `modbus_read_all_discrete_inputs()` die in één verzoek alle 8 kanalen
   uitleest.
2. De response bevat één statusbyte waarin elk bit overeenkomt met een kanaal (bit 0 = DI1, bit 1 =
   DI2, enz. — zie hoofdstuk 5 §5.2 en hoofdstuk 6 §6.6).
3. Schrijf code die deze byte "uitpakt" tot een lijst van 8 booleans, bv.
   `[True, False, False, True, False, False, False, False]`.

**Vraag 3.3a:** Waarom is één verzoek voor 8 kanalen efficiënter dan 8 aparte verzoeken?

## Opdracht 3.4 — Meerdere fysieke ingangen tegelijk testen

Indien beschikbaar: sluit een tweede schakelaar aan op DI2/DGND, en test of je met je functie uit
opdracht 3.3 beide ingangen onafhankelijk van elkaar correct kan uitlezen.

## Reflectievragen

1. Welk deel van de Modbus TCP-response (zie hoofdstuk 6, §6.6) vertelt je hoeveel databytes je
   moet interpreteren?
2. Stel dat je 8 ingangen hebt, maar er méér dan 8 bits nodig zouden zijn (bv. 12 ingangen): hoeveel
   bytes zou de "byte number" dan bevatten, en hoe zou je dit moeten verwerken in je Python-code?
