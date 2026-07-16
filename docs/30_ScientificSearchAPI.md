# Scientific Search API

**Proyecto:** RF_Observatory  
**Estado:** Activo  
**Fecha:** 16 de Julio de 2026

## 1. Objetivo y Filosofía
Este documento detalla el endpoint `POST /api/v1/search`.

A diferencia de un CRUD tradicional, RF_Observatory no expone rutas como `GET /protocols?q=algo`. En su lugar, expone un **Motor de Consulta Científica**. La decisión arquitectónica **DA-052 (Search nunca consulta tablas)** establece que la API de búsqueda pregunta al modelo de conocimiento del Observatorio ("¿qué evidencia y protocolos satisfacen esta hipótesis?"), en lugar de consultar tablas relacionales.

## 2. Contrato REST

A pesar de ser una consulta, utiliza el verbo `POST` (**DA-045**, **DA-051**). Esto permite enviar un payload estructurado rico en criterios, evitando las limitaciones y la poca expresividad de los query parameters en una URL.

### Request Payload
```json
{
  "keyword": "OOK",
  "types": ["PROTOCOL", "FINGERPRINT"], // Dominios heterogéneos a consultar
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

### Response Payload
```json
{
  "timestamp": "2026-07-16T21:00:00Z",
  "requestId": "uuid-123",
  "success": true,
  "data": {
    "executedAt": "2026-07-16T21:00:00Z",
    "totalResults": 2,
    "results": [
      {
        "id": "proto-1",
        "type": "PROTOCOL",
        "summary": "Protocolo OOK 433MHz Genérico",
        "attributes": {
          "status": "PUBLISHED"
        }
      }
    ],
    "executionTimeMs": 15
  },
  "meta": {
    "executionTime": 15
  }
}
```

## 3. Implementación Interna
- El `SearchController` no realiza ninguna consulta a base de datos. Pasa el JSON al `SearchObservatoryCommand`.
- La orquestación en la Application Layer (`SearchObservatoryUseCase`) ejecuta consultas concurrentes (mediante puertos heterogéneos) hacia los repositorios de Protocolos, Fingerprints y Evidencias.
- Esta separación permite que el día de mañana, la búsqueda de protocolos se haga en PostgreSQL, y la de Fingerprints en una Vector Database o ElasticSearch, sin tocar una sola línea del Controller.
