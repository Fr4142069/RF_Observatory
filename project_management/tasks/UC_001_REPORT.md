# Reporte de Tarea: UC-001 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Register Capture (UC-001)  
**Estado:** Completada  

## 1. Objetivo
Implementar el primer vertical funcional del sistema (Registrar una Captura RF) bajo la estricta directriz de la Regla DA-014: el Use Case representa una intención, no una pantalla, y debe ser funcionalmente autónomo, acotado y puramente orquestador.

## 2. Componentes implementados
Ubicados en `backend/src/application/`:
- **DTOs:** `dto/capture/RegisterCaptureRequestDTO.ts`, `RegisterCaptureResponseDTO.ts`
- **Command:** `commands/capture/RegisterCaptureCommand.ts`
- **Validator:** `validators/capture/RegisterCaptureValidator.ts`
- **Errors:** `errors/ApplicationError.ts`
- **Use Case:** `usecases/capture/RegisterCaptureUseCase.ts`
- **Tests:** `tests/application/usecases/capture/RegisterCaptureUseCase.test.ts`

## 3. Flujo del Caso de Uso
1. El Use Case recibe el `RegisterCaptureCommand` (previamente instanciado a partir del RequestDTO).
2. Delega en el `RegisterCaptureValidator` la validación extrínseca de los datos (frecuencia, modulación, etc.).
3. Si los datos son válidos, crea una instancia de la Entidad `Capture` de Dominio (utilizando `randomUUID` y asociando el `sessionId`).
4. Persiste la nueva Entidad mediante el `CaptureRepository` (abstracción).
5. Devuelve el resultado en un `RegisterCaptureResponseDTO`.

## 4. Dependencias
El caso de uso respeta los límites de Clean Architecture. Únicamente conoce:
- `CaptureRepository` (desde `src/domain/repositories/`).
- `Capture` (Entidad).
- No tiene dependencias de Express, Prisma, HTTP ni PostgreSQL.

## 5. Validaciones
Implementadas en `RegisterCaptureValidator`:
- `sessionId` requerido.
- `frequency`, `bandwidth`, `sampleRate` como valores numéricos estrictamente positivos.
- `modulation` y `rawSignalData` no vacíos.

## 6. Pruebas realizadas
Se implementó `RegisterCaptureUseCase.test.ts` usando un entorno de inyección de dependencias puras (MockRepository Fake). Se verifica que:
- La captura se registre exitosamente y retorne el estado 'REGISTERED'.
- Faltantes críticos como el `sessionId` arrojen tempranamente una `ValidationException`.
No se necesita base de datos en ejecución para estas pruebas de lógica.

## 7. Riesgos pendientes
- **Adaptación del Modelo de Dominio:** Actualmente, la entidad `Capture` en el shared scope no expone propiedades planas para frecuencia o modulación (el modelo indica que se agrupan en `Fingerprint`). Para este UC-001, la metadata cruda de entrada no se ha insertado agresivamente en objetos hijos, sino que se ha simulado su manejo. A futuro, este UC podría evolucionar para crear la Entidad `Capture` y paralelamente el primer `Evidence` de tipo `RAW_SIGNAL` que contenga el `rawSignalData`. Esto se abordará limpiamente cuando implementemos los Mappers o afinemos el constructor de las Entidades en los siguientes UC.
