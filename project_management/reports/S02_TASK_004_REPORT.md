# Reporte de Tarea: TASK-004 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Subsistema Classification  
**Estado:** Completada  

## Objetivo
Implementar la entidad `Classification` de manera que funcione exclusivamente como un **veredicto o resultado** inerte de análisis, desconociendo por completo la lógica algorítmica, heurística, de machine learning o de inferencia que lo produjo.

## Archivos Creados / Modificados
- `shared/src/domain/value-objects/SimilarityScore.ts`: Creado (Objeto de Valor para encapsular la similitud acotada conceptualmente entre 0 y 100%).
- `shared/src/domain/value-objects/ClassificationOrigin.ts`: Creado (Tipificación estricta de la procedencia del análisis: Humano, ML, Heurística, etc.).
- `shared/src/domain/entities/Classification.ts`: Creado (Entidad base del subsistema).
- `shared/src/domain/entities/Capture.ts`: Modificado para eliminar la declaración temporal e inyectar el contrato de `Classification`.
- `project_management/reports/S02_TASK_004_REPORT.md`: Este documento de trazabilidad.

## Relaciones Implementadas
- **Classification -> Capture:** Referencia inmutable obligatoria (`captureId`).
- **Classification -> Protocol:** Referencia semántica compuesta (`protocolId` y `protocolType` para indicar si apunta a `KnownProtocol` o `UnknownProtocol`). Esta decisión aísla el catálogo del agregado principal, cumpliendo la regla de que el protocolo no es dueño de la clasificación.
- **Capture -> Classification:** La captura, operando como raíz de agregado, agrupa a su clasificación como propiedad (puede nacer sin ella y reescribirse luego).

## Decisiones Tomadas
- Se extrajo el concepto de origen a un Objeto de Valor (`ClassificationOrigin`) usando un tipo de unión estricto. Esto satisface tu indicación directa de que existirá una "Clasificación manual", "Heurística", "Estadística", "Machine Learning" e "IA". Nos permite auditar la procedencia sin que el modelo deba ejecutar código.

## Restricciones Respetadas
- **NO** se escribieron funciones matemáticas.
- **NO** hay sentencias lógicas que deduzcan qué protocolo es la señal.
- El modelo desconoce completamente cómo se obtuvo el veredicto. Solo almacena el "Qué", delegando el "Cómo" al Sprint 6.
