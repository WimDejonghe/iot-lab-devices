---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---


# Timer Wake Up

![Wake Up op basis van tijd (timer).](./images/fig1.png)

De ESP32 kan in een diepe slaapstand gaan en vervolgens op vooraf ingestelde tijdstippen weer wakker worden. Deze functie is vooral handig voor projecten die tijdstempels of dagelijkse taken vereisen, terwijl het energieverbruik laag blijft.

Om de ESP32 voor een vooraf bepaald aantal seconden in de diepe slaapstand te zetten, hoeft u alleen maar de functie `deepsleep()` uit de `machine`-module te gebruiken. Deze functie accepteert als argumenten de slaaptijd in milliseconden, zoals hieronder weergegeven:

```python
machine.deepsleep(sleep_time_ms)
```

Laten we een eenvoudig voorbeeld bekijken om te zien hoe het werkt. In de volgende code bevindt de ESP32 zich 10 seconden in de diepe slaapstand, waarna hij ontwaakt, een LED laat knipperen en vervolgens weer in slaapstand gaat.

```python
from machine import deepsleep
from machine import Pin
from time import sleep

led = Pin (13, Pin.OUT)

#blink LED
led.value(1)
sleep(1)
led.value(0)
sleep(1)

# wait 5 seconds so that you can catch the ESP awake to establish a serial communication later
# you should remove this sleep line in your final script
sleep(5)

print('Im awake, but Im going to sleep')

#sleep for 10 seconds (10000 milliseconds)
deepsleep(10000)
```

:::warning
Let wel dat de microcontroller bij het ontwaken een herstart kent. Dit wil zeggen als je deze code laat runnen vanuit Thonny editor dat de controller terug in de start Python editor komt. 
Wil je dit als een continu proces laten gebeuren dan is het noodzakelijk om dit bestand als main.py op te slaan op de microcontroller zelf!! Wil je nadien opnieuw in programmeerstatus komen, dan is het noodzakelijk om MicroPython opnieuw te installeren op de microcontroller.
:::

## How the Code Works

Eerst, importeer de noodzakelijke bibliotheken (libraries):

```python
import machine
from machine import Pin
from time import sleep
```

Maak een `Pin`-object aan dat verwijst naar <span style="background-color:powderblue;">GPIO 13</span> met de naam `led`. Dit verwijst naar de ingebouwde LED.

```python
led = Pin (13, Pin.OUT)
```

De volgende code laat de LED knipperen.

```python
led.value(1)
sleep(1)
led.value(0)
sleep(1)
```

In dit geval laten we een LED knipperen ter demonstratie, maar het is de bedoeling dat je je hoofdcode in dit gedeelte van het script plaatst.

Voordat het apparaat in slaapstand gaat, voegen we een vertraging van 5 seconden toe en printen we een bericht om aan te geven dat het in slaapstand gaat.

```python
sleep(5)
print('Im awake, but Im going to sleep')
```

Het is belangrijk om een ​​vertraging van 5 seconden in te bouwen voordat het bord in slaapstand gaat tijdens het ontwikkelen van de scripts. Wanneer je nieuwe code naar het bord wilt uploaden, moet het bord wakker zijn. Zonder deze vertraging is het lastig om het bord later wakker te krijgen om nieuwe code te uploaden. Nadat de definitieve code klaar is, kun je de vertraging verwijderen.

Zet de ESP32 tot slot 10 seconden (10.000 milliseconden) in de diepe slaapstand.

```python
machine.deepsleep(10000)
```

Na 10 seconden wordt de ESP32 wakker en voert de code vanaf het begin uit, net zoals wanneer je op de EN/RST-knop zou drukken.


## Opdrachten:

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: ESP32 in deepsleep en wakeup op basis van tijd.
<ul style="color: white;">
<li>Breng de ESP32 in een cyclus van 20 seconden werken (laat een LED knipperen op een frequentie van 10Hz).</li>
<li>Na deze cyclus gaat de ESP32 voor 20 seconden in een deepsleep, waarna de cyclus zich herhaalt.</li>
<li>Meet het stroomverbruik van de microcontroller, eens in werkmodus en eens in slaapmodus. Wat zijn die waarden? Wat is het totaal vermogen in deze twee toestanden?</li>
<li>Uitbreiding: registreer om de 20 seconden uw GPS locatie en publiceer deze locatie op een dashboard. Laat de microcontroller op een batterij werken. </li>
</ul>
</p>
</div>

-

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht3: ESP32 in deepsleep en wakeup op basis van tijd.
<ul style="color: white;">
<li>Maak een toepassing die de omgevingstemperatuur meet en die waarde om de 20 seconden publiceert op een MQTT broker topic. </li>
<li>Intussentijd zit de microcontroller in een deepsleep.</li>
<li>Maak een dashboard met de meetwaarde.</li>
<li>Uitbreiding: publiceer de waarde tevens in een database en pas dashboard aan zodat deze een historiek weergeeft.</li>
</ul>
</p>
</div>
