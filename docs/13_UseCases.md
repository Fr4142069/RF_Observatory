# 13. Use Cases

La capa de aplicación de RF_Observatory está diseñada funcionalmente, organizada en base a **Casos de Uso** en lugar de entidades. Cada caso de uso representa de manera aislada e inmutable una intención concreta del usuario.

## Catálogo de Casos de Uso

### UC-001: Register Capture
**Objetivo:** Registrar en el sistema la recepción inicial de una señal RF, asociándola a una sesión.
**Flujo:**
1. Recibe `RegisterCaptureRequestDTO` desde la frontera externa.
2. Transforma en `RegisterCaptureCommand`.
3. Valida el Command (ej. frecuencia positiva, sessionId provisto).
4. El UseCase genera una nueva Entidad `Capture` de Dominio.
5. Invoca a `CaptureRepository.save()`.
6. Devuelve un `RegisterCaptureResponseDTO`.

**Entradas (`RegisterCaptureRequestDTO`):**
- `sessionId` (String)
- `frequency` (Float)
- `modulation` (String)
- `bandwidth` (Float)
- `sampleRate` (Float)
- `rawSignalData` (URI/String)

**Salidas (`RegisterCaptureResponseDTO`):**
- `id` (String UUID)
- `frequency` (Float)
- `modulation` (String)
- `status` (String = 'REGISTERED')
- `registeredAt` (Date)

**Dependencias Exclusivas:**
- `CaptureRepository` (Interfaz)
- `Capture` (Entidad)

*Nota: Este caso de uso NO desencadena clasificación, no decodifica payloads ni altera fingerprints. Solo preserva la señal cruda.*

### UC-002: Classify Capture
**Objetivo:** Iniciar y coordinar el proceso de clasificación de una captura RF existente.
**Flujo:**
1. Recibe `ClassifyCaptureRequestDTO`.
2. Transforma en `ClassifyCaptureCommand`.
3. Valida el Command (ej. `captureId` existente y válido).
4. El UseCase recupera la captura a través de `CaptureRepository`.
5. El UseCase delega al Dominio la lógica dura de inferencia/clasificación.
6. El Dominio devuelve la nueva Entidad `Classification`.
7. Invoca a `ClassificationRepository.save()`.
8. Devuelve un `ClassificationResponseDTO`.

**Entradas (`ClassifyCaptureRequestDTO`):**
- `captureId` (String)

**Salidas (`ClassificationResponseDTO`):**
- `classificationId` (String UUID)
- `captureId` (String UUID)
- `status` ('PENDING' | 'CONFIRMED' | 'REJECTED')
- `protocolId` (String)
- `protocolType` ('KNOWN' | 'UNKNOWN')
- `scorePercentage` (Number)
- `classifiedAt` (Date)

**Dependencias Exclusivas:**
- `CaptureRepository` (Interfaz)
- `ClassificationRepository` (Interfaz)
- `Capture` (Entidad)
- `Classification` (Entidad)

*Nota (Regla DA-015): Este caso de uso NO contiene la inteligencia de clasificación. Su única responsabilidad es coordinar el flujo de datos entre la infraestructura, la entrada y el modelo de dominio que posee los algoritmos.*

### UC-003: Generate Fingerprint
**Objetivo:** Extraer la firma electromagnética y matemática (Fingerprint) de una captura clasificada. Es el núcleo de conocimiento reutilizable del Observatorio (DA-016).
**Flujo:**
1. Recibe `GenerateFingerprintRequestDTO`.
2. Transforma en `GenerateFingerprintCommand`.
3. Valida el Command (ej. `classificationId` existente y válido).
4. El UseCase recupera la clasificación y la captura padre.
5. El UseCase delega al Dominio la extracción del Fingerprint.
6. El Dominio devuelve la nueva Entidad `Fingerprint`.
7. Invoca a `FingerprintRepository.save()`.
8. Devuelve un `FingerprintResponseDTO`.

**Entradas (`GenerateFingerprintRequestDTO`):**
- `classificationId` (String)

**Salidas (`FingerprintResponseDTO`):**
- `fingerprintId` (String UUID)
- `captureId` (String UUID)
- `frequencyValueHertz` (Number)
- `modulationType` (String)
- `generatedAt` (Date)

**Dependencias Exclusivas:**
- `ClassificationRepository` (Interfaz)
- `CaptureRepository` (Interfaz)
- `FingerprintRepository` (Interfaz)
- `Fingerprint` (Entidad)

### UC-004: Attach Evidence
**Objetivo:** Asociar evidencia técnica (documental o mediática) a una captura, clasificación o fingerprint para incrementar el nivel de confianza de la información existente en el Observatorio. Cumple con la regla DA-017: La evidencia no altera el conocimiento, solo lo documenta.
**Flujo:**
1. Recibe `AttachEvidenceRequestDTO`.
2. Transforma en `AttachEvidenceCommand`.
3. Valida el Command (ej. `targetId`, tipo de evidencia y título presentes).
4. El UseCase resuelve el `captureId` original utilizando el repositorio correspondiente (`Capture`, `Classification` o `Fingerprint`) según el `targetType`.
5. El UseCase genera la nueva Entidad `Evidence` vinculada unívocamente a la captura base.
6. Invoca a `EvidenceRepository.save()`.
7. Devuelve un `EvidenceResponseDTO`.

**Entradas (`AttachEvidenceRequestDTO`):**
- `targetId` (String)
- `targetType` ('CAPTURE' | 'CLASSIFICATION' | 'FINGERPRINT')
- `evidenceType` (String)
- `title` (String)
- `author` (String)
- `referenceUri` (String, Opcional)
- `textContent` (String, Opcional)

**Salidas (`EvidenceResponseDTO`):**
- `evidenceId` (String UUID)
- `captureId` (String UUID)
- `evidenceType` (String)
- `status` ('PENDING' | 'VERIFIED' | 'REJECTED')
- `attachedAt` (Date)

**Dependencias Exclusivas:**
- `CaptureRepository` (Interfaz)
- `ClassificationRepository` (Interfaz)
- `FingerprintRepository` (Interfaz)
- `EvidenceRepository` (Interfaz virtual, por definir en dominio)
- `Evidence` (Entidad)

### UC-005: Compare Fingerprints
**Objetivo:** Orquestar el flujo de comparación entre Fingerprints utilizando el motor algorítmico del Dominio, de acuerdo con las reglas de Similitud y Confianza documentadas (TASK-D02 a D04).
**Flujo:**
1. Recibe `CompareFingerprintsRequestDTO`.
2. Transforma en `CompareFingerprintsCommand`.
3. Valida el Command (ej. `sourceFingerprintId` presente).
4. El UseCase verifica que el Fingerprint origen exista consultando al `FingerprintRepository`.
5. Si se provee un destino (`targetFingerprintId`), verifica su existencia (Comparación 1:1). Si no, es una comparación global (1:N).
6. El UseCase delega todo el cálculo al `FingerprintComparisonDomainService` (interfaz del Dominio).
7. El Dominio devuelve un array de resultados semánticos.
8. Devuelve un `CompareFingerprintsResponseDTO`.

**Entradas (`CompareFingerprintsRequestDTO`):**
- `sourceFingerprintId` (String)
- `targetFingerprintId` (String, Opcional)

**Salidas (`CompareFingerprintsResponseDTO`):**
- `sourceFingerprintId` (String)
- `evaluatedAt` (Date)
- `matches` (Array de objetos con `targetFingerprintId`, `similarityLevel`, `scorePercentage`, `confidenceTier`)

**Dependencias Exclusivas:**
- `FingerprintRepository` (Interfaz)
- `FingerprintComparisonDomainService` (Interfaz de Servicio de Dominio)

### UC-006: Register Known Protocol
**Objetivo:** Registrar un nuevo protocolo conocido en el catálogo oficial de RF_Observatory, marcando la transición del conocimiento observado (Fingerprints) a conocimiento validado y categorizado (DA-024).
**Flujo:**
1. Recibe `RegisterKnownProtocolRequestDTO`.
2. Transforma en `RegisterKnownProtocolCommand` validando campos obligatorios y formato.
3. El UseCase verifica que no existan duplicados (por nombre o alias) a través del `KnownProtocolRepository`.
4. Si se envían `initialFingerprintIds`, el UseCase valida su existencia contra el `FingerprintRepository`.
5. Se instancia la entidad `KnownProtocol` en el Dominio.
6. Se persiste el protocolo en la base de datos.
7. Se persisten las asociaciones de los Fingerprints vinculados.
8. Retorna el `KnownProtocolResponseDTO`.

**Entradas (`RegisterKnownProtocolRequestDTO`):**
- `name` (String, Obligatorio)
- `status` ('DRAFT' | 'ACTIVE' | 'DEPRECATED', Obligatorio)
- `alias`, `manufacturer`, `version`, `documentationUrl`, etc. (Opcionales)
- `frequencyHertz` (Number, Opcional)
- `modulationType`, `encodingType` (String, Opcionales)
- `initialFingerprintIds` (Array de Strings, Opcional)

**Salidas (`KnownProtocolResponseDTO`):**
- `id` (String UUID)
- `name`, `alias`, `manufacturer`, `status`
- `frequencyHertz`, `modulationType`
- `registeredAt` (Date)
- `associatedFingerprintsCount` (Number)

**Dependencias Exclusivas:**
- `KnownProtocolRepository` (Interfaz)
- `FingerprintRepository` (Interfaz)
- `KnownProtocol` (Entidad)

### UC-007: Publish Known Protocol
**Objetivo:** Certificar de manera oficial un KnownProtocol. No implica publicación externa o en la web; representa que el conocimiento ha madurado lo suficiente en RF_Observatory como para superar los filtros de validación interna (DA-025).
**Flujo:**
1. Recibe `PublishKnownProtocolRequestDTO`.
2. Transforma en `PublishKnownProtocolCommand` validando el ID y el aprobador.
3. Recupera el `KnownProtocol`.
4. Rechaza si ya está publicado, archivado o deprecado.
5. Ejecuta las validaciones de requisitos mínimos (por ejemplo, contar que al menos tenga 1 Fingerprint asociado).
6. El Dominio ejecuta la mutación `protocol.markAsPublished()`.
7. Se persiste el cambio y se genera un registro de auditoría con la fecha y el `approvedBy`.
8. Retorna `PublishKnownProtocolResponseDTO`.

**Entradas (`PublishKnownProtocolRequestDTO`):**
- `protocolId` (String UUID, Obligatorio)
- `approvedBy` (String ID del usuario/investigador, Obligatorio)

**Salidas (`PublishKnownProtocolResponseDTO`):**
- `protocolId` (String UUID)
- `name` (String)
- `status` (String, ahora "PUBLISHED")
- `publishedAt` (Date)
- `approvedBy` (String)

**Dependencias Exclusivas:**
- `KnownProtocolRepository` (Interfaz)

### UC-008: Search Observatory
**Objetivo:** Actuar como el portal oficial unificado de consulta al conocimiento del Observatorio (DA-026). No consulta tablas directas, sino que interroga conceptualmente la base de conocimiento.
**Flujo:**
1. Recibe `SearchCriteriaDTO` (un contrato flexible y extensible sin ataduras a SQL).
2. Transforma en `SearchObservatoryCommand` validando la semántica de la consulta (ej: rangos de fecha/frecuencia lógicos, evitar peticiones vacías).
3. El Use Case interroga simultáneamente a los "SearchPorts" (Protocolos, Fingerprints, Evidencias).
4. Combina las respuestas en una matriz heterogénea de `SearchResultDTO`.
5. Elimina duplicados si ocurren overlaps.
6. Ordena los resultados.
7. Aplica límites de paginación.
8. Retorna `SearchSummaryDTO` con métricas (tiempo de ejecución, total).

**Entradas (`SearchCriteriaDTO`):**
- Textos libres, UUIDs, alias, fabricantes.
- `exactFrequencyHertz`, `frequencyRangeHertz`
- `modulationType`, `encodingType`
- Filtros por estado, fechas, etiquetas, etc.
- Offset, Limit, SortBy, SortDirection.

**Salidas (`SearchSummaryDTO`):**
- `executedAt` (Date)
- `executionTimeMs` (Number)
- `totalResults` (Number)
- `results`: Array de `SearchResultDTO` (Objetos que indican su `type` como 'KNOWN_PROTOCOL', 'FINGERPRINT', etc., e incluyen `title`, `summary` y `attributes`).

**Dependencias Exclusivas:**
- Interfaces de búsqueda agnósticas (Ej: `ProtocolSearchPort`, `FingerprintSearchPort`) permitiendo la posterior inyección de infraestructuras complejas (Elastic, VectorDB).
