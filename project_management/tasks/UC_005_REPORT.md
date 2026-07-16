# Reporte de Tarea: UC-005 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Compare Fingerprints (UC-005)  
**Estado:** Completada (Refactorización Estratégica)  

## 1. Objetivo
Implementar la puerta única de entrada oficial al **Knowledge Engine** (DA-023). Orquestar el Comparison Pipeline sin intervenir en los cálculos matemáticos, asegurando que cada comparación se almacene históricamente para su auditoría y revisión.

## 2. Nueva Entidad de Dominio: `ComparisonResult`
Se detectó que una comparación no es un mero "vuelo de pájaro" (un DTO temporal), sino un dictamen valioso. Por ello, se introdujo la entidad inmutable `shared/src/domain/entities/ComparisonResult.ts`.
Esta entidad registra:
- Qué par de Fingerprints se evaluaron.
- El nivel semántico de similitud (EXACT, FAMILY...).
- El nivel de confianza (TIER_1...).
- Qué motor lo ejecutó.
- Si el resultado se auto-resolvió o quedó como "Requiere Revisión Manual".
*Impacto:* Si mañana la IA de clasificación comete un error masivo, se podrá buscar en la base de datos de auditoría `ComparisonResult` todos los dictámenes que arrojó el motor `IA-V1` y someterlos a un rollback humano.

## 3. Arquitectura del Use Case
1. **Entrada:** `CompareFingerprintsRequestDTO`.
2. **Validación:** Comprueba existencia del `sourceFingerprintId` e hidrata los candidatos (Delegando la búsqueda masiva 1:N al repositorio).
3. **Delegación de Dominio:** Cede los candidatos al `FingerprintComparisonDomainService`. El Dominio corre el *Comparison Pipeline* y devuelve objetos de tipo `ComparisonResult`.
4. **Auditoría Transaccional:** El Use Case llama a `ComparisonResultRepository.save()` iterando por todos los resultados obtenidos. El conocimiento ya no es volátil.
5. **Salida:** Retorna el `ComparisonSummaryDTO` hacia la API/UI, confirmando cuántos se analizaron y las similitudes encontradas.

## 4. Tests
Las pruebas unitarias validan que tanto las búsquedas directas (1:1) como las masivas (1:N) terminan siempre llamando exitosamente a `ComparisonResultRepository.save()`.

## 5. Decisiones Tomadas
- Se aplicó la directiva de **NO IMPLEMENTAR ALGORITMOS**. El Use Case desconoce si se usa DTW o Machine Learning. El código confía ciegamente en la interfaz `FingerprintComparisonDomainService` (el puerto de Clean Architecture).
- **DA-023 Registrada:** El motor de comparación es el núcleo estratégico de RF_Observatory, y este Use Case es su orquestador oficial y único.
