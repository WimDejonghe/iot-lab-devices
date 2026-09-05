# Hoofdstuk 1 — Inleiding tot Modbus

## 1.1 Wat is Modbus?

Modbus is een communicatieprotocol dat wordt gebruikt om data uit te wisselen tussen elektronische
apparaten, voornamelijk in industriële automatisering. Het beschrijft **hoe berichten worden
opgebouwd** en **hoe apparaten met elkaar praten**, ongeacht het type fysieke verbinding (seriële
lijn, Ethernet, ...).

Typische toepassingen:
- PLC's die sensoren en actuatoren uitlezen/aansturen;
- gebouwautomatisering (verwarming, verlichting, toegangscontrole);
- energiemeters en meetapparatuur;
- relaismodules zoals de Waveshare Modbus POE ETH Relay die in deze cursus gebruikt wordt.

## 1.2 Waarom is Modbus nog steeds populair?

Hoewel het protocol al decennia oud is, blijft het een de-factostandaard in de industrie omdat het:
- **eenvoudig** is — de opbouw van een bericht is compact en makkelijk te implementeren, zelfs op
  goedkope microcontrollers;
- **open en royaltyvrij** is — iedereen mag het implementeren zonder licentiekosten;
- **breed ondersteund** wordt — vrijwel elke PLC, SCADA-systeem of industriële sensor ondersteunt
  Modbus in een of andere vorm;
- **robuust** is voor lange-afstandscommunicatie via RS-485, en tegelijk vlot te vertalen naar
  moderne Ethernet-netwerken (Modbus TCP).

## 1.3 Master/Slave versus Client/Server

Historisch gebruikt Modbus de termen **master** en **slave**:
- De **master** (of client) initieert altijd de communicatie — hij stuurt een vraag (request).
- De **slave** (of server) antwoordt enkel wanneer hem iets gevraagd wordt — hij stuurt nooit
  spontaan data.

In moderne documentatie (en in de officiële Modbus-specificatie sinds enkele jaren) worden de
termen **client** (voorheen master) en **server** (voorheen slave) gebruikt. In deze cursus
gebruiken we beide termen door elkaar, aangezien ze in de praktijk (en in veel tools zoals
Vircom en sscom) nog naast elkaar bestaan.

In onze opstelling is de **ESP32 de client/master**, en de **Waveshare relaismodule de
server/slave**.

## 1.4 De verschillende Modbus-varianten

| Variant | Fysieke laag | Kenmerk |
|---|---|---|
| **Modbus RTU** | Seriële lijn (RS-232/RS-485) | Compact binair formaat, met CRC16-foutcontrole |
| **Modbus ASCII** | Seriële lijn | Leesbaar ASCII-formaat, trager, zelden gebruikt |
| **Modbus TCP** | Ethernet (TCP/IP) | Modbus-bericht verpakt in een TCP/IP-pakket, poort 502 |

De Waveshare-module die we gebruiken kan **beide** aan: ze fungeert in feite als een **Modbus
gateway**, die Modbus RTU-commando's (die de microcontroller intern gebruikt) omzet naar Modbus
TCP-pakketten die je via het netwerk verstuurt — en omgekeerd. Dit wordt in hoofdstuk 3 en 4 verder
uitgediept.

## 1.5 Topologie in deze cursus

```
   ESP32 (client / master)
        |  WiFi
        |
   [Router / Switch]  192.168.1.0/24
        |
        |  Ethernet / PoE
        |
   Waveshare Modbus POE ETH Relay (B)   (server / slave, IP 192.168.1.200)
        |
        +-- 8x relaisuitgang (DO)
        +-- 8x digitale ingang (DI)
```

De ESP32 stuurt Modbus TCP-verzoeken naar de relaismodule om relais te schakelen of om de status
van de digitale ingangen op te vragen.

## 1.6 Wat volgt

In het volgende hoofdstuk bekijken we het **Modbus-datamodel**: welke soorten data een
Modbus-apparaat kan bevatten, en hoe je die aanspreekt met functiecodes. Daarna gaan we dieper in
op de twee transportvarianten (RTU en TCP), en tot slot passen we alles toe op de Waveshare-module
en de ESP32.
