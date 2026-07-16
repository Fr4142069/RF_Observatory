# Reporte de Tarea: TASK-001 (Sprint 3)

**Sprint:** 3 – Persistencia  
**Nombre de la Tarea:** Traducción del Modelo del Dominio al Modelo Relacional  
**Estado:** Completada  

## Objetivo
Elaborar la especificación relacional lógica (documento `09_RelationalModel.md`) actuando como el puente de diseño entre el modelo de dominio inerte (Sprint 2) y la futura implementación física de la base de datos a cargo de PostgreSQL y Prisma.

## Archivos Creados / Modificados
- `docs/09_RelationalModel.md`: Creado. Documenta de forma agnóstica la estructura tabular derivada.
- `project_management/reports/S03_TASK_001_REPORT.md`: Este documento de trazabilidad oficial.

## Decisiones Tomadas
- Se aplicó un patrón de nombramiento en plural (Sessions, Captures, Fingerprints) en el modelo relacional, diferenciando visual y léxicamente las "Tablas" de las "Entidades" (Session, Capture, Fingerprint) del Dominio.
- Se respetó la directriz estricta de NO escribir código SQL, definiciones DDL ni configurar el archivo `schema.prisma`. 
- Se formalizó la estrategia referencial y las restricciones de cascada a nivel puramente conceptual.

## Restricciones Respetadas
- **NO** se crearon ni se inventaron entidades de negocio accesorias en el proceso de mapeo.
- **NO** se escribió un solo comando de SQL o Prisma.
- El modelo se derivó fielmente sin obligar al Dominio a retroceder o "ajustarse" a los convencionalismos de las bases de datos.
