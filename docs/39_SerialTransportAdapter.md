# 39_SerialTransportAdapter

## 1. Objetivos
Implementar la infraestructura base para que el **RF_Lab_Agent** escuche el mundo físico. Este adaptador (`SerialAdapter.ts`) es responsable de abrir el puerto serie, escuchar las transmisiones que arroja el microcontrolador (ESP32) por USB, e inyectarlas al sistema en un formato predecible.

## 2. Responsabilidades Principales
- **Conectividad:** Abrir un puerto físico (ej. `COM3` o `/dev/ttyUSB0`) a un baudrate específico (ej. `115200`).
- **Parsing:** Leer línea por línea, asumiendo que cada línea es un evento en formato JSON.
- **Reconexión Automática:** Si el cable se desconecta o el ESP32 se reinicia, el adaptador debe atrapar el error, no crashear, e intentar reconectarse indefinidamente en intervalos configurables (`reconnectDelay`).
- **Generación de Eventos:** Utilizar el patrón de Pub/Sub (`EventEmitter`) para aislar la lectura física del motor principal. El adaptador solo emite `CaptureReceivedEvent` y deja que el Engine decida qué hacer con él.

## 3. Lo que NO hace (Clean Architecture)
Para preservar la pureza del Lab Agent, el adaptador Serial **NUNCA**:
- Deserializa protocolos RF (OOK/ASK).
- Analiza tiempos de pulso para averiguar qué control es.
- Filtra capturas basándose en lógica de seguridad.
- Conoce al `ObservatoryClient` ni sabe que los datos van a ir a la nube.

Su trabajo termina en el milisegundo en que dispara `this.emit('CaptureReceivedEvent', rawData)`.

## 4. Configuración
Toda variable de entorno necesaria se gestiona mediante `config/index.ts`:
- `SERIAL_PORT`: Puerto de montaje del microcontrolador.
- `SERIAL_BAUDRATE`: Velocidad de comunicación.
- `SERIAL_RECONNECT_DELAY`: Tiempo de backoff antes de reintentar abrir el puerto tras una caída física.
