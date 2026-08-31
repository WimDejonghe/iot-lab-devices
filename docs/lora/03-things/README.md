# Opdrachten

Je zal in volgende opdrachten vooral moeten bedenken op welke manier je data in de bytes info verwerkt. Je moet dit zeker mondeling kunnen uitleggen. Bestudeer dit dus heel goed. Hou de data paketten zo klein mogelijk!! Nogmaals, LoRa is niet geschikt om veel data te versturen, het werkt echt met heel kleine paketten!

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: Visualisatie van 1 drukknop
<ul style="color: white;">
<li>Zorg ervoor dat als je telkens op 1 drukknop drukt van de ESP32 shield je dit kan visualiseren op een dashboard.</li>
<li>De communicatie moet dus via LoraWan, TTN en MQTT verlopen.</li>
<li>De communicatie verloopt dus niet op basis van tijd, maar op basis van het loslaten van de drukknop.</li>

<li>Uitbreiding: Zorg ervoor dat je dit met de 4 drukknoppen kan. </li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht2: Visualisatie van potentiometer 1.
<ul style="color: white;">
<li>Zorg ervoor dat de analoge waarde van de potentiometer wordt gevisualiseerd op een dashboard.</li>
<li>De communicatie moet dus via LoraWan, TTN en MQTT verlopen.</li>
<li>De communicatie verloopt hier op basis van tijd. Neem zeker geen korte intervallen!!! LoRa is daarvoor niet geschikt. Neem bijv om de 30 seconden of om de minuut.</li>
<li>Uitbreiding: Zorg ervoor dat maar een getal tussen 0 en 10 verstuurt. Hier gebruik ja dan weer geen tijdsinterval maar op basis van verandering van waarde (bijv als pot waarde verandert van 3 naar 4). Zolang pot waarde op een geheel getal blijft staan dan wordt er geen nieuwe data verzonden!! </li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht3: Visualisatie van potentiometer 2.
<ul style="color: white;">
<li>Zorg ervoor dat de analoge waarde van de potentiometer wordt gevisualiseerd op een dashboard.</li>
<li>De communicatie moet dus via LoraWan, TTN en MQTT verlopen.</li>

<li>Zorg ervoor dat maar een getal tussen 0 en 10 wordt verstuurd. Hier gebruik je dan weer geen tijdsinterval maar de tijdstippen van communicatie op basis van verandering van waarde (bijv als pot waarde verandert van 3 naar 4). Zolang pot waarde op een geheel getal blijft staan, wordt er geen nieuwe data verzonden!! </li>

</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht4: Visualisatie van potentiometer + buttons.
<ul style="color: white;">
<li>Zorg ervoor dat de analoge waarde van de potentiometer wordt gevisualiseerd op een dashboard.</li>
<li>De communicatie moet dus via LoraWan, TTN en MQTT verlopen.</li>

<li>Zorg ervoor dat maar een getal tussen 0 en 10 wordt verstuurd. Hier gebruik je dan weer geen tijdsinterval maar de tijdstippen van communicatie op basis van verandering van waarde (bijv als pot waarde verandert van 3 naar 4). Zolang pot waarde op een geheel getal blijft staan, wordt er geen nieuwe data verzonden!! </li>
<li>Combineer deze applicatie met ook de visualisatie van de 4 drukknoppen.</li>
</ul>
</p>
</div>

***

<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht5: Aansturen LED.
<ul style="color: white;">
<li>Zorg dat een dashboard een LED kan aansturen op de ESP32. Hiervoor zet je op het dashboard de toestand van de LED klaar (on/off). En druk daarna op knop van de ESP32 zodat die een SEND en een RECEIVE uitvoert om die toestand van de LED over te nemen.</li>
<li>De communicatie moet dus via LoraWan, TTN en MQTT verlopen.</li>

<li>Uitbreiding: Breid deze functionaliteit uit naar 8 LED's, 4 drukknoppen en potentiometer met schaalverdeling 0-10.</li>
</ul>
</p>
</div>