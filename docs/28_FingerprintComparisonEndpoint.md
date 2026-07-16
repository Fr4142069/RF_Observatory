# Tercer Vertical REST (Compare Fingerprints)

**Proyecto:** RF_Observatory  
**Estado:** Activo  
**Fecha:** 16 de Julio de 2026

## 1. Objetivo
Este documento define la publicación de la primera capacidad de inferencia del observatorio (UC-005 - Compare Fingerprints) a través del endpoint `POST /api/v1/fingerprints/compare`.

El propósito fundamental de este endpoint es invocar algoritmos del dominio para buscar, comparar y emitir resultados probabilísticos respecto a la similitud entre dos o más `Fingerprints` capturados.

## 2. Decisiones Arquitectónicas (DA-046, DA-047, DA-048)
Se congelaron las siguientes reglas que guiaron esta implementación:
1. **Los algoritmos son reemplazables (DA-046):** El endpoint no conoce cómo se realiza la comparación. Hoy usa el motor básico; en el futuro usará Machine Learning o Análisis Espectral, pero el JSON Request y Response serán los mismos.
2. **La similitud es evidencia (DA-047):** Nunca se afirma "A = B". Siempre se dictamina `Similarity: 0.94`, `ConfidenceTier: TIER_1`.
3. **Determinismo (DA-048):** Con las mismas entradas el endpoint produce exactamente el mismo análisis.
4. **Búsquedas Complejas como POST (DA-045):** A pesar de ser una operación de solo lectura para el cliente (aunque guarda la auditoría internamente), la complejidad argumental requiere un payload `POST`.

## 3. Contrato REST

### Endpoint
`POST /api/v1/fingerprints/compare`

### Ejemplo de Request
```json
{
  "sourceFingerprintId": "uuid-1234",
  "targetFingerprintId": "uuid-5678" // Opcional para forzar búsqueda global
}
```
*Responsabilidad:* Proporcionar referencias. No se calculan umbrales, ni lógicas dentro del JSON.

### Ejemplo de Response
```json
{
  "timestamp": "2026-07-16T20:10:00Z",
  "requestId": "uuid-abcd",
  "success": true,
  "data": {
    "sourceFingerprintId": "uuid-1234",
    "evaluatedAt": "2026-07-16T20:10:00Z",
    "totalCandidatesEvaluated": 1,
    "matches": [
      {
        "id": "mock-comparison",
        "targetFingerprintId": "uuid-5678",
        "similarityLevel": 0.943,
        "confidenceTier": "TIER_1",
        "status": "EVALUATED"
      }
    ]
  },
  "meta": {
    "executionTime": 0
  }
}
```

## 4. Estructura Interna Reutilizada
Este vertical clona con exactitud meridiana el esqueleto avalado por la auditoría de la `TASK-007B`.
- `CompareFingerprintsController.ts` no contiene bucles lógicos ni reglas. Transfiere datos al `CompareFingerprintsCommand`.
- La orquestación inyecta `FingerprintRepository`, `ComparisonResultRepository` y `FingerprintComparisonDomainService`.
- Se reciclan `GlobalErrorHandler` y `ResponseFactory`.
