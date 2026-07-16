# Knowledge Engine Specification v1.0
*(Documento Integrador y Maestro de la Arquitectura de Inferencia RF)*

## 1. El Propósito del Motor
En RF_Observatory, el **Motor de Conocimiento (Knowledge Engine)** no es un bloque de código monolítico. Es el ecosistema conceptual regido por cuatro pilares normativos. Este documento resume y entrelaza dichas especificaciones, sirviendo como mapa maestro para cualquier ingeniero que deba implementar o auditar la inteligencia del Dominio.

## 2. Los Cuatro Pilares del Conocimiento

### A. La Materia Prima: El Fingerprint (`14_FingerprintSpecification.md`)
* **Qué es:** La identidad electromagnética pura.
* **El Dogma:** Inmutable ante el paso del tiempo; desvinculado del hardware capturador y desprovisto de lógica de decodificación de payloads. Representa "lo que la antena vio".

### B. El Lenguaje de Relación: El Similarity Model (`15_SimilarityModel.md`)
* **Qué es:** La escala semántica de la distancia entre dos materias primas.
* **El Dogma:** La similitud es multidimensional (DA-020). Nadie es "idéntico" solo por compartir frecuencia. Las respuestas del sistema no son porcentajes crudos, sino seis categorías formales (EXACT, FAMILY, COMPATIBLE, RELATED, POSSIBLE, UNKNOWN).

### C. El Filtro de la Verdad: El Confidence Model (`16_ConfidenceModel.md`)
* **Qué es:** El blindaje contra alucinaciones sistémicas y caja negra.
* **El Dogma:** La confianza es evidencia acumulada (DA-021). Ningún algoritmo inventa la confianza; la deduce auditablemente a partir del contexto fotográfico, documental e histórico del Fingerprint.

### D. La Tubería de Ejecución: El Comparison Pipeline (`17_ComparisonPipeline.md`)
* **Qué es:** El flujo de trabajo inmutable que transforma Entradas en Resultados.
* **El Dogma:** El pipeline es estable, los algoritmos son efímeros (DA-022). Consta de 8 Fases deterministas, donde el algoritmo matemático solo interviene aislado en la Fase 4, fuertemente flanqueado por las reglas semánticas de las Fases 5 y 6.

## 3. El Flujo Integrado (Cómo piensa el RF_Observatory)
Cuando el *Application Layer* invoca al *Domain Layer* a través del UseCase **UC-005**, ocurre esta danza arquitectónica:

1. El sistema toma dos **Fingerprints** (Pilar A).
2. Los inyecta en la Fase 1 y 2 del **Pipeline** (Pilar D) para validar que no violen leyes de la física.
3. Llegan a la Fase 4, donde un algoritmo (el motor de turno) arroja un número matemático opaco (Ej: `0.92`).
4. Ese número choca con el **Similarity Model** (Pilar B) en la Fase 5, transformando el `0.92` en un semántico `"FAMILY"`.
5. Ese `"FAMILY"` avanza a la Fase 6, chocando contra el **Confidence Model** (Pilar C). El modelo audita que el Fingerprint tiene 3 fotos, un manual PDF y fue confirmado por el Admin. Le asigna `"TIER 1 (Gold Standard)"`.
6. La salida oficial del motor es: *"Son de la misma familia, y te doy mi palabra irrefutable de que no estoy alucinando"*.

## 4. Conclusión
Cualquier desarrollador puede borrar la carpeta `src/domain/services/comparison/` y reescribir por completo la Inteligencia Artificial del sistema usando Python, Rust o tensores. Mientras su código respete los 8 pasos del **Pipeline**, emita resultados del **Similarity Model** y justifique sus pesos con el **Confidence Model** al evaluar un **Fingerprint**, el ecosistema de RF_Observatory seguirá funcionando impecablemente.
