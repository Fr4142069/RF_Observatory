# EPIC-001: Laboratory Integration

## Objetivo Estratégico
Conectar empíricamente el laboratorio físico (dispositivos de hardware, actuadores y antenas RF) con el ecosistema central `RF_Observatory`. 
Este Epic marca el punto de inflexión del proyecto: la transición de un sistema de "software teórico y arquitectura" a una **Plataforma de Ingeniería Experimental** donde el éxito se valida en el mundo físico y no únicamente mediante pruebas unitarias.

## Experimentos Asociados
El progreso de este Epic se regirá por la ejecución exitosa y la recolección de métricas de los siguientes experimentos (en orden táctico):

- **EXP-001 (First Live Capture):** Comprobar que una señal cruda transita exitosamente de extremo a extremo (Hardware -> Base de Datos) usando únicamente los contratos públicos.
- **EXP-002 (Latency Measurement):** Cuantificar empíricamente el tiempo total del pipeline (ESP32 -> Gateway -> REST -> DB) para establecer un baseline de rendimiento.
- **EXP-003 (Offline Recovery):** Simular una caída catastrófica del servidor backend. Inyectar capturas físicas en el Agente y verificar que el Gateway persiste los eventos y los re-sincroniza en el momento exacto en que la red se restablece sin intervención humana.
- **EXP-004 (Duplicate Transmission):** Alterar el hardware para emitir la misma captura idéntica por duplicado intencionalmente para verificar el comportamiento de la capa de idempotencia (o la falta de ella) en el sistema.
- **EXP-005 (Noise Injection):** Bombardear el puerto serial del Agente con tramas JSON mutiladas, buffers desbordados y caracteres nulos (`\0`) para comprobar si el Gateway sobrevive sin crashear.
- **EXP-006 (Stress Test):** Programar un loop físico en el microcontrolador para emitir ráfagas de 100, 500 y 1000 capturas por segundo, midiendo el punto de quiebre (bottleneck) de la plataforma (¿es el ESP32, el Gateway o el Servidor?).

## Estado del Epic
- **Fase Actual:** Iniciando ejecución de `EXP-001`.
- **Requisitos de Laboratorio:** Instancia PostgreSQL viva (sin SQLite), ESP32 configurado en puerto Serial, y un mando transmisor OOK 433MHz.
