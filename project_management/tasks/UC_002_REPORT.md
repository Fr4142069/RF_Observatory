# Reporte de Tarea: UC-002 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Classify Capture (UC-002)  
**Estado:** Completada  

## 1. Objetivo
Implementar el caso de uso central del proyecto: la coordinación del proceso de clasificación de una señal RF. Cumpliendo la directiva de diseño (DA-015), este caso de uso asume un rol de "director de orquesta", permitiendo que la inteligencia, algoritmos y reglas heurísticas residan y evolucionen independientemente dentro del Dominio.

## 2. Componentes implementados
Ubicados en `backend/src/application/`:
- **DTOs:** `dto/classification/ClassifyCaptureRequestDTO.ts`, `ClassificationResponseDTO.ts`
- **Command:** `commands/classification/ClassifyCaptureCommand.ts`
- **Validator:** `validators/classification/ClassifyCaptureValidator.ts`
- **Use Case:** `usecases/classification/ClassifyCaptureUseCase.ts`
- **Tests:** `tests/application/usecases/classification/ClassifyCaptureUseCase.test.ts`

## 3. Flujo del Caso de Uso
1. El Command se construye con el ID de la captura.
2. El Validator confirma que el ID no esté vacío.
3. El Use Case interroga al `CaptureRepository` para recuperar la Captura. Si no existe, lanza un `ApplicationError` del tipo `CAPTURE_NOT_FOUND`.
4. El Use Case "invoca" al Dominio para clasificar. (Actualmente simulado con la instanciación de un `Classification` con estado `PENDING` o `UNKNOWN`).
5. Persiste el resultado utilizando `ClassificationRepository.save()`.
6. Devuelve la proyección de salida (`ClassificationResponseDTO`).

## 4. Dependencias
- `CaptureRepository` y `ClassificationRepository` (Interfaces)
- `Classification` (Entidad del Dominio)
- Totalmente agnóstico a la implementación técnica (sin dependencias a Prisma o Express).

## 5. Validaciones
- Validación de presencia de `captureId`.
- Verificación de existencia real de la captura en la persistencia.

## 6. Pruebas realizadas
El Use Case fue cubierto con tests unitarios empleando Mocks de repositorios dobles (Capture y Classification). Se comprobó la generación correcta del ResponseDTO y los rechazos asertivos cuando la captura no existe.

## 7. Riesgos pendientes
- **Vacío Lógico Temporal:** Al delegar la lógica al Dominio, y dado que el Dominio aún no posee su Motor de Inferencia/Heurística implementado (Domain Service), el Use Case está simulando la respuesta instanciando una `Classification` dura. La conexión real con el cerebro algorítmico se materializará cuando construyamos esos Servicios de Dominio. No obstante, la Application Layer ya cumplió su objetivo arquitectónico de orquestar el flujo sin acoplarse.
