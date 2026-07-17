# TASK-S6-006: First Live Capture Pipeline

## Información General
- **Proyecto:** RF_Observatory & RF_Lab_Agent
- **Sprint:** Sprint 6
- **Tipo:** Vertical Slice (End-to-End)
- **Estado:** CÓDIGO IMPLEMENTADO - EN ESPERA DE HARDWARE/DB

## Objetivo
Implementar y conectar todos los eslabones tecnológicos (desde el puerto Serial del hardware hasta la API del Observatorio) para conseguir que una señal RF física logre un viaje extremo a extremo y sea persistida en PostgreSQL, demostrando la viabilidad de la arquitectura diseñada.

## Tareas Ejecutadas
1. **Librería de Hardware:** Instalación de `serialport` para NodeJS en el Lab Agent.
2. **SerialAdapter:** Codificación del adaptador para ESP32 (`src/capture/SerialAdapter.ts`). Maneja la apertura de puertos, parsing por saltos de línea (Readline) y emite los objetos JSON generados por el microcontrolador.
3. **Composition Root (Engine):** Desarrollo de `AgentEngine` para subscribirse al Serial y derivar los datos inmediatamente al `ObservatoryClient` HTTP codificado en la TASK-005.
4. **Documentación:** Generación del pipeline en `docs/38_FirstLiveCapturePipeline.md`.

## Próximo Paso Crítico (Validación en el Laboratorio)
El pipeline ya existe en código. Se ha pospuesto la implementación de la Cola Interna (Queue) para priorizar este Vertical Slice, como lo instruyó el Director de Proyecto.

Para dar esta tarea por **Totalmente Completada** empíricamente:
- Se necesita la base de datos PostgreSQL en funcionamiento.
- Se necesita enchufar el ESP32 configurado a través del puerto Serial (`COM3` u otro definido en `.env`).
- Se necesita iniciar ambos procesos y accionar el control remoto físico.
