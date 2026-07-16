# REST Response Standard

**Proyecto:** RF_Observatory  
**Estado:** Normativo  
**Fecha:** 16 de Julio de 2026

## 1. Objetivos y Principios
Este documento establece el **Contrato Oficial de Respuestas Exitosas** para la API REST del RF_Observatory.
El diseño busca proveer un marco hiper-predecible para todos los clientes (React, Flutter, Python, CLI) evitando que cada desarrollador tenga que adivinar dónde viene la data.

**Decisiones Clave:**
- **DA-035 (Toda respuesta exitosa tiene la misma forma):** Prohibido devolver arrays u objetos desnudos en la raíz de una respuesta.
- **DA-036 (El contrato HTTP es estable):** Añadir campos es libre; eliminarlos rompe el contrato y exige un cambio de versión mayor (v2, v3).

## 2. Estructura JSON Oficial
El envoltorio (envelope) base de cualquier respuesta exitosa en RF_Observatory será:

```json
{
  "timestamp": "2026-07-16T19:15:40Z",
  "requestId": "REQ-4F8A9C12",
  "success": true,
  "data": {},
  "meta": {}
}
```

### Reglas del Envoltorio:
- `timestamp`: ISO-8601 UTC. Útil para que los clientes calculen latencia o vigencia de la data.
- `requestId`: Idéntico al usado en la traza de errores. Permite vincular *logs* con solicitudes.
- `success`: Siempre será `true` para este contrato.
- `data`: El payload de negocio. Puede ser un Objeto (`{}`) o un Arreglo (`[]`), pero siempre debe existir (o ser `null` si no aplica).
- `meta`: Objeto que alberga metadatos de la respuesta (paginación, tiempos, advertencias).

## 3. El Objeto `meta`
El campo `meta` es el área extensible del contrato.

### 3.1 Paginación
Para endpoints de colecciones (como un listado de Capturas o un Search), el campo `meta.pagination` es obligatorio:

```json
"meta": {
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "totalItems": 1500,
    "totalPages": 30,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### 3.2 Campos opcionales adicionales
- `executionTime`: Tiempo en milisegundos que tardó el servidor en procesar la lógica (útil en endpoints pesados como `SearchObservatory`).
- `warnings`: Array de strings para avisar al cliente sobre situaciones no críticas. (Ej: "La frecuencia de la captura es inusualmente baja").
- `apiVersion`: Para identificar rápidamente a qué versión pertenece el contrato (ej: "v1.0.0").

## 4. Ejemplos Reales

### 4.1 GET Recurso Único (Ej: Buscar un Protocolo)
```json
{
  "timestamp": "2026-07-16T19:15:40Z",
  "requestId": "REQ-0001",
  "success": true,
  "data": {
    "id": "123",
    "name": "NICE FLOR-S"
  },
  "meta": {
    "executionTime": 15
  }
}
```

### 4.2 GET Colección / Búsqueda
```json
{
  "timestamp": "2026-07-16T19:16:00Z",
  "requestId": "REQ-0002",
  "success": true,
  "data": [
    { "id": "123", "type": "KNOWN_PROTOCOL" },
    { "id": "456", "type": "FINGERPRINT" }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 2,
      "totalItems": 2,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    },
    "executionTime": 312
  }
}
```

### 4.3 POST Creación
```json
{
  "timestamp": "2026-07-16T19:17:00Z",
  "requestId": "REQ-0003",
  "success": true,
  "data": {
    "protocolId": "789",
    "status": "DRAFT"
  },
  "meta": {}
}
```

### 4.4 Respuesta Vacía (Ej: DELETE o Respuesta sin Data pero con status 204 o 200)
```json
{
  "timestamp": "2026-07-16T19:18:00Z",
  "requestId": "REQ-0004",
  "success": true,
  "data": null,
  "meta": {
    "warnings": ["Record marked as archived, not permanently deleted."]
  }
}
```

## 5. Prácticas Prohibidas (Anti-patrones)
- **Prohibido devolver JSONs mutantes:** No se puede retornar un `Array` plano `[{}, {}]` si el cliente está esperando el JSON Base. Todo va dentro de `data`.
- **Prohibido mezclar data y meta:** No devolver campos como `total_records` o `status` adentro del objeto de negocio en el campo `data`.
- **Prohibido incluir Lógica de Negocio en la presentación HTTP:** El contrato es estúpido. Solo muestra lo que el DTO entregó, sin recalcular nada.
