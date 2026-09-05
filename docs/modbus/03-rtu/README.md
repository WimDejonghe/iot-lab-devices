# Hoofdstuk 3 — Modbus RTU

## 3.1 Wat is Modbus RTU?

Modbus RTU (Remote Terminal Unit) is de klassieke, seriële variant van Modbus. Het bericht wordt
verstuurd als een compacte reeks bytes over een seriële verbinding, typisch **RS-485** (voor
meerdere apparaten op één lijn) of RS-232 (punt-tot-punt).

## 3.2 Seriële parameters

Voor een correcte RTU-communicatie moeten **beide apparaten** dezelfde seriële instellingen
gebruiken:

| Parameter | Typische waarde |
|---|---|
| Baudrate | 9600, 19200, of 115200 bps |
| Databits | 8 |
| Pariteit | Geen (N) |
| Stopbits | 1 |

> Bij de Waveshare-module ligt de interne seriële verbinding (tussen de netwerkchip en de
> Modbus-microcontroller) vast op **115200, 8, N, 1** — dit is niet aanpasbaar, zoals vermeld in
> hoofdstuk 5.

## 3.3 Opbouw van een RTU-frame

Een Modbus RTU-bericht bestaat uit vier delen:

```
[Device Address] [Function Code] [Data] [CRC16]
     1 byte            1 byte     N bytes  2 bytes
```

| Veld | Beschrijving |
|---|---|
| **Device Address** | Adres van het doelapparaat (0x01-0xFF); 0x00 = broadcast |
| **Function Code** | Welke actie/functie (zie hoofdstuk 2) |
| **Data** | Afhankelijk van de functie: adres, aantal, waarden, ... |
| **CRC16** | Foutcontrole over alle voorgaande bytes |

### Voorbeeld: relais 1 inschakelen

```
01 05 00 00 FF 00 8C 3A
```

| Bytes | Betekenis |
|---|---|
| `01` | Device address = 1 |
| `05` | Functiecode = Write Single Coil |
| `00 00` | Coil-adres = 0 (relais 1) |
| `FF 00` | Waarde = AAN |
| `8C 3A` | CRC16-checksum |

De server (relaismodule) stuurt bij een schrijfcommando **exact hetzelfde bericht** terug als
bevestiging.

## 3.4 CRC16 — foutcontrole

Modbus RTU gebruikt een **CRC16**-checksum (Cyclic Redundancy Check) om te controleren of het
bericht onderweg niet beschadigd is geraakt door ruis op de lijn. De CRC wordt berekend over alle
bytes vóór het CRC-veld zelf, en toegevoegd in **little-endian** volgorde (laagste byte eerst).

Je hoeft de CRC16 in de praktijk zelden manueel te berekenen — testtools zoals sscom kunnen dit
automatisch doen (optie "Verify: ModbusCRC16"), en bibliotheken zoals `pymodbus` of `umodbus`
rekenen dit voor je uit.

### Enkele voorbeeldcommando's (device-adres 1)

```
Relais 0 AAN:    01 05 00 00 FF 00 8C 3A
Relais 0 UIT:    01 05 00 00 00 00 CD CA
Relais 1 AAN:    01 05 00 01 FF 00 DD FA
Relais 1 UIT:    01 05 00 01 00 00 9C 0A
Relais 0 toggle: 01 05 00 00 55 00 F2 9A
```

## 3.5 Half-duplex en timing

RS-485 is van nature **half-duplex**: er kan maar één apparaat tegelijk "aan het woord" zijn op de
lijn. Modbus RTU lost dit op door te werken met een strikte **request-response**-cyclus: de client
wacht altijd op een antwoord (of een timeout) vooraleer een volgend bericht te versturen.

Daarnaast herkent een RTU-ontvanger het *einde* van een bericht aan een stilte van minstens
**3,5 karaktertijden** op de lijn — er is dus geen expliciete "einde bericht"-marker zoals bij
tekstprotocollen.

## 3.6 Voor- en nadelen van RTU

| Voordeel | Nadeel |
|---|---|
| Compact, weinig overhead | Traag bij lange berichten (seriële snelheid) |
| Werkt over lange afstanden (RS-485: tot ~1200m) | Half-duplex: geen gelijktijdige communicatie |
| Ondersteunt meerdere apparaten op één lijn (multidrop) | Eén kabelbreuk kan de hele lijn platleggen |
| Robuust dankzij CRC16 | Vereist seriële hardware (RS-485-converter, bekabeling) |

## 3.7 Wat volgt

In het volgende hoofdstuk bekijken we **Modbus TCP** — de variant die we in de labo's effectief
gaan gebruiken om via het netwerk met de Waveshare-module te communiceren.
