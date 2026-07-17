# 40_LaboratoryCaptureProtocol (LCP)

## 1. Definición del Contrato
El **Laboratory Capture Protocol (LCP)** es el contrato de datos universal e inmutable que rige la frontera entre el mundo analógico/físico (`RF_Lab`) y la infraestructura de ingesta (`RF_Lab_Agent`).

Cualquier hardware periférico, sin importar su topología de red (Serial, WiFi, MQTT, BLE) ni su arquitectura interna (ESP32, SDR, Raspberry), debe emitir sus lecturas empaquetadas exactamente bajo el esquema LCP.

## 2. Filosofía del Protocolo
- **Agnóstico al Negocio:** El LCP ignora por completo la existencia de "Protocolos RF", "Fingerprints", "Clasificaciones" o "Sistemas de Seguridad".
- **Puramente Descriptivo:** Solo responde a: *quién lo capturó, cómo estaba configurado el radio, y cuáles fueron los tiempos en el aire*.
- **Evidencia Pura (DA-060):** El laboratorio observa, no interpreta. El LCP es la materialización de esa regla.

## 3. Especificación del Payload (JSON)

```json
{
  "captureId": "UUID-generado-por-hardware-o-agente",
  "timestamp": "ISO-8601",

  "hardware": {
      "deviceId": "ESP32_LAB_01",
      "firmware": "v1.2.0",
      "board": "ESP32"
  },

  "radio": {
      "frequency": 433920000,
      "modulation": "OOK",
      "sampleRate": 1000000
  },

  "capture": {
      "pulseCount": 84,
      "duration": 27483,
      "raw": [
         400, -800, 400, -800, 1200, -400
      ]
  }
}
```

## 4. Flujo Transparente
Con LCP establecido, el Gateway (`RF_Lab_Agent`) se transforma de un "Lector de Puertos" a una **Plataforma Multiprotocolo**. El Engine interno espera ingerir LCP. Cómo llegó ese LCP al Gateway (si por USB o por WebSocket) es irrelevante para el ciclo de vida del dato.
