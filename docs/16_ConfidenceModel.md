# Confidence Model v1.0

**Estado:** Normativo
**Versión:** 1.0

## 1 Introducción
En disciplinas científicas y de ciberseguridad, un dato sin justificación de su procedencia es equivalente a ruido. Muchos sistemas de Inteligencia Artificial resuelven incertidumbres arrojando un "porcentaje de confianza" opaco, lo cual convierte al sistema en una "caja negra" inauditable. 
El **Confidence Model** de RF_Observatory existe para prohibir expresamente la opacidad. Define a la Confianza no como un dictamen adivinatorio, sino como la sumatoria transparente y rastreable del respaldo técnico disponible para un activo de conocimiento (un Fingerprint, una Comparación o una Clasificación) en un momento exacto del tiempo.

## 2 Definición Formal
"La Confianza (Confidence) es la representación semántica del grado de respaldo técnico, documental y heurístico que sustenta un dato. Es la sumatoria auditable y explicable de todas las evidencias e interacciones registradas que validan la exactitud de un Fingerprint, de una Clasificación o de una Similitud en la línea de tiempo del Observatorio."

## 3 Principios
La confianza obedece a las siguientes leyes inmutables:
* **Nunca representa certeza absoluta:** Todo conocimiento es susceptible de refutación si aparece nueva evidencia.
* **Es dinámica:** Su estado cambia exclusivamente frente a nuevos estímulos (datos nuevos, intervenciones).
* **Puede aumentar:** A medida que la comunidad o los investigadores adjuntan documentación (Evidences).
* **Puede disminuir:** Si el conocimiento base original (ej. el QualityReport de la Captura) es invalidado retrospectivamente o se descubre hardware conflictivo.
* **Debe ser auditable:** El nivel de confianza de un recurso jamás es mágico; siempre es hijo de los eventos trazables asociados a él.
* **Debe ser reproducible:** Dada la misma base empírica de evidencias e historial, cualquier algoritmo debe inferir el mismo nivel de confianza.
* **Debe ser explicable:** El sistema debe ser capaz de responder "¿Por qué este dato es de Alta Confianza?" listando las evidencias y factores causales.

## 4 Factores Conceptuales
La Confianza se engendra y nutre a partir de los siguientes factores (dimensiones probatorias):
* **Calidad de captura (QualityReport):** La SNR y limpieza de la onda original al momento de entrar por la antena.
* **Calidad del Fingerprint:** Qué tan estables o aberrantes fueron las distribuciones matemáticas durante la extracción.
* **Cantidad de evidencias:** El número bruto de adjuntos documentales.
* **Diversidad de evidencias:** Distintos tipos de prueba enriquecen más que muchos del mismo tipo (ej. 1 foto + 1 PDF > 5 fotos).
* **Consistencia histórica:** El Fingerprint no ha sufrido alteraciones forzadas en mucho tiempo.
* **Coincidencias previas:** El Fingerprint ha dado positivo consistente en múltiples comparaciones exitosas.
* **Validación humana:** Un investigador de alto rango interactuó y avaló la clasificación.
* **Validación automática:** Convergencia de múltiples algoritmos llegando al mismo dictamen.
* **Resultados repetidos:** Observaciones concurrentes desde geografías distintas ratifican la existencia de la señal (crowdsourcing pasivo).
* **Origen de la información:** Fiabilidad de la antena sensora o SDR utilizado.

## 5 Estados Conceptuales
Las categorías normativas que representan la acumulación de factores de confianza son:
* **Confirmada (Gold Standard):** Validación humana directa con pruebas concluyentes, irrefutable en el contexto actual. Actúa como Faro u Oráculo en las comparaciones.
* **Muy Alta:** Alto respaldo de factores múltiples automáticos (SNR prístino, múltiples ocurrencias, Fingerprints matemáticamente puros) y evidencias fotográficas/documentales asociadas, sin contradicciones.
* **Alta:** Señal clara, Fingerprint robusto, clasificación automática sin conflictos.
* **Media:** Los datos mínimos están presentes, pero la señal fue efímera, el SDR introdujo algo de ruido o la extracción de *timing* fue limítrofe. Útil, pero no sienta jurisprudencia.
* **Baja:** Captura degradada, sin evidencias adicionales ni repeticiones históricas. Se mantiene almacenada para análisis forenses posteriores, pero el motor debe desconfiar de ella.
* **Muy Baja:** Datos fragmentados o gravemente ruidosos; altamente probable que sea un falso positivo o interferencia (jammer).

## 6 Evolución
La confianza no es un sello estático. Fluye.
Una captura ingresada al sistema durante la madrugada por un dron automatizado puede nacer con Confianza **Media** o **Baja**. 
Meses después, al ser comparada exitosamente cien veces (Resultados Repetidos) y luego de que un analista humano le adjunte el manual del FCC ID interceptado (Diversidad de Evidencias), el sistema elevará su estado hasta **Muy Alta**. 
La evolución es siempre el resultado reactivo de interacciones con el entorno.

## 7 Auditoría
Queda arquitectónicamente prohibido modificar un estado de confianza sin generar un rastro inmutable.
Toda evolución de confianza debe responder en el log (base de datos o motor de eventos):
* **Quién:** El actor que provocó el cambio (Usuario ID, o Motor Automático de Clustering).
* **Cuándo:** Timestamp.
* **Por qué:** Regla algorítmica que se disparó.
* **Qué información nueva apareció:** Ej. `EvidenceAttachedEvent` con el UUID de la nueva fotografía aportada.

## 8 Relación con otras entidades
La confianza permea todo el modelo de Dominio:
* **Capture:** Su calidad original inyecta el "piso" base de confianza para todo lo que nazca de ella.
* **Classification:** Hereda la confianza del motor o analista que dictaminó a qué protocolo pertenecía.
* **Fingerprint:** Hereda la estabilidad matemática pura (su calidad geométrica en los histogramas).
* **Evidence:** Es la moneda de cambio de la confianza. Aporta el "plus" orgánico.
* **KnownProtocol:** Alimenta su estatus general sumando la confianza de todos los Fingerprints que lo componen.
* **QualityReport / Session:** Proveen metadatos de contexto ambiental (interferencias de zona) para castigar o premiar la confianza desde el nacimiento.

## 9 Casos de ejemplo
**Caso: La Caja Fuerte y el SDR.**
Un usuario captura un control remoto a 2 cuadras de su casa. La SNR es terrible. El sistema extrae el Fingerprint y le asigna Confianza **Baja**. El motor de similitud no lo usa para clasificar mandos ajenos.
Días después, el usuario se acerca al receptor, destapa la carcasa del portón y captura la placa del fabricante con su teléfono. Sube la foto mediante el UseCase `AttachEvidence`. El motor de confianza reacciona a la presencia de evidencia visual directa. Su Confianza sube a **Media**. Luego, otro investigador, en otro país, sube una captura idéntica (Resultados Repetidos). El sistema recalcula: eleva la familia a **Alta**, dejando de ser una señal huérfana dudosa para convertirse en un patrón verificado colectivamente. 

## 10 Futuro
El modelo de respaldo evidencial garantiza que cuando en el futuro se desplieguen modelos de IA, Machine Learning o Motores Heurísticos de caja gris, sus dictámenes alimentarán el factor "Validación automática". Sin embargo, si la IA dictamina que dos señales son idénticas (`EXACT`), pero la IA no puede respaldarlo con Evidencias ni Consistencia Histórica, la plataforma forzará a la inferencia a nacer con una confianza penalizada, previniendo que alucinaciones matemáticas del algoritmo de ML corrompan la base de conocimientos verídica de RF_Observatory.
