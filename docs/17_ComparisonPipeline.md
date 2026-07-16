# Comparison Pipeline v1.0

**Estado:** Normativo
**Versión:** 1.0

## 1 Introducción
Comparar dos señales de radiofrecuencia no es un acto aislado, es un proceso. Si se permite que cada nuevo desarrollador o cada nuevo modelo de Inteligencia Artificial ingiera datos y arroje respuestas de forma desordenada, el sistema se volverá caótico e inauditable.
Este Pipeline existe para separar el *Flujo del Conocimiento* (Arquitectura) del *Cálculo de Datos* (Algoritmo). Define el túnel exacto e inmutable por el cual debe viajar cualquier solicitud de comparación.

## 2 Principios
El Pipeline de Comparación es la Constitución del proceso inferencial y cumple las siguientes reglas normativas:
* **Determinista en su estructura:** Las etapas siempre ocurren en el mismo orden. Ninguna se salta.
* **Auditable:** Cada etapa deja un rastro claro de lo que recibió y lo que decidió.
* **Reproducible:** El Pipeline siempre reacciona igual ante la misma secuencia de entradas.
* **Extensible:** Permite acoplar nuevos módulos en cada etapa (plugins).
* **Independiente del algoritmo:** Al Pipeline no le importa si el cálculo lo hace un script en Python o un motor de C++.
* **Independiente de la tecnología:** No está acoplado a un ORM o framework específico.

## 3 Entradas
El Pipeline admite ser gatillado normativamente por:
* **Fingerprint existente:** Búsqueda manual de un investigador en la base de datos (Ej. "Compara el UUID X contra el ecosistema").
* **Nueva Capture:** Ingestión en tiempo real desde un sensor IoT que exige clasificación inmediata.
* **Proceso automático:** Un *worker* nocturno realizando un re-cálculo masivo tras la actualización de un motor IA.
* **Known Protocol:** Comparar una firma anónima contra la librería de estándares conocidos.

## 4 Etapas del Pipeline

1. **Recepción:**
   * *Objetivo:* Recibir la solicitud y los recursos implicados.
   * *Entrada:* DTO de intención.
   * *Salida:* Recursos hidratados desde la base de datos.
2. **Validación (Filtro Físico):**
   * *Objetivo:* Descartar lo imposible basándose en leyes físicas. (Ej. ASK vs FSK).
   * *Restricción:* Actúa como un *gatekeeper*. Lo que no pasa aquí, no se procesa matemáticamente.
3. **Preparación (Alineación Temporal):**
   * *Objetivo:* Normalizar los Fingerprints para que sean matemáticamente comparables (resolver el *timing stretch*).
4. **Cálculo (Comparación Pura):**
   * *Objetivo:* Ejecutar el algoritmo/motor de turno (DTW, Euclídea, IA).
   * *Salida:* Score numérico crudo.
5. **Evaluación de Similitud:**
   * *Objetivo:* Mapear el score crudo al *Similarity Model v1.0* (EXACT, FAMILY, etc.).
6. **Evaluación de Confianza:**
   * *Objetivo:* Someter el resultado al *Confidence Model v1.0* para castigar o premiar el dictamen según las evidencias.
7. **Generación de Resultado:**
   * *Objetivo:* Empaquetar la conclusión semántica.
8. **Persistencia y Auditoría:**
   * *Objetivo:* Guardar el historial de la comparación para asegurar trazabilidad.

## 5 Resultados Posibles
A la salida del Pipeline, la respuesta conceptual encajará obligatoriamente en:
* **Coincidencia Exacta:** Mismo hardware, alta confianza.
* **Posible Familia:** Similitud alta (FAMILY), confianza media/alta.
* **Nuevo Fingerprint:** Sin coincidencias (UNKNOWN). Se decreta el nacimiento de una nueva familia huérfana.
* **Coincidencia Parcial / Requiere Revisión Humana:** Similitud limítrofe (RELATED/POSSIBLE) o choque frontal en el Confidence Model (ej. IA dice "idéntico", pero las fotos muestran placas radicalmente distintas).

## 6 Puntos de Decisión
* **Fase de Validación:** Si falla la compatibilidad de Modulación, aborta el pipeline y retorna `UNKNOWN`.
* **Fase de Similitud:** Si el algoritmo devuelve un score bajo, ¿tiene sentido pasar a Evaluación de Confianza? Sí, para castigarlo aún más y dejar registro de la disparidad.
* **Salida del Pipeline:** ¿La confianza global final permite una auto-clasificación? Si `Confianza >= ALTA`, el sistema puede registrar el hallazgo automáticamente. Si es menor, se etiqueta como `PENDING REVIEW`.

## 7 Auditoría
El Pipeline registra como eventos inmutables:
* Inicio y Fin (Timestamp).
* Algoritmo/Motor específico que ejecutó la Fase 4.
* Resultado final expedido.
* Motivo de aborto temprano (si ocurriera en la Fase 2).

## 8 Escalabilidad (El "Plugin System")
Si en el futuro se desarrolla un "Motor Heurístico de Flipper Zero" o un "Motor Estadístico de SDR", estos no modificarán el Pipeline. Se acoplarán como implementaciones intercambiables exclusivamente en la **Fase 4 (Cálculo)**. El Pipeline orquestará los datos hacia el nuevo motor, recibirá su score crudo, y continuará imperturbablemente hacia la Fase 5. 

## 9 Integración
* **Use Cases:** UC-005 (Compare Fingerprints) es el cliente principal que gatilla este Pipeline.
* **Repositories:** Proveen la materia prima en la Fase 1 y archivan el log en la Fase 8.
* **Modelos:** Las Fases 5 y 6 implementan directamente los documentos normativos 15 y 16.

## 10 Casos Conceptuales
**El Motor que Aprende:** Se introduce un nuevo modelo IA experimental. El Pipeline orquesta una comparación. En la Fase 4, la IA emite un score de "99.9%". En la Fase 5, el Pipeline lo etiqueta como `EXACT`. Pero en la Fase 6, el *Confidence Model* detecta que este Fingerprint no tiene ni una sola evidencia humana, su SNR es pésimo y nunca antes fue visto. La salida final del Pipeline advierte: "Similitud EXACTA detectada por Motor IA, pero retenida bajo Confianza MUY BAJA. Requiere Revisión Humana". El Pipeline acaba de contener una alucinación del algoritmo.

## 11 Evolución Futura
* **Motores Paralelos:** En el futuro, la Fase 4 podrá ejecutar 3 motores distintos al mismo tiempo (ej. Heurístico + IA) y enviar los 3 resultados a la Fase 5 para un voto consensuado.
* **Comparación Distribuida:** La Fase 4 podrá externalizarse a clusters de procesamiento mediante RabbitMQ/Kafka, mientras el Pipeline maestro espera asíncronamente el resultado.
