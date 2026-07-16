# Reporte de Tarea: TASK-001 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Núcleo del Dominio  
**Estado:** Completada  

## Objetivo
Implementar en código puro las entidades fundacionales `Session` y `Capture` junto a sus relaciones, respetando estrictamente el `02_DomainModel.md` sin acoplamiento a infraestructura.

## Archivos Creados / Modificados
- `project_management/sprints/SPRINT_02.md`: Actualizado para reflejar la estrategia de trabajo por "capas funcionales".
- `shared/src/domain/value-objects/Timestamp.ts`: Creado (Objeto de Valor para fechas unificadas).
- `shared/src/domain/value-objects/TimeWindow.ts`: Creado (Objeto de Valor para ventanas de tiempo).
- `shared/src/domain/entities/Capture.ts`: Entidad inmutable base.
- `shared/src/domain/entities/Session.ts`: Raíz del agregado que orquesta múltiples `Captures`.
- `project_management/reports/TASK_001_REPORT.md`: Este reporte de trazabilidad.

## Relaciones Implementadas
- **Session -> Capture (1:N):** La entidad `Session` expone una propiedad de solo lectura `captures: Capture[]`, actuando lógicamente como raíz del agregado.
- **Capture -> Session (N:1):** `Capture` requiere mandatoriamente la propiedad `sessionId`.
- **Capture -> Entidades Dependientes:** Se prepararon las firmas (`unknown` como stubs temporales) para `Fingerprint`, `Evidence`, `QualityReport`, `DecoderResult` y `Classification`, dejando listo el acoplamiento futuro. Todo está modelado matemáticamente sin usar promesas de base de datos ni referencias ORM.

## Decisiones Tomadas
- Se empleó el módulo `shared/src/domain/` para alojar estas interfaces. De esta manera, tanto Backend como Frontend consumirán el mismo contrato fuente.
- Todas las propiedades se declararon como `readonly` para forzar programáticamente el principio de "Inmutabilidad" dictado en la arquitectura original (una captura jamás se modifica en el sistema).

## Restricciones Respetadas
- **NO** se implementó ninguna dependencia externa (ni TypeORM, ni Express, ni React). Todo el código está basado íntegramente en los tipos primitivos de TypeScript.
- **NO** se implementó lógica algorítmica de Radiofrecuencia.
- Se respetó la prohibición de tocar otros módulos de infraestructura.
