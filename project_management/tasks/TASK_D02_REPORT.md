# Reporte de Tarea: TASK-D02 (Sprint 4.5)

**Sprint:** 4 (Fase de Consolidación)  
**Nombre de la Tarea:** Similarity Model v1.0 (TASK-D02)  
**Estado:** Completada  

## 1. Objetivo
Convertir el concepto abstracto de "parecido" en un modelo de conocimiento estructurado, multidimensional y gobernable. Al igual que el Fingerprint, este documento normativo regirá de manera vinculante cómo cualquier motor actual o futuro del Observatorio juzgará la relación entre dos señales RF, protegiendo al ecosistema de algoritmos reduccionistas que comparen una sola métrica.

## 2. Resumen
Se ha redactado y aprobado el documento `docs/15_SimilarityModel.md`. El texto cumple con las 10 directivas exigidas sin usar código ni fórmulas matemáticas. Establece que la similitud es un concepto semántico dividido en seis categorías (Idéntico, Muy Similar, Similar, Relacionado, Posiblemente Relacionado, Sin Relación). 

## 3. Dimensiones identificadas
Se definieron formalmente las 8 dimensiones obligatorias que todo algoritmo de comparación deberá sopesar:
1. Frecuencia Portadora (Hz).
2. Modulación.
3. Timing (Pulsos/Pausas).
4. Relación ON/OFF (Duty Cycle).
5. Cantidad de pulsos y Longitud de Trama.
6. Comportamiento de repeticiones.
7. Codificación lógica.
8. Metadatos de calidad técnica.

## 4. Niveles definidos
La granularidad de la similitud se definió en:
- EXACT (Idéntico)
- FAMILY (Muy Similar / Misma Familia)
- COMPATIBLE (Clones o Adaptaciones)
- RELATED (Tecnología base compartida)
- POSSIBLE (Baja calidad, coincidencias superficiales)
- UNKNOWN / NONE (Incompatibilidad física)

## 5. Decisiones Tomadas (DA-020)
Se congeló la decisión de **Similitud Multidimensional**. Dos Fingerprints jamás se declararán emparentados por coincidir en una sola métrica (ej. compartir la misma Frecuencia no significa nada sin coincidencia de Tiempos y Modulación).

## 6. Impacto Arquitectónico y Compatibilidad Futura
**Crítico.** El `CompareFingerprintsUseCase` (UC-005) ya implementado y cualquier `DomainService` futuro están ahora legalmente obligados a devolver como resultado uno de los 6 niveles semánticos listados arriba. 
Si el día de mañana se integra un motor de Inteligencia Artificial (Red Neuronal) para realizar clustering y detectar familias, la red neuronal no devolverá "0.89", sino que sus neuronas de salida estarán mapeadas para clasificar en las categorías semánticas normativas (`FAMILY`, `COMPATIBLE`, etc.), manteniendo intacta la compatibilidad con toda la UI y las APIs del Observatorio.
