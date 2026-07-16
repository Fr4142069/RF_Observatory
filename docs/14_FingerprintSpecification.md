# Fingerprint Specification v1.0

**Estado:** Normativo
**Versión:** 1.0

## 1 Introducción
RF_Observatory no es simplemente un repositorio de archivos físicos ni un visualizador de ondas. Si cada señal analizada quedara atada a la forma de onda original capturada por un SDR, el sistema no podría realizar comparaciones eficientes a gran escala ni inferir relaciones.
El Fingerprint existe para resolver el problema de la fragmentación de la información. No es una captura RF; es el mapa genético y la identidad matemática extraída de ella. Permite independizar el conocimiento de los artefactos físicos (ruido, formato de archivo, dispositivo receptor), brindando un estándar puro sobre el cual la plataforma puede razonar, comparar y evolucionar.

## 2 Definición Formal
"Un Fingerprint es la estructura de datos abstracta, inmutable y determinista que modela matemáticamente los atributos físicos y temporales fundamentales de una señal de radiofrecuencia (frecuencia, modulación y tiempos). Representa la huella electromagnética aislada del ruido y del contexto de captura, actuando como la unidad atómica de conocimiento reutilizable dentro de RF_Observatory."

## 3 Objetivos
**¿Para qué sirve?**
Sirve como ancla relacional para buscar señales similares, detectar clonaciones, agrupar familias de protocolos y publicar descubrimientos técnicos.
**¿Qué representa?**
Representa la realidad electromagnética subyacente de la transmisión.
**¿Qué NO representa?**
NO representa el archivo binario I/Q, NO representa un veredicto subjetivo, y NO representa un algoritmo de decodificación o desencriptación de un payload.

## 4 Ciclo de Vida
El Fingerprint nace de un flujo madurativo estricto:
1. `Capture` (Ingesta de la señal cruda).
2. `Classification` (Veredicto inicial o automático de su posible naturaleza).
3. `Fingerprint` (Extracción matemática de la huella).
4. `Evidence` (Adición de contexto, manuales, fotos para aumentar la confianza).
5. `Known Protocol` (Elevación del Fingerprint a protocolo oficial tras comprobación cruzada).
6. `Publication` (El conocimiento se exporta y difunde).

## 5 Características
Todo Fingerprint en RF_Observatory cumple normativamente con las siguientes características:
* **Persistente:** Sobrevive a la eliminación de las evidencias accesorias.
* **Reproducible:** Si un mismo algoritmo procesa la misma captura cruda, debe generar exactamente el mismo Fingerprint.
* **Versionable:** No muta. Si cambian las condiciones, nace una nueva versión.
* **Auditable:** Su origen siempre está trazado hacia la captura madre (Capture).
* **Trazable:** Todas las comparaciones futuras dejan registro hacia él.
* **Independiente del hardware:** No le importa si se capturó con un HackRF, un RTL-SDR o un Flipper Zero.
* **Extensible:** Permite el enriquecimiento de metadatos derivados sin corromper el núcleo físico.

## 6 Componentes
Conceptualmente, un Fingerprint se divide en:
1. **Identificador:** UUID global.
2. **Origen:** Relación inquebrantable a su `Capture` transaccional.
3. **Características RF Fundamentales:** Modulación y Frecuencia central.
4. **Características Temporales:** La firma de pulsos y pausas (simbolos lógicos).
5. **Metadatos Derivados:** Preámbulos, tipo de codificación deducida (ej. Manchester).
6. **Relaciones Documentales:** Los puentes hacia Clasificaciones y Evidencias para establecer la Confianza.

## 7 Atributos
**Obligatorios (Núcleo Duro):**
* Identificador único (ID).
* Referencia a la Captura Padre.
* Frecuencia portadora (Hz).
* Tipo de Modulación.
* Listas de duraciones de pulsos (altos) y pausas (bajos) típicas.

**Opcionales:**
* Estructura de preámbulo detectada (puede no existir en ciertas señales).
* Alias interno temporal.

**Derivados / Calculados (No modifican la esencia):**
* Banda de Frecuencia (calculada desde los Hz, ej. ISM-433).
* Codificación Lógica inferida.

## 8 Versionado
Un Fingerprint **nunca evoluciona mutando sus datos**. 
Si el algoritmo matemático del Dominio (`FingerprintExtractorService`) es actualizado para mejorar la precisión de los microsegundos, NO se edita el Fingerprint existente.
* **Cuándo cambia:** Nunca. 
* **Cuándo se crea uno nuevo:** Cuando una Captura es sometida a un nuevo motor de análisis, o cuando un evento de reclasificación determina que el análisis previo fue erróneo. El nuevo Fingerprint nace con un nuevo ID, y el anterior puede ser marcado como `ARCHIVED` o `DEPRECATED`, manteniendo intacto el registro histórico de comparaciones que lo usaron en el pasado.

## 9 Inmutabilidad
**Lo que nunca se modifica:**
Los atributos RF fundamentales (Frecuencia, Modulación, Tiempos extraídos). Son una foto de un evento físico.
**Lo que sí puede enriquecerse:**
Las Evidencias que orbitan a su alrededor (añadir fotos del mando, PDFs, notas del investigador). Esto incrementa el "Trust Score" (Nivel de Confianza) del Fingerprint, pero el Fingerprint matemático sigue siendo idéntico.

## 10 Relaciones
* **Capture:** Dueña absoluta del Fingerprint (Relación 1:1, aunque conceptualmente una Captura podría originar varias versiones, transaccionalmente se ata a la original).
* **Classification:** Motiva y justifica la generación de la huella.
* **Evidence:** Orbita sobre la Captura madre o el Fingerprint para documentarlo.
* **KnownProtocol:** Un Fingerprint confirmado y de alta calidad puede asociarse permanentemente a un Protocolo Conocido.
* **QualityReport / Session:** Le proveen contexto técnico (SNR) y espacio temporal para los modelos de confianza.

## 11 Restricciones
* Un Fingerprint **NO PUEDE** almacenar fragmentos completos de código fuente ni payloads desencriptados (eso pertenece al DecoderResult).
* Un Fingerprint **NO PUEDE** ser modificado por una operación CRUD de usuario; solo nace a través de un proceso coordinado por el `GenerateFingerprintUseCase`.
* Un Fingerprint **NO PUEDE** existir aislado, huérfano de una `Capture`.

## 12 Ejemplos Conceptuales
Imaginemos que capturamos la señal de un control remoto de garaje genérico.
No guardamos "Botón abrir garaje vecino".
Guardamos:
* **Frecuencia:** 433,920,000 Hz.
* **Modulación:** ASK (OOK).
* **Firma Temporal:** Pulsos cortos de ~350µs, pulsos largos de ~1050µs.
Mañana, capturamos el control de un ventilador de techo de otra marca. Su payload (los datos binarios) es diferente. Pero el Fingerprint extraído dicta que usa 433MHz, OOK, con pulsos de 350µs y 1050µs. 
El sistema podrá relacionarlos instantáneamente como **Familia**, sin necesidad de conocer qué significa cada bit ni haber almacenado miles de muestras de audio I/Q.

## 13 Consideraciones Futuras
El diseño inmutable de esta especificación permite que en un futuro:
* **Machine Learning / IA:** Un modelo neuronal pueda ingerir millones de Fingerprints estructurados sin lidiar con formatos físicos de archivo variados (SDR).
* **Clustering:** Podremos agrupar automáticamente Fingerprints sin protocolo conocido, descubriendo fabricantes no documentados.
* **Similarity Motors:** El UC-005 (Compare Fingerprints) podrá ser reemplazado por versiones más avanzadas (como *Dynamic Time Warping*) simplemente leyendo estos campos, sin romper la estructura de la base de datos ni los flujos de la Application Layer.
