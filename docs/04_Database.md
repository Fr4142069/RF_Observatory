# Modelo de Datos (Data Model)

## 1. Introducción
Este documento define la especificación lógica y oficial del modelo de datos de **RF_Observatory**. Su propósito es servir como el plano arquitectónico fundamental de la persistencia de la información. Este documento es la traducción directa del Modelo de Dominio hacia requerimientos de almacenamiento permanente y tiene una importancia vital, ya que establece qué datos retendrá el sistema, cómo se interconectan y bajo qué reglas de negocio se estructuran, independientemente del motor tecnológico o la implementación final.

## 2. Principios del modelo de datos
El diseño y almacenamiento de la información estarán regidos estrictamente por los siguientes principios:
- **Normalización:** La información debe almacenarse de manera estructurada para evitar redundancias, protegiendo la coherencia lógica de las entidades del ecosistema.
- **Integridad:** Las relaciones entre las distintas piezas de información deben estar estrictamente garantizadas por reglas del modelo.
- **Persistencia permanente:** La información crítica capturada nunca se borra, garantizando la función del proyecto como un observatorio histórico y base de conocimiento mundial.
- **Escalabilidad:** El diseño lógico debe estar preparado para crecer indefinidamente sin colapsar por dependencias circulares o cuellos de botella semánticos.
- **Independencia tecnológica:** El modelo es agnóstico; no asume arquitecturas físicas, lenguajes de consultas, ni estructuras de motores de almacenamiento.
- **Trazabilidad:** Cualquier dato de interés o de evidencia debe tener un rastro que identifique cuándo y en qué contexto ingresó al sistema.
- **Auditoría:** Todas las modificaciones de estado o clasificaciones de los protocolos deben dejar un historial para entender la evolución del conocimiento.

## 3. Entidades persistentes
Las siguientes son las entidades principales de información que requieren almacenamiento permanente en el sistema:

### Capture
- **Propósito:** Registrar el suceso inmutable de una transmisión RF recibida.
- **Información que almacena:** Identificadores únicos, marcas temporales (timestamps), contexto del entorno y referencias a sus componentes de análisis derivados.
- **Responsabilidad:** Actuar como el núcleo central de información de una señal de radio en crudo.
- **Relaciones:** Pertenece a una Session. Está vinculada con un Fingerprint, una o varias Evidences, un QualityReport, un DecoderResult y una Classification.

### Session
- **Propósito:** Agrupar contextos experimentales o períodos de recolección de señales.
- **Información que almacena:** Ventana temporal de inicio y fin, metadatos del autor, hardware involucrado y descripciones ambientales.
- **Responsabilidad:** Garantizar el contexto unificado para un conjunto de capturas que comparten un mismo momento o experimento.
- **Relaciones:** Posee una relación jerárquica padre hacia múltiples Captures.

### Fingerprint
- **Propósito:** Almacenar la abstracción matemática de la señal.
- **Información que almacena:** Características temporales, modulación, anchos de pulso, períodos de sincronización y métricas estructurales.
- **Responsabilidad:** Conservar de manera eficiente la estructura física de la señal para facilitar búsquedas y cálculos de similitud.
- **Relaciones:** Asociado de forma estricta y exclusiva a una Capture.

### KnownProtocol
- **Propósito:** Mantener la biblioteca global de estándares RF identificados.
- **Información que almacena:** Nombre del protocolo, descripciones teóricas, rangos teóricos de pulsos y reglas de demodulación documentadas.
- **Responsabilidad:** Servir como el origen de verdad inmutable sobre cómo debe lucir un protocolo específico en el mundo real.
- **Relaciones:** Actúa como referencia para múltiples Classifications.

### UnknownProtocol
- **Propósito:** Agrupar huellas (fingerprints) huérfanas en perfiles de investigación.
- **Información que almacena:** Promedios temporales, metadatos hipotéticos y notas de la comunidad.
- **Responsabilidad:** Consolidar señales repetitivas no identificadas hasta que se descubra su naturaleza.
- **Relaciones:** Actúa como referencia para múltiples Classifications.

### Classification
- **Propósito:** Almacenar el historial y estado actual de identificación de una captura.
- **Información que almacena:** Nivel de confianza o puntuación de coincidencia, fechas de veredicto, y mecanismo de identificación (humano o automático).
- **Responsabilidad:** Mantener el estado del análisis que relaciona una señal en el aire con un protocolo teórico.
- **Relaciones:** Pertenece a una Capture. Referencia lógicamente a un KnownProtocol o a un UnknownProtocol.

### Evidence
- **Propósito:** Mantener un registro físico del experimento que generó la captura.
- **Información que almacena:** Rutas lógicas, hashes de validación y formatos de archivo sobre los datos crudos (ej. I/Q o SARF).
- **Responsabilidad:** Respaldar la credibilidad de una captura garantizando que los datos originales están disponibles.
- **Relaciones:** Pertenece exclusivamente a una Capture.

### DecoderResult
- **Propósito:** Retener la información desencriptada o demodulada de una señal válida.
- **Información que almacena:** Carga útil binaria o hexadecimal (payloads), valores de checksum, datos de contadores u otros campos legibles.
- **Responsabilidad:** Desvincular el costo de decodificación de la consulta, almacenando el resultado listo para lectura.
- **Relaciones:** Pertenece exclusivamente a una Capture.

### QualityReport
- **Propósito:** Documentar la salud estructural de la señal.
- **Información que almacena:** Relación señal-ruido, detección de ruido, distorsión y calificaciones cualitativas.
- **Responsabilidad:** Filtrar analíticamente el ruido de la plataforma.
- **Relaciones:** Pertenece exclusivamente a una Capture.

## 4. Relaciones
A continuación se detalla gráficamente la estructura jerárquica de interconexión lógica de las entidades:

```text
Session
 │
 ├── Capture
 │      │
 │      ├── Fingerprint
 │      │
 │      ├── Classification
 │      │
 │      ├── DecoderResult
 │      │
 │      ├── QualityReport
 │      │
 │      └── Evidence
 │
 │
 KnownProtocol / UnknownProtocol
 │
 └── (Referenciado por la Classification de una Capture)
```

## 5. Persistencia
El sistema gestiona la persistencia bajo tres categorías de información:
- **Información Persistente:** Datos que deben vivir indefinidamente sin modificaciones estructurales (Session, Capture, Evidence, Fingerprint, KnownProtocol).
- **Información Temporal:** Metadatos de tránsito, caché de validaciones asíncronas y colas de procesamiento (ej. el progreso del cálculo de similitudes) que desaparecen o son volátiles tras la consolidación de la operación.
- **Información Derivada:** Datos que podrían regenerarse algorítmicamente desde cero, pero se almacenan para evitar costos computacionales (DecoderResult, QualityReport, índices de similitud).

## 6. Ciclo de vida de los datos
El modelo garantiza el siguiente recorrido lógico de la información:
1. **Recepción:** Ingresan los datos de Sesión y Evidencia en estado transitorio.
2. **Validación:** Se extraen los datos crudos y se verifica su integridad antes de persistirlos definitivamente.
3. **Almacenamiento:** Se fijan en memoria permanente la Session, la Capture y la Evidence de manera conjunta e indisoluble.
4. **Clasificación:** Motores internos leen el Fingerprint y generan/actualizan entidades de Classification referenciadas a Protocolos.
5. **Consulta:** Clientes externos leen de forma recurrente las entidades estructuradas y normalizadas.
6. **Actualización:** Se enriquecen los KnownProtocol y se reescriben los historiales de Classification en respuesta a nuevos consensos de investigación.
7. **Archivado:** Las capturas y sesiones excesivamente antiguas o marcadas como inválidas se apartan de los índices principales, pero jamás se borran del histórico.

## 7. Integridad
El modelo impone reglas estrictas y universales de integridad:
- No deben existir capturas huérfanas bajo ninguna circunstancia.
- Una sesión debe existir lógicamente antes de poder asociarle capturas.
- Una clasificación debe referenciar forzosamente a la captura que califica.
- Una evidencia siempre pertenece obligatoria y exclusivamente a una captura (y por extensión, a su respectiva sesión).
- Ninguna captura debe contener más de una huella digital (Fingerprint) representativa de su pulso fundamental.

## 8. Auditoría
El sistema requiere el almacenamiento de metadatos profundos para asegurar el escrutinio de los investigadores:
- **Fechas:** Todo recurso debe conservar un sello de creación y de última alteración estructural.
- **Origen:** Debe conservarse el identificador lógico del investigador, laboratorio o cliente API que inyectó el dato.
- **Cambios:** Todo proceso de mutación de conocimiento (ej. reasignar una señal a otro protocolo) debe dejar rastro.
- **Versiones:** Se debe mantener el historial de versiones teóricas de un `KnownProtocol`.
- **Validaciones:** Se debe documentar qué algoritmo o versión del decodificador generó un `DecoderResult`.

## 9. Escalabilidad
El diseño lógico de datos soporta crecimiento masivo en todos sus vectores:
- **Mayor número de capturas:** La estricta normalización e integridad evita la redundancia; almacenar mil millones de capturas solo escala el uso del disco para la entidad de evidencias y características base, sin duplicar diccionarios.
- **Mayor número de protocolos:** Los diccionarios teóricos se mantienen separados de los datos experimentales transaccionales, evitando cuellos de botella cruzados.
- **Mayor número de usuarios:** Los perfiles transaccionales están lógicamente aislados de la ingesta pesada.
- **Mayor volumen histórico:** La segmentación clara entre datos volátiles, derivados y absolutos permite aplicar particionado horizontal sin destruir el mapa conceptual del sistema.

## 10. Políticas de conservación
El sistema respeta una filosofía estricta de *Write-Once, Read-Many* (Escribir una vez, leer muchas veces) para la experimentación empírica:
- **Conservación histórica:** Todos los datos recibidos (que pasen los filtros anti-spam) adquieren carácter inmutable.
- **No sobrescribir capturas:** Una medición no se reescribe. Si la medición es mejorable, se debe realizar una nueva captura.
- **No eliminar evidencias:** Los archivos crudos son evidencia científica irrefutable y su destrucción vulnera los principios de observatorio.
- **Versionado de clasificaciones:** Cambiar la opinión sobre qué protocolo es una captura no debe destruir el historial de qué se creía anteriormente.

## 11. Restricciones
Este documento de modelo de datos impone directrices conceptuales y tiene las siguientes restricciones:
- No define tablas físicas, relaciones de llave foránea, columnas, ni índices específicos.
- No selecciona ni favorece motores de base de datos específicos ni herramientas de mapeo objeto-relacional (ORMs).
- No resuelve detalles de optimización técnica, particionado físico ni despliegues en clúster.

## 12. Glosario
- **Entidad Persistente:** Una abstracción de negocio que tiene un ciclo de vida duradero y requiere almacenamiento a largo plazo.
- **Relación Lógica:** Vínculo semántico entre dos entidades que da contexto a su existencia.
- **Integridad Referencial:** Regla inviolable que garantiza que los vínculos entre piezas de información son consistentes y no apuntan a recursos inexistentes o huérfanos.
- **Información Derivada:** Datos que no son originales del experimento, sino que han sido calculados a partir de los datos base por el sistema (ej. similitudes, payloads).
- **Auditoría de Datos:** Proceso de conservación metódica sobre "quién", "cuándo" y "cómo" se mutó el conocimiento estructurado dentro de la plataforma.
