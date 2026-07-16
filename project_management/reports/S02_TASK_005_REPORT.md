# Reporte de Tarea: TASK-005 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Subsistema de Evidencias  
**Estado:** Completada  

## Objetivo
Implementar la entidad `Evidence` abstrayéndola de su implementación física. La evidencia en el dominio representa la "verdad técnica e innegable" (gráficos, espectros, notas, fotos, mediciones) y no simplemente un "archivo en el disco duro".

## Archivos Creados / Modificados
- `shared/src/domain/value-objects/EvidenceType.ts`: Creado (Tipificación estricta de la naturaleza de la evidencia técnica).
- `shared/src/domain/entities/Evidence.ts`: Creado (Entidad que respalda la inmutabilidad de la información subyacente).
- `shared/src/domain/entities/Capture.ts`: Modificado para eliminar la declaración temporal e inyectar el contrato definitivo de `Evidence`.
- `project_management/reports/S02_TASK_005_REPORT.md`: Este documento de trazabilidad oficial.

## Relaciones Implementadas
- **Evidence -> Capture (N:1):** La evidencia tiene un vínculo estricto forzado mediante la propiedad `captureId`.
- **Capture -> Evidence (1:N):** La captura, como Raíz del Agregado, expone el acceso a su arreglo inmutable de evidencias (`evidences: Evidence[]`).
- **Classification -> Evidence (N:N referencial):** En la TASK-004 preparamos la propiedad `evidenceReferences` dentro de `Classification`. Ahora ambas entidades coexisten en el dominio de manera aislada; una clasificación justifica su veredicto referenciando los IDs puros de estas evidencias sin generar ciclos rígidos.

## Decisiones Tomadas
- Se tipó la propiedad `evidenceType` mediante un Objeto de Valor con los tipos exactos mencionados por el arquitecto (`ORIGINAL_RF_CAPTURE`, `SPECTRUM_GRAPH`, `HARDWARE_PHOTO`, `TECHNICAL_NOTE`, `SARF_FILE`, etc.).
- Se dotó a la entidad de un `referenceUri` (para apuntar a recursos binarios sin conocer cómo el sistema los almacena) y un `textContent` explícito para evidencias puramente textuales/analíticas que no requieren un archivo adjunto.

## Restricciones Respetadas
- **NO** se importaron módulos del sistema nativo como `fs`.
- **NO** se programaron manejadores lógicos de subida de archivos (Uploaders).
- El dominio permanece aséptico y desconoce de infraestructuras de almacenamiento (S3, Discos de Windows, o Bases de Datos).
- Se congeló el concepto: Evidence = Evidencia Técnica, no archivo binario.
