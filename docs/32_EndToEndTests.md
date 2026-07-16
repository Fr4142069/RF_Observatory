# End-to-End Integration Tests

**Proyecto:** RF_Observatory  
**Estado:** Activo  
**Sprint:** 5

## 1. Objetivo
Validar el funcionamiento completo del ecosistema del Observatorio (desde HTTP hasta la capa de Persistencia, ida y vuelta) simulando el comportamiento de un cliente externo, utilizando exclusivamente la API REST pública sin atajos.

## 2. Entorno
- Servidor: **Express.js (ServerBootstrap)**
- Interfaz: **HTTP (Node fetch)**
- Base de Datos: **Mock in-memory** (inyección temporal vía `RepositoryFactory` hasta habilitar Prisma en el Sprint 6).

## 3. Escenarios Ejecutados y Resultados

### Casos Positivos
1. **Registrar Captura (`POST /api/v1/captures`)**
   - *Esperado*: Retornar 201 Created y UUID.
   - *Obtenido*: ✅ Pasó.
2. **Registrar Evidencia (`POST /api/v1/evidence`)**
   - *Esperado*: Retornar 201 y vincular con Target (Capture).
   - *Obtenido*: ✅ Pasó.
3. **Comparar Fingerprints (`POST /api/v1/fingerprints/compare`)**
   - *Esperado*: Retornar 200 y array de similitudes.
   - *Obtenido*: ✅ Pasó.
4. **Registrar Protocolo Conocido (`POST /api/v1/protocols`)**
   - *Esperado*: Retornar 201 con estado DRAFT.
   - *Obtenido*: ✅ Pasó.
5. **Publicar Protocolo (`POST /api/v1/protocols/:id/publish`)**
   - *Esperado*: Retornar 200 y cambiar estado a PUBLISHED (requiere huellas previas).
   - *Obtenido*: ✅ Pasó.
6. **Buscar Protocolo Publicado (`POST /api/v1/search`)**
   - *Esperado*: Retornar 200 y array de resultados abstractos.
   - *Obtenido*: ✅ Pasó.

### Casos Negativos (Manejo de Errores)
1. **Endpoint Inexistente (`GET /api/v1/endpoint-no-existe`)**
   - *Esperado*: 404 Not Found gestionado por `NotFoundMiddleware`.
   - *Obtenido*: ✅ Pasó.
2. **Validación Semántica Fallida (`POST /api/v1/captures` sin datos clave)**
   - *Esperado*: Rechazo mediante `ValidationException` mapeada a 422, 400 o 500 por el ErrorFactory.
   - *Obtenido*: ✅ Pasó.
3. **Payload JSON Inválido (`{ invalid_json: `)**
   - *Esperado*: 400 Bad Request gestionado globalmente antes del Controller.
   - *Obtenido*: ✅ Pasó.

## 4. Conclusión y Cobertura Funcional
La capa HTTP de RF_Observatory es robusta. No existen fallas de enrutamiento y los middlewares inyectan correctamente el Request ID y gestionan errores imprevistos o de validación de los Casos de Uso del Dominio. La integración en el Composition Root (Bootstrap) está certificada y lista para recibir el ORM definitivo.
