# Reporte de Tarea: UC-006 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Register Known Protocol (UC-006)  
**Estado:** Completada  

## 1. Objetivo
Poner los cimientos del "Catálogo de Conocimiento Validado". El UC-006 permite que los investigadores de RF_Observatory materialicen sus descubrimientos registrando protocolos formales (ej. "NICE FLOR-S", "BFT MITTO"). Este caso de uso aplica la directiva DA-024: el protocolo abstrae una familia validada de comunicaciones, y los Fingerprints observados se asocian a él, pero nunca se "transforman" en el protocolo per se.

## 2. Componentes implementados
Ubicados en `backend/src/application/`:
- **DTOs:** `dto/protocols/RegisterKnownProtocolRequestDTO.ts`, `KnownProtocolResponseDTO.ts`
- **Command:** `commands/protocols/RegisterKnownProtocolCommand.ts`
- **Validator:** `validators/protocols/RegisterKnownProtocolValidator.ts`
- **Use Case:** `usecases/protocols/RegisterKnownProtocolUseCase.ts`
- **Tests:** `tests/application/usecases/protocols/RegisterKnownProtocolUseCase.test.ts`
- **Domain Entity:** Se reescribió `shared/src/domain/entities/KnownProtocol.ts` migrándolo de interfaz a Clase de Dominio pura y rica, añadiendo versión, alias, referencias externas y control de estados (DRAFT, ACTIVE, DEPRECATED).

## 3. Flujo del Caso de Uso
1. Se valida estructuralmente la entrada (el Command prohíbe frecuencias negativas o nombres vacíos).
2. El orquestador interroga al `KnownProtocolRepository` para frenar la creación si el `name` o el `alias` ya existen en la base de datos (prevención de catálogos duplicados).
3. Si la solicitud incluyó una lista de `initialFingerprintIds` (huellas que se asocian desde el momento cero al protocolo), se interroga al `FingerprintRepository` para confirmar que todas las huellas existan realmente.
4. Se crea la entidad inmutable `KnownProtocol`.
5. Se persiste la nueva entidad.
6. Se persisten las asociaciones vinculando las huellas originales a este nuevo catálogo.
7. Se retorna el DTO oficial de respuesta.

## 4. Dependencias
- `KnownProtocolRepository`: Interfaz que manejará la tabla de protocolos y la tabla asociativa hacia Fingerprints.
- `FingerprintRepository`: Para asegurar que no asociaremos huellas fantasma.

## 5. Pruebas realizadas
Ejecución verde de tests unitarios:
- Registro normal de un protocolo nuevo, asociando un Fingerprint de prueba.
- Intercepción exitosa (ApplicationError) al intentar registrar un nombre duplicado.
- Intercepción exitosa al intentar asociar Fingerprints que no existen en el repositorio.

## 6. Perspectiva hacia el Sprint 5 (Variantes de Protocolo)
Como se discutió arquitectónicamente, `KnownProtocol` abarca un "estándar". Queda anotada la observación de que en el futuro la cardinalidad Fingerprint -> KnownProtocol puede quedar demasiado ancha. Si en los siguientes Sprints o Casos de Uso (Search) detectamos sobrecarga para separar generaciones (Ej. Keeloq Gen 1 vs Keeloq Gen 2), el modelo de dominio está completamente preparado para recibir una entidad intermedia (`ProtocolVariant` o `ProtocolFamily`) sin destruir este flujo.
