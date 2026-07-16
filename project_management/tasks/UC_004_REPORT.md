# Reporte de Tarea: UC-004 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Attach Evidence (UC-004)  
**Estado:** Completada  

## 1. Objetivo
Implementar el caso de uso que permite enriquecer el conocimiento técnico almacenado (Capturas, Clasificaciones o Fingerprints) mediante la asociación de Evidencias (fotos, manuales, notas técnicas, etc.). Cumple fielmente la directiva DA-017, garantizando que añadir evidencia sea una operación puramente documental y acumulativa que no muta el conocimiento ya establecido.

## 2. Componentes implementados
Ubicados en `backend/src/application/`:
- **DTOs:** `dto/evidence/AttachEvidenceRequestDTO.ts`, `EvidenceResponseDTO.ts`
- **Command:** `commands/evidence/AttachEvidenceCommand.ts`
- **Validator:** `validators/evidence/AttachEvidenceValidator.ts`
- **Use Case:** `usecases/evidence/AttachEvidenceUseCase.ts`
- **Tests:** `tests/application/usecases/evidence/AttachEvidenceUseCase.test.ts`

## 3. Flujo del Caso de Uso
1. Se recepciona la solicitud de asociación especificando a quién pertenece la evidencia (`targetType`: CAPTURE, CLASSIFICATION o FINGERPRINT).
2. Se validan los datos (se requiere un autor, un título, un tipo de evidencia y un contenido o referencia URI).
3. Dependiendo del `targetType`, el Use Case interroga al repositorio adecuado (`CaptureRepository`, `ClassificationRepository` o `FingerprintRepository`) para verificar la existencia del objetivo y, fundamentalmente, para **resolver el CaptureID madre** (ya que en nuestra estructura de persistencia, toda evidencia le pertenece transaccionalmente a la Captura).
4. Si la resolución falla (ej. el fingerprint referenciado no existe), se detiene el flujo con un `ApplicationError`.
5. Se crea la entidad `Evidence` con estado inicial `PENDING`.
6. Se persiste a través de un `EvidenceRepository`.
7. Retorna el DTO de respuesta con el ID de la nueva evidencia y la captura a la que quedó finalmente atada.

## 4. Dependencias
- Cuatro repositorios de la capa de persistencia: `CaptureRepository`, `ClassificationRepository`, `FingerprintRepository` y `EvidenceRepository`.
- La entidad `Evidence` del Dominio.

## 5. Validaciones
- Se valida que `targetType` solo pertenezca a la enumeración permitida.
- El validador exige que se proporcione al menos un enlace externo (`referenceUri`) o un texto adjunto (`textContent`). Una evidencia vacía es rechazada automáticamente.

## 6. Pruebas realizadas
Ejecución verde de tests unitarios:
- Asociar una evidencia directamente a una Captura.
- Asociar una evidencia apuntando al ID de un Fingerprint (resolviendo correctamente hacia el CaptureID).
- Lanzar excepción al intentar asociar evidencia a un objetivo inexistente.

## 7. Riesgos pendientes
- Para implementar este Use Case, fue necesario invocar un `EvidenceRepository` que aún no está codificado formalmente en el directorio de interfaces de Dominio (Sprint 2/3 no lo cubrió explícitamente como repositorio de raíz, aunque la entidad existe). Se solucionó definiendo temporalmente la interfaz dentro del propio archivo del Use Case. En el futuro cercano, esta interfaz debe moverse a `shared/src/domain/repositories/` y ser implementada en la capa de Prisma.
