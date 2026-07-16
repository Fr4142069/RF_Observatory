# Reporte de Tarea: UC-007 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Publish Known Protocol (UC-007)  
**Estado:** Completada  

## 1. Objetivo
Implementar la "Certificación" del conocimiento dentro de RF_Observatory (DA-025). Proveer el mecanismo mediante el cual un protocolo en borrador (DRAFT) supera una auditoría interna (tener huellas asociadas, documentación) y es promovido a "Publicado", estableciéndose como un Gold Standard inmutable para el resto de la base de datos.

## 2. Componentes Implementados
Ubicados en `backend/src/application/`:
- **DTOs:** `dto/protocols/PublishKnownProtocolRequestDTO.ts`, `PublishKnownProtocolResponseDTO.ts`. Se exige un `approvedBy` para asegurar la trazabilidad (quién certificó esto).
- **Command:** `commands/protocols/PublishKnownProtocolCommand.ts`.
- **Validator:** `validators/protocols/PublishKnownProtocolValidator.ts`.
- **Use Case:** `usecases/protocols/PublishKnownProtocolUseCase.ts`.
- **Tests:** `tests/application/usecases/protocols/PublishKnownProtocolUseCase.test.ts`.

## 3. Lógica del Negocio (Dominio)
En el Dominio `KnownProtocol.ts`:
- Se extendió la tipología de `status` para incorporar: `DRAFT`, `UNDER_REVIEW`, `VALIDATED`, `PUBLISHED`, `DEPRECATED`, `ARCHIVED`.
- Se introdujo el método de negocio mutador `markAsPublished()` protegiendo las invariantes (por ejemplo, arrojando excepción si el protocolo ya estaba publicado).

En la Capa de Aplicación (`PublishKnownProtocolUseCase.ts`):
- Se rechazan protocolos Inexistentes, Archivados o Deprecados.
- **Requisito mínimo estructural implementado:** Antes de llamar a `markAsPublished()`, el Use Case interroga al repositorio (`getAssociatedFingerprintsCount()`). Si el protocolo tiene **Cero Fingerprints**, se lanza la `ApplicationError: INSUFFICIENT_EVIDENCE`. Ningún protocolo puede publicarse si el Observatorio no posee huellas electromagnéticas que lo respalden en la realidad.

## 4. Pruebas Realizadas
Los tests unitarios pasaron 100% en verde comprobando:
- Camino feliz: Publicación exitosa de un protocolo en DRAFT que tiene evidencias, actualizando el estado de la entidad persistida.
- Camino triste 1: Error al intentar publicar un protocolo inexistente.
- Camino triste 2: Error al publicar un protocolo que ya ostentaba estado `PUBLISHED`.
- Camino triste 3: Error por estado incompatible (`DEPRECATED`).
- Camino triste 4: Interrupción temprana (Exception) porque el protocolo a publicar no posee Fingerprints en el sistema.

## 5. El Flujo Consolidado
La cadena está formalmente cerrada.
Una ráfaga de ondas en un SDR -> `Capture` -> `Classification` -> `Fingerprint` -> `Compare` -> Asignación a `KnownProtocol` (DRAFT) -> Validación de Evidencias -> `KnownProtocol` (PUBLISHED).
El sistema respeta rigurosamente el proceso científico de un observatorio de señales.
