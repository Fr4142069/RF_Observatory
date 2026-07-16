# Reporte de Tarea: TASK-D01 (Sprint 4.5)

**Sprint:** 4 (Fase de Consolidación)  
**Nombre de la Tarea:** Fingerprint Specification v1.0 (TASK-D01)  
**Estado:** Completada  

## 1. Objetivo
Elevar la concepción del "Fingerprint" de una simple idea algorítmica a un **modelo de conocimiento estricto y normativo**. El objetivo primordial es que esta especificación dicte, para todo futuro desarrollo, motor de inferencia o módulo de la plataforma, las leyes absolutas de lo que es y cómo se comporta una huella electromagnética en RF_Observatory.

## 2. Resumen
Se ha redactado el documento normativo `docs/14_FingerprintSpecification.md`. Dicho documento cubre exhaustivamente trece áreas conceptuales solicitadas, dictaminando qué es el Fingerprint (definición formal), cuál es su ciclo de vida en el ecosistema, qué características obligatorias e inmutables posee, y estableciendo sus fronteras relacionales y operativas. En ninguna línea se han dictado reglas de código o sintaxis SQL, sino reglas arquitectónicas de conocimiento.

## 3. Decisiones tomadas
- **Versionado Evolutivo Inmutable:** Se definió que un Fingerprint matemático jamás debe actualizarse in-place. Toda mejora en la extracción matemática obliga al nacimiento de un nuevo Fingerprint, preservando el histórico de comparaciones del sistema.
- **División de Atributos:** Se estableció una barrera semántica entre el Núcleo Duro (Frecuencia, Modulación, Tiempos), los Opcionales (Preámbulo) y los Derivados (Codificación lógica), protegiendo la física pura frente a las inferencias de software.
- **Desvinculación del Payload:** Se prohíbe normativamente que el Fingerprint asuma responsabilidades de decodificación o contenga llaves/payloads criptográficos.

## 4. Impacto sobre la Arquitectura
**Crítico.** Esta especificación ata las manos de la Application Layer y de los Algoritmos de Dominio. 
El Dominio deberá implementar servicios (como `FingerprintExtractorService`) que, al recibir una captura, emitan exactamente la estructura dictada aquí.
Los casos de uso futuros no podrán ofrecer funcionalidades de "Edición Manual de Fingerprint", garantizando la integridad científica de los datos.

## 5. Compatibilidad Futura
El documento abre oficialmente las puertas para que RF_Observatory reciba en el futuro modelos de Machine Learning (como Clustering de familias RF no descubiertas) y algoritmos avanzados (Dynamic Time Warping), ya que el formato abstracto del Fingerprint (Hz, Modulación, Array de µs) es un estándar matemático universal, desligado de la entropía del formato crudo de los SDR.
