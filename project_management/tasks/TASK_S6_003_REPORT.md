# TASK-S6-003: Laboratory Gateway Architecture

## Información General
- **Proyecto:** RF_Observatory
- **Sprint:** Sprint 6
- **Tipo:** Arquitectura
- **Estado:** Completada

## Objetivo
Diseñar la arquitectura del **RF Gateway**, el componente de infraestructura "puente" encargado de comunicar a los dispositivos físicos de captura (ESP32, SDR, etc.) con el núcleo central de RF_Observatory mediante la API REST.

## Entregables Generados
- Documento de arquitectura normativo: `docs/35_LaboratoryGatewayArchitecture.md`.

## Decisiones Clave Adoptadas
1. **Separación Estricta de Preocupaciones:** Se dictaminó que el Gateway es estrictamente un enrutador / traductor de transporte. No debe contener ninguna regla de negocio, deducción científica o heurística. Su función es "pasar el mensaje de forma confiable".
2. **Buffer de Retención y Reintentos:** Dada la naturaleza intermitente de las redes en entornos de laboratorio/hardware, la arquitectura exige que el Gateway almacene temporalmente las capturas para evitar pérdidas de señales por fallas transitorias de red (5xx, Timeouts).
3. **Hardware-Agnostic (Expansión):** El diseño a través de `IHardwareAdapter` permite conectar cualquier origen de datos futuro sin tener que reescribir el cliente de comunicación con la API.
4. **Nomenclatura Estratégica:** Se nombró **RF Gateway** y no "ESP32 Gateway", sentando las bases para un componente transversal y genérico, coherente con las prácticas establecidas en Sprints anteriores.

## Siguientes Pasos
Una vez documentada la arquitectura del telescopio, el camino lógico del Sprint 6 es continuar con la codificación de este cliente o abordar la habilitación técnica final del backend (observabilidad / logs) para poder operar este flujo end-to-end de manera confiable en el laboratorio.
