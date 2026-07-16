# Modelo Relacional
**Proyecto:** RF_Observatory
**Sprint:** 3 (Persistencia)
**Documento:** 09_RelationalModel.md

## 1. Objetivo
El propósito de este documento es especificar formalmente la traducción del Modelo del Dominio (auditado y congelado en el Sprint 2) hacia un Modelo Relacional lógico. Actúa como el puente arquitectónico y contrato conceptual entre las reglas puras del negocio y la futura implementación física, garantizando una traducción fiel sin acoplar la documentación a un ORM específico.

## 2. Principios
El diseño relacional se rige por los siguientes principios inquebrantables:
- **El Dominio es la fuente de verdad:** El esquema de base de datos obedece y refleja al dominio, jamás al revés.
- **Derivación estricta:** El modelo relacional es una traducción 1:1 de las entidades y relaciones del dominio.
- **PostgreSQL como mecanismo:** La base de datos es únicamente un detalle de implementación para la persistencia física del estado.
- **Prisma como intérprete:** Prisma será la herramienta materializadora, pero no el diseñador de la arquitectura.

## 3. Entidades del Dominio
Las entidades fundacionales que estructuran el mapeo hacia tablas relacionales son:
- Session
- Capture
- Fingerprint
- KnownProtocol
- UnknownProtocol
- Classification
- Evidence
- DecoderResult
- QualityReport

## 4. Traducción Relacional
A continuación se define la traducción conceptual hacia las futuras tablas:

### Tabla: Sessions
- **Propósito:** Almacenar eventos temporales que agrupan conjuntos de capturas.
- **Clave Primaria:** `id` (Identificador único universal).
- **Dependencias:** Ninguna (Raíz de agregado).
- **Restricciones conceptuales:** Garantiza la envoltura temporal general de todas las lecturas contenidas.

### Tabla: Captures
- **Propósito:** Almacenar transmisiones individuales inmutables de radiofrecuencia.
- **Clave Primaria:** `id`.
- **Dependencias:** Obligatoriamente dependiente de una Session.
- **Restricciones conceptuales:** Vínculo temporal y transaccional absoluto con la sesión dueña.

### Tabla: Fingerprints
- **Propósito:** Representación matemática y estructural de la señal.
- **Clave Primaria:** `id`.
- **Dependencias:** Obligatoriamente dependiente de una Capture.
- **Restricciones conceptuales:** Relación exclusiva y estricta 1:1.

### Tabla: KnownProtocols
- **Propósito:** Catálogo documental inerte de estándares RF.
- **Clave Primaria:** `id`.
- **Dependencias:** Ninguna (Raíz de agregado del catálogo).
- **Restricciones conceptuales:** Solo lectura y enriquecimiento metadatal; desvinculado del ciclo de ingesta experimental.

### Tabla: UnknownProtocols
- **Propósito:** Catálogo de señales huérfanas bajo rastreo (candidatos).
- **Clave Primaria:** `id`.
- **Dependencias:** Ninguna (Raíz de agregado del catálogo).

### Tabla: Classifications
- **Propósito:** Registro del veredicto inerte que asocia una Captura con un Protocolo.
- **Clave Primaria:** `id`.
- **Dependencias:** Dependiente transaccionalmente de Capture y referencialmente hacia el Catálogo de Protocolos.
- **Restricciones conceptuales:** El puntaje (score) respeta conceptualmente los límites de evaluación 0-100%.

### Tabla: Evidences
- **Propósito:** Respaldo probatorio técnico y físico inmutable.
- **Clave Primaria:** `id`.
- **Dependencias:** Dependiente de Capture.
- **Restricciones conceptuales:** Almacena referencias lógicas de ubicaciones (URI) o apuntes analíticos, nunca archivos binarios gigantes en disco.

### Tabla: DecoderResults
- **Propósito:** Registro numérico y aséptico del payload extraído por motores externos.
- **Clave Primaria:** `id`.
- **Dependencias:** Dependiente de Capture (Relación 1:1).

### Tabla: QualityReports
- **Propósito:** Evaluación técnica y de métricas radiográficas de la integridad de la señal.
- **Clave Primaria:** `id`.
- **Dependencias:** Dependiente de Capture (Relación 1:1).

## 5. Relaciones
- **Session (1) a Capture (N):** Obligatoria. Una Capture no existe si no pertenece a una Session.
- **Capture (1) a Fingerprint (1):** Obligatoria. La Capture da a luz al Fingerprint.
- **Capture (1) a Evidence (N):** 1 a N. Una Capture puede ostentar múltiples soportes técnicos.
- **Capture (1) a DecoderResult (1):** Opcional. Nace exclusivamente de una decodificación exitosa.
- **Capture (1) a QualityReport (1):** Opcional. Surge tras la evaluación.
- **Capture (1) a Classification (1):** Opcional. La captura agrupa su veredicto.
- **Classification (N) a KnownProtocol/UnknownProtocol (1):** Semánticamente N a 1, pero direccional. El protocolo desconoce esta relación; sirve meramente de Foreign Key para la clasificación.
- **Classification (N) a Evidence (M):** M:N referencial. Una clasificación puede respaldar su resultado apuntando a múltiples evidencias específicas de su propia captura.

## 6. Integridad
- **Integridad de Entidades:** Toda tabla poseerá un identificador primario atómico.
- **Integridad Referencial:** La eliminación de una Raíz de Agregado (ej. `Session`) desencadenará forzosamente la eliminación lógica o física en cascada de sus `Captures` (y analíticas dependientes) para prevenir tablas corrompidas o datos huérfanos. Los diccionarios (Protocolos) son independientes y nunca se eliminan en cascada.
- **Restricciones del Dominio:** Restricciones clave como `captureId` obligatorio se materializarán en obligatoriedad nula (Not Null) en la tabla relacional.

## 7. Índices (Conceptuales)
Para garantizar latencias ínfimas en las operaciones fundamentales sin redactar SQL:
- **Líneas temporales:** Índices obligatorios sobre las fechas de creación o recepción en Sessions y Captures, motores principales de las búsquedas temporales.
- **Vínculos de Agregados:** Índices de búsqueda sobre las Foreign Keys (`sessionId`, `captureId`) para optimizar el ensamblaje rápido en memoria del objeto completo al solicitar una Captura.
- **Búsqueda de Catálogo:** Índices sobre los nombres (alias, manufacturer) de Protocolos para autocompletado y búsquedas literales.

## 8. Escalabilidad
El diseño relacional avala el crecimiento sin bloqueos:
- **Millones de capturas:** La normalización forzada mediante analíticas desagregadas en relaciones 1:1 reduce el ancho general de la tabla principal `Captures`, acelerando las lecturas selectivas.
- **Archivos pesados:** Aislar el peso binario externo dejando la tabla `Evidences` meramente como punteros de URI garantiza que PostgreSQL se dedique íntegramente a procesar texto plano ligero y numérico.

## 9. Riesgos
- **Riesgo Estructural:** Almacenar arreglos (arrays) llanos (como los `pulseDurationsMicroseconds` en `Fingerprint`) requerirá utilizar columnas de tipo nativo Array en PostgreSQL para asegurar limpieza relacional. 
- **Riesgo Referencial N:M:** La tabla intermedia que podría surgir entre `Classification` y `Evidence` representa un riesgo transaccional ante miles de operaciones por segundo de motores automáticos de IA.

## 10. Implementación
El modelo relacional aquí descrito ha sido materializado exitosamente en la infraestructura mediante Prisma Migrate. La migración oficial (`init_schema`) constituye la versión fundacional de las tablas físicas en PostgreSQL. Según la norma DI-003, este diseño no puede ser alterado manualmente en la base de datos; cualquier evolución debe originarse en el Dominio, documentarse aquí y ejecutarse exclusivamente mediante nuevas migraciones versionadas.

## 11. Conclusión
El Modelo Relacional expuesto representa fielmente al Modelo del Dominio, transcribiendo las necesidades puras de negocio y restricciones transaccionales a un paradigma tabular relacional, asegurando la independencia del código e impartiendo las directrices justas previas a la implementación física de Prisma.
