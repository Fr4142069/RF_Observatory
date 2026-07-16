# API Error Model

**Proyecto:** RF_Observatory  
**Estado:** Normativo  
**Fecha:** 16 de Julio de 2026

## 1. Objetivos y Principios
Este documento establece el **Contrato Oficial de Errores** para la API REST del RF_Observatory.
Los errores no son un "mal necesario"; son parte fundamental de la API. Diseñarlos como un contrato estricto garantiza la estabilidad del sistema frente a sus clientes (Web, Móvil, Integraciones B2B).

**Decisiones Clave:**
- **DA-033 (Los errores son contratos, no textos):** Prohibido devolver simples `{ "message": "error" }`.
- **DA-034 (El código identifica; el mensaje explica):** Los clientes (Frontend/Otros Backends) deben programar sus lógicas de recuperación basándose en el campo `code`. Jamás usando expresiones regulares sobre el campo `detail`.

## 2. Estructura JSON Oficial
Absolutamente todo error emitido por la API de RF_Observatory (desde un simple error de validación hasta una caída de base de datos) debe envolverse en esta estructura exacta:

```json
{
  "timestamp": "2026-07-16T18:35:22Z",
  "requestId": "REQ-4F8A9C12",
  "status": 404,
  "code": "KNOWN_PROTOCOL_NOT_FOUND",
  "title": "Known protocol not found",
  "detail": "The requested protocol does not exist or has been deleted.",
  "path": "/api/v1/protocols/123"
}
```

### Campos:
- `timestamp`: ISO-8601 UTC. Útil para correlacionar eventos en logs de infraestructura.
- `requestId`: ID único inyectado por un middleware a la llegada de la solicitud. Permite a los clientes reportar un fallo y al soporte rastrearlo.
- `status`: Código HTTP real. (Redundante en el body para facilitar acceso de librerías cliente).
- `code`: Cadena de texto inmutable en UPPER_SNAKE_CASE. Es la llave primaria del error.
- `title`: Título corto humano del error. (Puede traducirse).
- `detail`: Descripción larga. Ayuda al desarrollador o usuario. (Puede traducirse).
- `path`: La ruta HTTP que detonó el fallo.

## 3. Taxonomía de Errores (Status HTTP Mapeado)
Los errores se dividen en categorías semánticas, cada una mapeada a un código HTTP rígido:

| Categoría | HTTP Status | Uso |
|---|---|---|
| **Validation** | `422 Unprocessable Entity` (o `400`) | El Payload no respeta el esquema de los DTOs. |
| **Unauthorized** | `401 Unauthorized` | Petición sin credenciales válidas. |
| **Forbidden** | `403 Forbidden` | Credenciales válidas, pero carece de permisos. |
| **Resource Not Found**| `404 Not Found` | El UUID solicitado no existe en la base de datos. |
| **Conflict** | `409 Conflict` | Violación de un estado único (ej: crear un alias que ya existe). |
| **Business Rule** | `422` o `400` | Rompe una restricción del Dominio (Ej: Publicar sin evidencias). |
| **Unexpected / Infra** | `500 Internal Server Error` | Errores de Prisma, caídas de Redis, excepciones no controladas. |

## 4. Catálogo Inicial de Códigos (`code`)
Este es el catálogo de referencia estable. Se irá ampliando a medida que crezcan los Casos de Uso.

**Validación y Entrada:**
- `VALIDATION_ERROR`
- `SEARCH_CRITERIA_INVALID`

**Recursos Inexistentes (404):**
- `CAPTURE_NOT_FOUND`
- `FINGERPRINT_NOT_FOUND`
- `KNOWN_PROTOCOL_NOT_FOUND`
- `EVIDENCE_NOT_FOUND`

**Reglas de Negocio y Conflictos (409 / 422):**
- `PROTOCOL_ALREADY_EXISTS`
- `INVALID_STATE_TRANSITION` (Intentar publicar algo ya publicado o archivado)
- `INSUFFICIENT_EVIDENCE` (Intentar publicar protocolo sin fingerprints)
- `DUPLICATE_FINGERPRINT`

**Errores del Servidor (500):**
- `INTERNAL_ERROR` (Mensaje genérico que oculta la causa real)

## 5. Prácticas Prohibidas (Anti-patrones)
Para proteger la seguridad y la abstracción del sistema:
1. **NO exponer Stack Traces:** Nunca devolver el `.stack` de la excepción en producción.
2. **NO exponer detalles internos de Base de Datos:** Está prohibido retornar mensajes crudos de Prisma (Ej: `Unique constraint failed on the fields: (alias)`). Debe traducirse a `PROTOCOL_ALREADY_EXISTS`.
3. **NO modificar el nombre de los campos:** No enviar `statusCode` un día y `status` al otro. Se debe usar un Factory estricto.
4. **NO envolver el error arbitrariamente:** El JSON oficial mostrado en la sección 2 es la raíz de la respuesta HTTP, no debe ir anidado dentro de un `{"data": { ... } }`.
