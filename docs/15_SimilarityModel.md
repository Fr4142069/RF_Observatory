# Similarity Model v1.0

**Estado:** Normativo
**Versión:** 1.0

## 1 Introducción
En RF_Observatory, la capacidad de afirmar que dos señales se parecen es el corazón de la deducción técnica. Este documento normativo establece las reglas semánticas y operativas sobre cómo el ecosistema entiende la "Similitud". Evita que los motores de inferencia tomen decisiones arbitrarias o reduzcan la complejidad de las señales RF a un simple porcentaje matemático.

## 2 Definición Formal
"Que dos Fingerprints sean similares significa que comparten un solapamiento multidimensional en sus características electromagnéticas y temporales, lo suficientemente alto como para inferir, con un grado de confianza justificable, que comparten origen tecnológico, familia de hardware o compatibilidad de receptor."

## 3 Principios de la Similitud
La similitud obedece a las siguientes leyes inmutables:
* **No implica igualdad absoluta:** El ruido, la deriva térmica del cuarzo y la baja batería hacen que dos emisiones del *mismo* mando sean ligeramente distintas.
* **No implica compatibilidad:** Dos controles pueden ser similares físicamente, pero usar *rolling codes* distintos que impiden que operen el mismo receptor.
* **No implica pertenencia al mismo protocolo:** Protocolos distintos pueden compartir la misma modulación, frecuencia y codificación básica (ej. PWM).
* **Es una medida técnica multidimensional:** Nunca (Regla DA-020) se decretará similitud basándose exclusivamente en una única característica aislada.

## 4 Niveles de Similitud
Toda comparación dentro de RF_Observatory debe resolverse en una de las siguientes categorías oficiales:
* **Idéntico (EXACT):** Virtualmente indistinguibles a nivel físico y temporal. Alta probabilidad de ser el mismo modelo de transmisor o pertenecer a la misma familia estricta de chipsets sin variaciones (ej. dos mandos Nice Flor-S idénticos).
* **Muy Similar (FAMILY):** Comparten modulación, codificación y estructura, pero presentan derivas temporales proporcionales (timing stretch) o minúsculos desvíos de frecuencia. Pertenecen a la misma familia tecnológica o son variantes regionales (ej. 433MHz vs 315MHz del mismo protocolo).
* **Similar (COMPATIBLE):** Estructura base coincidente, pero con variaciones que sugieren que son clones o mandos universales adaptados para emular un protocolo original.
* **Relacionado (RELATED):** Comparten modulación y algunas firmas temporales, pero la evidencia física sugiere propósitos o fabricantes distintos que usaron el mismo hardware genérico (ej. módulos RF baratos).
* **Posiblemente Relacionado (POSSIBLE):** Coinciden en dimensiones de alto nivel (ej. portadora), pero el ruido o la falta de resolución impiden un dictamen firme.
* **Sin Relación (UNKNOWN / NONE):** Incompatibilidad física rotunda (ej. FSK vs ASK).

## 5 Dimensiones de Comparación
El modelo de similitud evaluará las siguientes dimensiones:
1. **Frecuencia Portadora (Hz):** Evaluada siempre con un margen de tolerancia (kHz) para absorber la deriva de los cristales osciladores (cristales SAW).
2. **Modulación:** Categoría dura (ASK, OOK, FSK, GFSK).
3. **Timing (Duración de Pulsos y Pausas):** Comparación de histogramas de duraciones (T-Short, T-Long).
4. **Relación ON/OFF (Duty Cycle):** El porcentaje de tiempo que la portadora está encendida vs apagada en la trama.
5. **Cantidad de Pulsos y Longitud de Trama:** Cuántos símbolos lógicos componen un paquete completo.
6. **Repeticiones:** Cuántas veces se retransmite la trama al presionar el botón (comportamiento de hardware).
7. **Codificación Lógica:** Si fue posible inferirla (Manchester, PWM, NRZ).
8. **Metadatos y Calidad:** El contexto en que se obtuvo la huella.

## 6 Peso Conceptual
No todas las dimensiones ostentan la misma autoridad en la comparación. 
La *Modulación* actúa como un muro: si difiere, la similitud se desploma a cero instantáneamente.
La *Frecuencia* es semi-rígida: variaciones menores son aceptadas, variaciones extremas descartan la relación (salvo inferencias de armónicos).
El *Timing* es elástico: es la dimensión que realmente define si el dispositivo es un clon, de la misma familia, o el original.

## 7 Comparaciones Permitidas
El sistema está habilitado normativamente para realizar las siguientes comparaciones:
* **Fingerprint ↔ Fingerprint:** La base del motor de inferencia. Comparación de conocimiento consolidado.
* **Capture ↔ Capture:** Análisis raw, comparando espectros de onda directa (I/Q) antes de extraer la huella.
* **Protocol ↔ Fingerprint:** Determinar a qué protocolo conocido pertenece un Fingerprint anónimo.

## 8 Comparaciones Prohibidas
* **Evidence ↔ Evidence:** No se comparan dos fotografías o dos PDFs para inferir si los mandos son similares a nivel RF; la evidencia respalda a la captura, no la reemplaza.
* **Session ↔ Session:** Las sesiones son agrupadores temporales o geográficos de trabajo, carecen de atributos electromagnéticos comparables.

## 9 Evolución Futura
El diseño multidimensional dictado aquí soporta la inyección de arquitecturas complejas en el futuro:
* **Machine Learning & Redes Neuronales:** Podrán procesar el `Fingerprint` no buscando un porcentaje llano, sino mapeando los resultados a nuestra ontología de 6 niveles (`Idéntico`, `Familia`, etc.).
* **Clustering Estadístico:** Agrupar millones de huellas para aislar familias de chipsets desconocidos.
* **Motores Híbridos:** Algoritmos que combinen análisis DTW (Dynamic Time Warping) para el *Timing* con un árbol de decisión estricto para la *Modulación*.

## 10 Casos Conceptuales
**Caso 1: El clon de baja calidad.**
Se ingresa un Fingerprint `A` (Original) y uno `B` (Mando chino de reemplazo). `A` transmite exactamente a 433.92 MHz. `B` transmite a 433.85 MHz. Ambos usan OOK y la relación de pulsos largos/cortos es idéntica. El sistema NO los etiqueta como "Idénticos" porque el hardware es distinto, pero los etiqueta como "Familia" o "Compatible" gracias a que evalúa la dimensión *Timing* y perdona la *Frecuencia* dentro de un umbral.

**Caso 2: El Falso Positivo.**
Se tienen dos señales a 868 MHz con modulación 2-FSK. Un algoritmo básico diría "90% similar". Pero al evaluar la dimensión de *Repeticiones* y *Longitud de Trama*, se nota que uno envía ráfagas cortas (TPMS de auto) y el otro una transmisión continua (Auriculares inalámbricos). El sistema multidimensional detecta el choque y los etiqueta como "Sin Relación".
