# Scientific Search API

**Proyecto:** RF_Observatory  
**Estado:** Activo  

## 1. Objetivo
Este documento detalla el endpoint `POST /api/v1/search`, responsable de publicar el Caso de Uso **UC-008 Search Observatory**.
Este endpoint es la puerta de acceso principal al conocimiento acumulado del Observatorio (Capturas, Evidencias, Fingerprints y Protocolos).

## 2. Flujo Completo
1. **Cliente HTTP** envía un payload POST con criterios (ej: keywords, rangos de frecuencia, etc).
2. **SearchController** extrae el JSON y mapea los datos al `SearchCriteriaDTO`.
3. **Application Layer** instancia el `SearchObservatoryCommand` (que implícitamente ejecuta el `SearchValidator`).
4. **SearchObservatoryUseCase (UC-008)** recibe el comando y lanza consultas concurrentes hacia los puertos de búsqueda de Protocolos, Evidencias y Fingerprints.
5. El Use Case combina, pagina y formatea la respuesta en un `SearchSummaryDTO`.
6. El Controller inyecta el DTO en el **ResponseFactory** para su retorno uniforme como HTTP 200 OK.

## 3. Contrato REST (Request / Response)

### Request
Endpoint: `POST /api/v1/search`

```json
{
  "keyword": "OOK",
  "types": ["PROTOCOL", "FINGERPRINT"],
  "frequencyRange": {
    "min": 433000000,
    "max": 434000000
  },
  "limit": 50,
  "offset": 0,
  "sortBy": "confidence",
  "sortDirection": "DESC"
}
```

### Response
```json
{
  "timestamp": "2026-07-16T21:00:00Z",
  "requestId": "uuid-1234",
  "success": true,
  "data": {
    "executedAt": "2026-07-16T21:00:00Z",
    "totalResults": 1,
    "results": [
      {
        "id": "proto-123",
        "type": "PROTOCOL",
        "summary": "Protocolo OOK 433MHz Genérico",
        "attributes": {
          "status": "PUBLISHED"
        }
      }
    ],
    "executionTimeMs": 42
  },
  "meta": {
    "executionTime": 42
  }
}
```

## 4. Relación con la Base de Conocimiento
El motor de búsqueda consolida todo el modelo. Al consultar el `SearchController`, no se está leyendo una tabla, se está interrogando a la ontología del observatorio: ¿Qué se ha capturado, qué hipótesis (fingerprints) existen y qué conocimiento está certificado (Protocolos Publish)?
