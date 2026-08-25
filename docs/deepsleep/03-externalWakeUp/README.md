---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# External Wake Up

De ESP32 kan ook uit de slaapstand worden gehaald wanneer de status van een pin verandert. Er zijn twee mogelijkheden om de ESP32 extern te activeren: ext0 en ext1.

De ext0-modus stelt u in staat één GPIO als wekbron te gebruiken. De ext1-modus stelt u in staat meerdere GPIO's tegelijkertijd als wekbron in te stellen.

Alleen de GPIO-pinnen van de RTC kunnen als wekbron worden gebruikt. De GPIO-pinnen van de RTC zijn in het volgende diagram gemarkeerd met een paarse rechthoek.

![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp.png)
![De digitale IO-pinnen van de Adafruit Huzzah ESP32 feather.](./images/esp32_2.jpg)

## External wake up – ext0

Om te illustreren hoe je de externe wake-up ext0 gebruikt, nemen we een drukknop als wekbron. De ESP32 wordt geactiveerd wanneer je op de drukknop drukt.

:::warning
Je kan gebruik maken van de extentionshield om een drukknop te gebruiken als WakeUp-event. Let wel deze werkt zoals meestal ACTIEF-LAAG met een Pull-up weerstand!!! Gebruik dus in volgende code : esp32.WAKEUP_ALL_LOW
:::

### Script

Het volgende script laat zien hoe ext0 werkt: het gebruikt één GPIO als externe wake-up-bron.

```python
import esp32
from machine import Pin
from machine import deepsleep
from time import sleep

wake1 = Pin(14, mode = Pin.IN)

#level parameter can be: esp32.WAKEUP_ANY_HIGH or esp32.WAKEUP_ALL_LOW
esp32.wake_on_ext0(pin = wake1, level = esp32.WAKEUP_ANY_HIGH)

#your main code goes here to perform a task

print('Im awake. Going to sleep in 10 seconds')
sleep(10)
print('Going to sleep now')
deepsleep()
```
### Hoe werkt de code?

Eerst moet je de benodigde modules importeren. Je moet de esp32-module importeren, die de methoden bevat om een ​​pin als wake-up-bron in te stellen.

Nadat je de benodigde modules hebt geïmporteerd, definieer je een wake-up-pin. In dit geval gebruiken we GPIO14 en noemen we deze wake1. Deze GPIO moet worden ingesteld als ingang (Pin.IN).

```python
wake1 = Pin(14, mode = Pin.IN)
```
Stel vervolgens ext0 in als wekbron met behulp van de wake_on_ext0()-methode als volgt:

```python
esp32.wake_on_ext0(pin = wake1, level = esp32.WAKEUP_ANY_HIGH)
```

De methode wake_on_ext0() accepteert de pin en het niveau als argumenten:

> - pin: an object of type Pin (the GPIO that acts as a wake up source)
> - level: defines the state of the GPIO that wakes up the ESP32. The level can be one of the following parameters:
>   - `WAKEUP_ANY_HIGH`
>   - `WAKEUP_ALL_LOW`

In dit geval gebruiken we de `WAKEUP_ANY_HIGH` methode, die de ESP32 activeert wanneer de GPIO-pin hoog wordt.

De hoofdcode voor het uitvoeren van een taak moet na het definiëren van de wekbron en vlak voor het in slaapstand gaan worden geplaatst.

We voegen een vertraging van 10 seconden toe voordat we naar de slaapstand gaan. Om de ESP32 in de diepe slaapstand te zetten, hoeft u alleen de `deepsleep()` methode te gebruiken zoals hieronder weergegeven:

```python
machine.deepsleep()
```

## External wake up – ext1

De externe wake-up-functie ext1 werkt vrijwel hetzelfde als ext0, maar hiermee kunt u meerdere GPIO's als wake-up-bron instellen. Om te demonstreren hoe dit werkt, gebruiken we twee drukknoppen die op verschillende GPIO's zijn aangesloten.

In dit geval gebruiken we GPIO14 en GPIO12. U kunt elke andere geschikte GPIO gebruiken, maar deze moeten wel RTC-GPIO's zijn, anders werkt deze methode niet.

### Script

Het volgende script laat zien hoe ext1 werkt: het gebruikt twee GPIO's als externe wake-upbron, maar je kunt er meer gebruiken als je dat wilt.

```python
import esp32
from machine import deepsleep
from machine import Pin
from time import sleep

wake1 = Pin(14, mode = Pin.IN)
wake2 = Pin(12, mode = Pin.IN)

#level parameter can be: esp32.WAKEUP_ANY_HIGH or esp32.WAKEUP_ALL_LOW
esp32.wake_on_ext1(pins = (wake1, wake2), level = esp32.WAKEUP_ANY_HIGH)

#your main code goes here to perform a task

print('Im awake. Going to sleep in 10 seconds')
sleep(10)
print('Going to sleep now')
deepsleep()
```

## Opdrachten:

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: ESP32 in deepsleep en wakeup op basis van GPIO.
<ul style="color: white;">
<li>Gebruik twee digitale ingangen (drukknoppen). De ene kan de ESP32 in een deepsleep modus brengen, de andere kan de ESP32 terug wakker maken. </li>
<li>Als de ESP32 wakker is knippert er een LED op een frequentie van 10Hz.</li>
<li>Meet het stroomverbruik van de microcontroller, eens in werkmodus en eens in slaapmodus. Wat zijn die waarden? Wat is het totaal vermogen in deze twee toestanden?</li>
</ul>
</p>
</div>

-

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht2: ESP32 in deepsleep en wakeup op basis van GPIO.
<ul style="color: white;">
<li>Gebruik twee digitale ingangen (drukknoppen). De ene kan de ESP32 in een deepsleep modus brengen, de andere kan de ESP32 terug wakker maken. </li>
<li>Als de ESP32 wakker is wordt een 4*7 segment display aangestuurd (of een lcd) waarop de huidge tijd wordt getoond.</li>

</ul>
</p>
</div>