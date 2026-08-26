---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

# Opdrachten

***
<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht1: Installeer een app op uw smartphone die in staat is om BLE communicatie kan opzetten zoals Serial Bluetooth Terminal. 
</p>
<p style="color:lightgreen; margin:10px">
Laat de ESP32 zijn BLE code uitvoeren, en communiceer met de ESP32 alover BLE. 
</p>
<p style="color:lightgreen; margin:10px">
Pas de ESP32 code aan zodat je in staat bent om 4 LED's aan-uit te schakelen vanaf uw smartphone. 
</p>
</div>

***

***
<div style="background-color:darkgreen; text-align:left; vertical-align:left; padding:15px;">
<p style="color:lightgreen; margin:10px">
Opdracht2: Installeer nu ook op uw RaspberryPi de code. Je zal hoogst waarschijnlijk moeten een python environment moeten configureren waarbinnen uw code zal moeten draaien. Ook bijhorende ibliotheken zullen moeten worden geïnstalleerd binnen deze environment. 
</p>
<p style="color:lightgreen; margin:10px">
Pas de code aan met de juiste parameters met betrekking tot uw ESP32 BLE configuratie: device naam, UUID's, ... 
</p>
<p style="color:lightgreen; margin:10px">
Pas de code aan zodat er de juiste verbinding wordt gelegd met uw MQTT broker en gebruik daar twee afzonderlijke topics. Eén voor elke communicatie richting. Laat de code draaien en test met MQTT explorer de werking ervan.
</p>
<p style="color:lightgreen; margin:10px">
Als dit allemaal werkt, maak dan een dashboard op uw laptop (Node-red) die de volledige communicatie bewerkstelligd. Zorg dat je zoveel als mogelijk LED's kunt aansturen en dat de toestand van de 4 drukknoppen getoond wordt. Kan je ook de potentiometer waarde visualiseren?
</p>
</div>

***
