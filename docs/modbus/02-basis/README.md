# Hoofdstuk 2 — Modbus basisprincipes: datamodel en functiecodes

## 2.1 Het Modbus-datamodel

Elk Modbus-apparaat (server/slave) organiseert zijn data in vier soorten **tabellen**. Elke tabel
heeft zijn eigen adresruimte en toegangsrechten:

| Type | Toegang | Grootte | Typisch gebruikt voor |
|---|---|---|---|
| **Coils** | Lezen/Schrijven | 1 bit | Digitale uitgangen (bv. relais aan/uit) |
| **Discrete Inputs** | Enkel lezen | 1 bit | Digitale ingangen (bv. schakelaars, sensoren) |
| **Holding Registers** | Lezen/Schrijven | 16 bit | Instelbare waarden (bv. control mode, setpoints) |
| **Input Registers** | Enkel lezen | 16 bit | Meetwaarden (bv. temperatuur, teller) |

> **Let op:** de naamgeving "coil" (letterlijk: spoel) is historisch — ze verwijst naar de spoel
> van een relais die je aan/uit zet. Een coil is dus gewoon een schrijfbaar bit.

Op de Waveshare-relaismodule komt dit overeen met:
- **Coils** → de 8 relaisuitgangen (adres `0x0000`–`0x0007`);
- **Discrete Inputs** → de 8 DI-ingangen (adres `0x0000`–`0x0007`, maar in een *andere* tabel, zie
  hoofdstuk 5);
- **Holding Registers** → onder andere de relais-control-modes en de softwareversie.

## 2.2 Functiecodes

Een Modbus-verzoek bevat altijd een **functiecode** die aangeeft welke actie je wil uitvoeren en op
welk type data. De belangrijkste functiecodes:

| Functiecode (hex) | Naam | Werkt op |
|---|---|---|
| `0x01` | Read Coils | Coils lezen |
| `0x02` | Read Discrete Inputs | Discrete inputs lezen |
| `0x03` | Read Holding Registers | Holding registers lezen |
| `0x04` | Read Input Registers | Input registers lezen |
| `0x05` | Write Single Coil | Eén coil schrijven |
| `0x06` | Write Single Register | Eén holding register schrijven |
| `0x0F` | Write Multiple Coils | Meerdere coils tegelijk schrijven |
| `0x10` | Write Multiple Registers | Meerdere holding registers tegelijk schrijven |

Voor de labo's in deze cursus gebruiken we voornamelijk `0x05` (relais schakelen) en `0x02`
(digitale ingang uitlezen).

## 2.3 Request/response-principe

Modbus werkt altijd volgens hetzelfde stramien:

1. De **client** stuurt een **request**: "apparaat X, voer functie Y uit op adres Z".
2. De **server** voert de actie uit en stuurt een **response** terug: ofwel een bevestiging (bij
   schrijfacties), ofwel de opgevraagde data (bij leesacties).
3. Als er iets misloopt, stuurt de server een **exceptie-response** terug in plaats van een normale
   response.

### Voorbeeld: coil lezen

```
Request:  [Client]  "Lees 8 coils vanaf adres 0"        →  [Server]
Response: [Client]  ←  "Coils 0-7: 1,0,0,1,0,0,0,0"     ←  [Server]
```

### Voorbeeld: coil schrijven

```
Request:  [Client]  "Zet coil 0 op AAN (0xFF00)"        →  [Server]
Response: [Client]  ←  "Bevestigd: coil 0 = 0xFF00"     ←  [Server]
```

## 2.4 Exceptie-codes

Wanneer een verzoek niet correct kan worden uitgevoerd, antwoordt de server met een
**exceptie-functiecode** (de oorspronkelijke functiecode + `0x80`), gevolgd door een exceptiecode:

| Exceptiecode | Naam | Betekenis |
|---|---|---|
| `0x01` | Illegal Function | De functiecode wordt niet ondersteund |
| `0x02` | Illegal Data Address | Het opgevraagde adres bestaat niet |
| `0x03` | Illegal Data Value | De opgegeven waarde is ongeldig |
| `0x04` | Server Failure | Interne fout op het apparaat |
| `0x06` | Device Busy | Apparaat is bezig, probeer later opnieuw |

Bijvoorbeeld: als je functiecode `0x05` stuurt naar een adres dat niet bestaat, krijg je een
response met functiecode `0x85` en exceptiecode `0x02` terug.

## 2.5 Adressering: device address / slave ID / unit ID

Elk Modbus-verzoek bevat ook een **adres van het doelapparaat** (in RTU heet dit het *slave
address*, in TCP het *unit ID*). Bij RS-485 met meerdere apparaten op dezelfde lijn is dit
essentieel om te weten wie moet antwoorden.

Bij onze Waveshare-module (die je aanspreekt via TCP/IP) is er maar één apparaat per IP-adres, dus
de unit ID is altijd vast op `0x01` — het IP-adres identificeert het apparaat, niet de unit ID (zie
ook de FAQ in hoofdstuk 5).

## 2.6 Wat volgt

In de volgende twee hoofdstukken bekijken we hoe deze request/response-berichten er **concreet**
uitzien op byte-niveau: eerst voor Modbus RTU (hoofdstuk 3), daarna voor Modbus TCP (hoofdstuk 4).
