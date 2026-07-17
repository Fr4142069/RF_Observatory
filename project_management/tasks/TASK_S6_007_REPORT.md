# TASK-S6-007: Laboratory Capture Protocol (LCP)

## Información General
- **Proyecto:** RF_Lab_Agent / Arquitectura Core
- **Sprint:** Sprint 6
- **Tipo:** Protocol / Interface Design
- **Estado:** Completada

## Objetivo
Establecer el **Laboratory Capture Protocol (LCP)** como el contrato de datos oficial e inamovible entre el hardware periférico (ESP32, SDR) y el sistema de ingesta, abstrayendo completamente al Observatorio de la tecnología de transporte (Serial, TCP, BLE, WiFi).

## Logros de la Tarea
1. **Diseño Documental:** Se redactó `docs/40_LaboratoryCaptureProtocol.md` estableciendo la estructura JSON exacta que el Hardware está obligado a emitir.
2. **Materialización en Código:** Se implementó `LCP.ts` en el Agente para proveer tipado fuerte al payload, asegurando que todo adaptador físico debe retornar esta estructura.
3. **Formalización de DA-060:** Se integró la Decisión de Arquitectura 060 en el Casebook: *"El laboratorio nunca interpreta. La verdad científica nace únicamente en el Observatorio"*. Esto sella legalmente la separación entre la recolección de evidencia y su clasificación.

## Impacto Inmediato
A partir de este hito, el `RF_Lab_Agent` puede escalar infinitamente. El día de mañana podemos escribir un `MQTTAdapter` o un `WiFiAdapter`, y mientras esos adaptadores respeten el JSON de LCP, el motor central los procesará y encolará sin tocar una sola línea de código del sistema core. 

## Siguientes Pasos
Este protocolo consolida el "Pipeline" del Laboratorio. Todo el ecosistema está técnicamente alineado para ejecutar el **DO-001 (Demostración Operativa 1): Primera Captura Física**.
