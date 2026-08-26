---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Opdrachten

***
<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: BLE comm ESP32 &lt;-&gt; smartphone . 
</p>
<ul style="color: white;">
<li>Installeer een app op uw smartphone die in staat is om BLE communicatie kan opzetten zoals Serial Bluetooth Terminal </li>
<li>Laat de ESP32 zijn BLE code uitvoeren, en communiceer met de ESP32 alover BLE. </li>
<li>Pas de ESP32 code aan zodat je in staat bent om 4 LED's aan-uit te schakelen vanaf uw smartphone.</li>

</ul>
</div>

***

***
<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht2: BLE comm ESP32 &lt;-&gt; RPi &lt;-&gt; MQTT broker &lt;-&gt;... . 
</p>

<ul style="color: white;">
<li>Installeer nu ook op uw RaspberryPi de code. Je zal hoogst waarschijnlijk moeten een python environment moeten configureren waarbinnen uw code zal moeten draaien. Ook bijhorende bibliotheken zullen moeten worden geïnstalleerd binnen deze environment. </li>
<li>Pas de code aan met de juiste parameters met betrekking tot uw ESP32 BLE configuratie: device naam, UUID's, ...  </li>
<li>Pas de code aan zodat er de juiste verbinding wordt gelegd met uw MQTT broker en gebruik daar twee afzonderlijke topics. Eén voor elke communicatie richting. Laat de code draaien en test met MQTT explorer de werking ervan.</li>
<li>Als dit allemaal werkt, maak dan een dashboard op uw laptop (Node-red) die de volledige communicatie bewerkstelligd. Zorg dat je zoveel als mogelijk LED's kunt aansturen en dat de toestand van de 4 drukknoppen getoond wordt. Kan je ook de potentiometer waarde visualiseren?</li>
</ul>

</div>

***
