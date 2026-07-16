# TASK-S6-004: RF Gateway Bootstrap

## Información General
- **Proyecto:** RF_Observatory
- **Sprint:** Sprint 6
- **Tipo:** Implementación de Infraestructura (Gateway)
- **Estado:** Completada

## Objetivo
Implementar el esqueleto base del RF Gateway respetando la arquitectura diseñada en la TASK-003, dotándolo de capacidades de encolamiento, reintentos y abstracción de hardware.

## Avance de la Implementación
1. **Creación del Proyecto:** Se generó un proyecto Node.js/TypeScript independiente en la carpeta `/gateway`, separando físicamente el observatorio del recolector.
2. **Interfaces Core (`src/adapters/IHardwareAdapter.ts`):** Se estableció el contrato que obligará a cualquier dispositivo futuro a estandarizar su entrada de datos.
3. **Manejo de Red (ApiClient & MessageBuffer):**
   - Se configuró `ApiClient` con Axios y manejo de timeouts para envíos al endpoint `POST /api/v1/captures`.
   - Se implementó `MessageBuffer`, una cola en memoria local que retiene capturas fallidas por interrupciones de red (Error 5xx o timeout) y realiza reintentos asíncronos.
4. **Gateway Engine (`src/core/GatewayEngine.ts`):** Orquestador central que escucha al hardware, encola el payload y dispara el procesamiento HTTP.
5. **Simulación (DummyAdapter):** Se incluyó un `DummyAdapter` temporal que emite pulsos simulados de RF cada 10 segundos para poder probar el Gateway sin conectar hardware físico de inmediato.

## Conclusión
El primer componente de "Laboratorio" del ecosistema está vivo. Conecta y emite señales (simuladas por ahora) y maneja automáticamente la caída del servidor re-encolando la información. Esto cierra el primer gran bloque del Sprint 6.
