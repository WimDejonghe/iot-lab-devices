---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Introductie?

Dit cursusdeel laat zien hoe je de ESP32 in de diepe slaapstand zet en hem weer wakker maakt met behulp van verschillende wekbronnen via MicroPython-firmware. We behandelen zowel wekken met een timer als wekken met een externe digitale input.

![Intro Deep sleep.](./images/intro1.png)

De ESP32 kan ook uit de diepe slaapstand worden gehaald met behulp van de touch-pinnen door een drempelwaarde in te stellen.

## Wat is Deep Sleep?

Het is niet ideaal om je ESP32 in actieve modus met batterijen te laten werken, omdat de batterijen dan erg snel leeglopen.

![Batterij verbruik (energie vermogen).](./images/intro2.png)

Als je je ESP32 in de diepe slaapstand zet, verlaag je het stroomverbruik en gaan je batterijen langer mee. In de diepe slaapstand worden de activiteiten die veel stroom verbruiken tijdens gebruik uitgeschakeld, maar blijft er net genoeg activiteit over om de processor te activeren wanneer er iets interessants gebeurt.

In de diepe slaapstand verbruikt de ESP32 een stroom in de orde van microampères. Met een speciaal ontworpen printplaat kun je een minimaal verbruik van slechts 5 microampère bereiken. Als je echter een volledig uitgeruste ESP32-ontwikkelingsprintplaat gebruikt met ingebouwde programmeur, LED's, enzovoort, zul je zo'n laag stroomverbruik niet kunnen bereiken, maar je kunt nog steeds energie besparen.


## Wake Up Bronnen

Nadat je de ESP32 in de diepe slaapstand hebt gezet, zijn er verschillende manieren om hem weer wakker te maken:

> - Je kunt de timer gebruiken om de ESP32 na vooraf ingestelde tijdsperioden te activeren.
> - Je kunt een externe wake-up gebruiken: dit betekent dat de ESP32 kan worden geactiveerd wanneer de status (digitaal) van een pin verandert.
> - Je kunt de touch-pinnen gebruiken: deze zijn geïmplementeerd, maar werken op het moment van schrijven nog niet zoals verwacht, dus we zullen dit voorlopig niet behandelen.
> - Je kunt de ULP-coprocessor gebruiken om het apparaat te activeren; we hebben deze functie nog niet getest.



