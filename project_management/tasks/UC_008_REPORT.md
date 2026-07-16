# Reporte de Tarea: UC-008 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Search Observatory (UC-008)  
**Estado:** Completada  

## 1. Objetivo
Implementar el **Portal Oficial de Consulta** del Observatorio (DA-026). Este caso de uso desvincula a los usuarios (humanos o máquinas) de la estructura SQL subyacente. Permite realizar preguntas funcionales (ej. "¿Qué sabemos de NICE en 433 MHz?") y devuelve una matriz combinada de respuestas conceptuales, no de filas de bases de datos.

## 2. Componentes Implementados
Ubicados en `backend/src/application/`:
- **DTOs (`search/`):** 
  - `SearchCriteriaDTO.ts`: Un contrato riquísimo y puramente funcional, capaz de absorber rangos de frecuencias, texto libre, filtros de estado y de confianza sin exponer una sola mención a claves foráneas.
  - `SearchResultDTO.ts`: Representa un "hallazgo". Tiene un `type` ('KNOWN_PROTOCOL', 'FINGERPRINT', 'EVIDENCE', etc.) y empaqueta metadatos (`attributes`).
  - `SearchSummaryDTO.ts`: Envuelve los resultados paginados e informa el tiempo de ejecución.
- **Command:** `commands/search/SearchObservatoryCommand.ts`.
- **Validator:** `validators/search/SearchObservatoryValidator.ts`. Valida reglas lógicas universales (ej. el rango Mínimo debe ser menor que el Máximo, no admitir consultas totalmente vacías).
- **Use Case:** `usecases/search/SearchObservatoryUseCase.ts`.
- **Tests:** `tests/application/usecases/search/SearchObservatoryUseCase.test.ts`.

## 3. Lógica Arquitectónica (Puertos de Búsqueda)
Para cumplir con la prohibición de crear búsquedas acopladas a Repositorios CRUD básicos o Elasticsearch directos, se diseñó la estrategia de **Search Ports**:
- `ProtocolSearchPort`
- `FingerprintSearchPort`
- `EvidenceSearchPort`

El Use Case lanza consultas **concurrentes** (`Promise.all`) a todos estos puertos, recibe resultados, los combina en un solo array, elimina posibles duplicados (merge lógico), los ordena y los pagina de forma agnóstica. Si en el Sprint 10 queremos que `FingerprintSearchPort` use Búsqueda Vectorial (IA), la capa de aplicación ni se enterará, seguirá orquestando perfectamente.

## 4. Pruebas Realizadas
Los mocks simularon que la palabra 'NICE' devolvía resultados mixtos (un KnownProtocol y un Fingerprint suelto). El Use Case demostró poder fusionarlos, reportar "2 resultados" y entregarlos juntos. Adicionalmente, el validador protegió exitosamente contra errores de usuario (rangos invertidos, búsquedas vacías).

## 5. El Sprint 4 en Perspectiva
UC-008 corona el esfuerzo de esta etapa. Ya podemos registrar, clasificar, inferir huellas, adjuntar pruebas documentales, comparar con el Pipeline, certificar Protocolos y, finalmente, consultarlo todo a través de un portal unificado. La Application Layer está arquitectónicamente completa y blindada. Queda lista para la Auditoría Integral (TASK-009).
