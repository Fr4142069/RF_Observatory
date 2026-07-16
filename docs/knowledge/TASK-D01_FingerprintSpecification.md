# TASK-D01: Fingerprint Specification

## 1. ¿Qué es un Fingerprint?
En RF_Observatory, el **Fingerprint** es la identidad matemática, electromagnética y temporal de una familia de transmisiones. No es la captura cruda (archivo I/Q o audio), sino la abstracción estructurada de sus características fundamentales. 

El Fingerprint es el activo de conocimiento principal del sistema: permite buscar, agrupar, comparar e inferir relaciones entre dispositivos, protocolos y atacantes.

## 2. Atributos Mínimos (Core Attributes)
Son las características indispensables para que un Fingerprint exista y sea útil. Si faltan, no se puede generar:
* **Frecuencia Portadora (`frequencyValueHertz`)**: Valor nominal de transmisión (ej. 433920000 Hz).
* **Esquema de Modulación (`modulationType`)**: La técnica de codificación física (ej. ASK, OOK, FSK, GFSK).
* **Distribución de Tiempos (`pulseDurationsMicroseconds`, `pauseDurationsMicroseconds`)**: Histogramas o listas de duraciones típicas (ej. Pulso corto = 400µs, Pulso largo = 800µs).

## 3. Atributos Derivados (Derived Attributes)
Son calculados a partir de los atributos mínimos o enriquecidos mediante inferencias posteriores:
* **Estructura del Preámbulo (`preambleStructure`)**: Patrón de sincronización (ej. pulso muy largo seguido de pausas).
* **Codificación Lógica (`logicalEncoding`)**: Inferencia del protocolo de bits (ej. PWM, Manchester, NRZ).
* **Banda de Frecuencia (`frequencyBandString`)**: Clasificación administrativa de la portadora (ej. ISM 433MHz).

## 4. Evolución y Permanencia
* **Permanentes**: Las características físicas de la emisión original (Frecuencia base, Tiempos extraídos) que componen la huella inicial. Almacenan la "realidad observada".
* **Evolutivos**: Atributos como la *Codificación Lógica* pueden reclasificarse a medida que los algoritmos de inferencia del Observatorio mejoren, pero siempre a través de un nuevo caso de uso explícito.

## 5. Estrategia de Versionado
El Fingerprint no se sobrescribe cuando cambian los algoritmos de extracción.
* Si el modelo matemático de cómo se extrae una huella cambia en el futuro, se generará un nuevo `Fingerprint` derivado de la `Capture` original, marcando al viejo con un estado deprecado, para no destruir el historial de comparaciones de la base de conocimiento.
