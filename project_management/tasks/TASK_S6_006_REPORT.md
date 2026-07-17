# TASK-S6-006: Serial Transport Adapter

## Información General
- **Proyecto:** RF_Lab_Agent
- **Sprint:** Sprint 6
- **Tipo:** Infrastructure
- **Estado:** Completada

## Objetivo
Implementar la infraestructura de bajo nivel para que el Agente pueda recibir la telemetría enviada por el ESP32 de forma ininterrumpida y resistente a fallos de hardware (desconexiones).

## Avance de la Implementación
Se codificó la clase `SerialAdapter` implementando Node's `EventEmitter` con las siguientes características:
1. **Detección y Reconexión:** Implementado un ciclo recursivo (`attemptConnection()`) que, en caso de fallo al abrir o caída inesperada del puerto, programa un reintento utilizando `reconnectDelay` sin matar el proceso de Node.
2. **Validación Básica:** Utilizando `@serialport/parser-readline`, el adaptador escucha saltos de línea e intenta hacer un `JSON.parse`. Si el texto recibido no es JSON (ej. logs de debug del ESP32), se ignora silenciosamente.
3. **Emisión de Eventos:** Cumpliendo con el aislamiento de responsabilidades, el adaptador se limita a emitir el evento puro `CaptureReceivedEvent` con el payload normalizado.

## Cambios en el Framework General
1. Se reescribió la interfaz `IHardwareAdapter` original para no forzar callbacks directos, prefiriendo la flexibilidad del patrón de eventos nativo.
2. El `AgentEngine` fue reconfigurado para suscribirse a este evento, sirviendo como la "Goma" o "Composition Root" entre la Lectura Física (SerialAdapter) y el Despacho a la Nube (ObservatoryClient).

## Próximo Paso
El siguiente paso estratégico (TASK-007) consiste en cimentar ese Capture Pipeline completo asegurando la observabilidad total, y garantizando la **DA-059**: *Ningún dato capturado podrá desaparecer silenciosamente*. Esto implicará añadir la pieza faltante de la arquitectura: la **Cola de Eventos Persistente** antes de intentar enviar al servidor.
