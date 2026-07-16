# Reporte de Tarea: TASK-006 (Sprint 3)

**Sprint:** 3 – Persistencia  
**Nombre de la Tarea:** Repository Interfaces  
**Estado:** Completada  

## 1. Objetivo
Diseñar las interfaces Repository (Clean Architecture) que servirán como el único medio de persistencia que el Dominio conocerá. Esta tarea asienta de forma programática el aislamiento tecnológico, garantizando que ninguna regla de negocio quede acoplada a Prisma, Docker, SQL o PostgreSQL.

## 2. Interfaces creadas
Ubicadas en `backend/src/domain/repositories/`:
1. `SessionRepository.ts`
2. `CaptureRepository.ts`
3. `FingerprintRepository.ts`
4. `KnownProtocolRepository.ts`
5. `UnknownProtocolRepository.ts`
6. `ClassificationRepository.ts`
7. `EvidenceRepository.ts`
8. `DecoderResultRepository.ts`
9. `QualityReportRepository.ts`

## 3. Responsabilidad de cada interfaz
- **Session & Capture**: Gestionan el Agregado Raíz, preservando el encapsulamiento de los orígenes de datos de RF.
- **Fingerprint**: Contrato especializado en el guardado de huellas sin exponer la complejidad de arreglos crudos.
- **Catálogo de Protocolos**: Permite a los servicios interrogar protocolos (`Known` y `Unknown`) de forma agnóstica.
- **Classification**: Abstrae la resolución física del polimorfismo, entregando al Dominio una entidad de clasificación inmaculada.
- **Evidence**: Maneja la trazabilidad de las afirmaciones sin involucrarse con el FileSystem o S3 (aún).
- **QualityReport & DecoderResult**: Encapsulan la metadata heurística resultante de los analizadores.

## 4. Métodos definidos
Los contratos se mantuvieron al mínimo indispensable (SRP). 
Ejemplos implementados según entidad:
- `save(entity)`: Creación o actualización (Upsert conceptual).
- `findById(id)`: Recuperación puntual.
- `findByCaptureId(id)`, `findBySessionId(id)`: Consultas limitadas por los bounds del Agregado.
- `findAll()`, `findByName(name)`: Funciones de catálogo.
- `delete(id)`: Operaciones de purga controlada.
No se declararon métodos genéricos inútiles. 

## 5. Dependencias verificadas
- **Cero dependencias externas.**
- Los archivos `.ts` generados importan única y exclusivamente a sus respectivas Entidades compañeras (las cuales se ubicarán en `../entities/`).
- TypeScript estricto fue respetado (`Promise<void>`, `Promise<Entity | null>`). No se emplearon `any`, ni DTOs ajenos al dominio.

## 6. Confirmación de independencia tecnológica
Se ha cumplido estrictamente con la **Decisión de Arquitectura DA-006 (La Persistencia es reemplazable)**. Las interfaces no hacen mención, ni directa ni indirecta, a motores relacionales. El Dominio ha quedado efectivamente encapsulado y blindado ante futuros reemplazos del motor de persistencia.
