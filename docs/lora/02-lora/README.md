---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---


# ESP32 - Nucleo-LoRaWAN

## Nucleo Lora Module

Dit bordje bezit de nodige elektronica om bij een `LoRa End node` de communicatie te verzorgen. Het bordje kan communiceren met een ander `LoRa module` of met een `LoRa gateway` (in beheer van **The Things Network**). In de gebouwen van VIVES staat reeds een `LoRa gateway` opgesteld. Je kan trouwens de een map raadplegen:

[Map Gateway The Things Network](https://ttnmapper.org/heatmap/)

`The Things Network` zorgt ervoor dat de `LoRa gateway's` een verbinding hebben met het internet. Een eigen gateway opzetten kan je ook altijd zelf doen, maar dit valt hier buiten de scope van deze cursus.

Met de `LoRa End Node` moet je je echter geen zorgen maken met welke gateway te zal communiceren.

![ESP32).](./images/esp.png)
![Nucleo-Lora module](./images/fig1.png)

De ESP32 laten we hier communiceren met de LoRa module via UART (Rx-Tx) communicatie. Beide bordjes werken op 3,3V, dat is dus goed en veilig. Er moeten geen spanningsomzettingen gebeuren, wat soms in interfacing wel het geval is.

De ESP zal hier als END-node functioneren. Later kunnen we de ESP32 van een sensor voorzien zodat die data naar het internet kan versturen via LoRa's **the things network**. Daarna kunnen we via MQTT op ieder device op het internet de data visualiseren.

## UART connectie ESP - LoRa-module

Eerst zorg je dat je kan communiceren tussen de twee bordjes via een UART-com. Daarvoor zijn vier draadjes nodig tussen ESP en LoRa-bordje. Twee om het LoRa-bordje te voorzien van power (3,3V & GND). Zoek hier voor de twee pinnen op de ESP en de twee pinnen op het LoRa-bordje

![alt](./images/fig2.png)
![alt](./images/fig3.png)

:::warning
Maak hier geen fout!!!! Een verkeerde verbinding kunnen bordjes stuk maken!!!! 
Bij twijfel, vraag raad aan docent.
:::

![alt](./images/fig4.png)

Verbind dus met 4 draden ESP en Nucleo LORA. **Teken dit in een schema!!**
3V3 - GND van ESP naar Nucleo LORA
RX/TX tussen ESP en Nucleo LORA 


## AT commando's

Eenmaal de hardware connectie is gerealiseerd kan je dit uittesten door via een UART terminal programma zoals RealTerm of Putty of iets anders, commando' te versturen. 

> :bulb: **Opmerking:** Je zou dit rechtsreeks op het LoRa-bordje (dus zonder ESP32) maar dan moet je een **USB to TTL Serial Cable** hebben en liefst een die werkt met 3,3V. Je kan er zo eentje gebruiken van school als je dat wenst (vraag docent), maar is eigenlijk niet nodig omdat je dit kan doen met de ESP32.

Echter kan je dit dus doen via de ESP32 met de bedrading (RX-TX-3,3V-GND) zoals eerder beschreven.

:::warning
Bestudeer eerst heel goed waar de `Rx` en de `Tx` pin op de ESP32 Feather zitten. Er is een verschil tussen V1 en V2 versie!!
Bestudeer ook heel goed waar `Rx` en `Tx` pinnen zitten van de LoRa-module (zie eerdere figuur).

Natuurlijk moet je ervoor zorgen dat `Rx` naar `Tx` loopt en omgekeerd!!
:::

De parameters van de communicatie zijn : `115200 baud, N, 8,1,P`

De MicroPython code voor de ESP, kan je communiceren met het LoRa-bordje via AT commando's:

![alt](./images/fig5.png)

:::tip
Het terminal venster in `Thonny` is niet altijd handig, voor ontvangen data wel, maar niet om data te versturen. Het is beter om `RealTerm` of `Putty` daarvoor te gebruiken. Start de code op de ESP32 en sluit dan `Thonny` af. Start daarna `Realterm` of `Putty`. Geef uitleg waarom je dit moet doen.
:::

Hieronder zie je enkele commando's om het zenden en het ontvangen te initialiseren.

![Configuratie RX TX](./images/fig6.png)

## The Things Network

<YoutubeVideo videoId="rK8oJHZ9Q7U" />

> - Maak een account aan op The Things Network
> - Maak binnen uw account op The Things Network een Application aan
> - Maak binnen die applicatie een END-device aan
> - 

```python
machine.deepsleep(sleep_time_ms)
```



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
