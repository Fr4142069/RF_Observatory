# Reporte de Tarea: TASK-006 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Subsistema DecoderResult + QualityReport  
**Estado:** Completada  

## Objetivo
Implementar matemáticamente las entidades `DecoderResult` y `QualityReport`, asimilando las decisiones arquitectónicas DA-002 y DA-003: desvinculando la "Calidad de señal" de la "Decodificación", y tratándolos como resultados agnósticos e independientes que NO contienen ni ejecutan código heurístico.

## Archivos Creados / Modificados
- `shared/src/domain/value-objects/Payload.ts`: Creado (Objeto de Valor inmutable para encapsular la carga útil binaria/hexadecimal).
- `shared/src/domain/value-objects/SignalMetrics.ts`: Creado (Objeto de Valor que alberga la salud matemática de la captura como SNR y pulsos perdidos).
- `shared/src/domain/entities/DecoderResult.ts`: Creado (Representa el resultado inerte final del decoder).
- `shared/src/domain/entities/QualityReport.ts`: Creado (Representa la radiografía técnica de la calidad de la señal).
- `shared/src/domain/entities/Capture.ts`: Modificado para eliminar los últimos stubs temporales que quedaban e importar los contratos definitivos de ambas entidades.
- `project_management/reports/S02_TASK_006_REPORT.md`: Este documento de trazabilidad oficial.

## Relaciones Implementadas
- **DecoderResult -> Capture (1:1):** Pertenece obligatoriamente a una captura (`captureId`), pero desconoce la lógica de clasificación y el protocolo que lo generó (cumpliendo DA-002).
- **QualityReport -> Capture (1:1):** Pertenece a una captura (`captureId`), abstrayéndose del decoder (cumpliendo DA-003).
- **Capture:** Se cierra el círculo del agregado. La Captura ahora expone todas sus propiedades opcionales definitivas (`qualityReport`, `decoderResult`, `classification`, `fingerprint`) fuertemente tipadas.

## Decisiones Tomadas
- Se crearon los Value Objects `Payload` (para representar trenes de bits puros usando strings Hex/Bin, evitando atar el dominio al objeto nativo `Buffer` de NodeJS) y `SignalMetrics` (para aislar las mediciones teóricas).
- Se congeló el `origin` en `DecoderResult` usando un `string` puro para rastrear de forma auditable qué decoder exacto generó el dato (Ej: `KeeloqDecoder_v2.1`).

## Restricciones Respetadas
- **NO** se programaron decoders.
- **NO** se calculan ni analizan métricas. 
- Las entidades solo almacenan el "Qué", delegando absolutamente todo el "Cómo" al futuro Sprint 6.
