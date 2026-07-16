# Reporte de Tarea: TASK-007 (Sprint 3)

**Sprint:** 3 – Persistencia  
**Nombre de la Tarea:** Repository Implementations  
**Estado:** Completada  

## 1. Objetivo
Implementar las clases concretas (Adaptadores Físicos) de infraestructura para los contratos (Repository Interfaces) creados en la TASK-006, utilizando a `PrismaClient` como motor de base de datos ORM para la persistencia.

## 2. Clases implementadas
Todas alojadas en `backend/src/infrastructure/persistence/prisma/repositories/`:
1. `SessionPrismaRepository`
2. `CapturePrismaRepository`
3. `FingerprintPrismaRepository`
4. `KnownProtocolPrismaRepository`
5. `UnknownProtocolPrismaRepository`
6. `ClassificationPrismaRepository`
7. `EvidencePrismaRepository`
8. `DecoderResultPrismaRepository`
9. `QualityReportPrismaRepository`

## 3. Interfaces implementadas
- Se ha respetado de forma incondicional el listado de interfaces fundacionales que fueron establecidas en `src/domain/repositories/`. Las clases inyectan el cliente y devuelven promesas tipadas al modelo de negocio.

## 4. Dependencias utilizadas
- **Inyección mediante Constructor:** Todas las clases reciben la instancia transaccional de `PrismaClient` a través del `constructor(prisma: PrismaClient)`. No existen *Singletons* espaguetis ocultos ni creaciones mágicas de Prisma dentro del repositorio, preparándonos el terreno para el Composition Root (TASK-008).
- **Cero Lógica Adicional:** Ninguna de estas clases importa módulos externos (`express`, `http`, librerías criptográficas). Son componentes mudos que mapean peticiones de negocio a queries ORM (e.g. `upsert`, `findUnique`).

## 5. Confirmación de separación Dominio / Infraestructura
- **El Dominio NO conoce la Infraestructura:** Las interfaces y entidades de `src/domain` jamás importan `PrismaClient` ni los archivos recién creados.
- **La Infraestructura SÍ depende del Dominio:** Nuestros nuevos Repositorios de Prisma importan las entidades y los contratos para cumplir con las firmas. 
- **Desajuste de Impedancia Domado:** En `ClassificationPrismaRepository`, se codificó expresamente la regla de traducción física para desdoblar internamente `protocolId` hacia `knownProtocolId` y `unknownProtocolId` como exigen las constraints polimórficas de Prisma.

## 6. Riesgos pendientes
- **Tipado Dinámico (Mapping Crudo):** En este hito, la serialización Dominio <-> Prisma se está asumiendo a través de casteos estructurales, amparándonos en que el `schema.prisma` es un espejo exacto del Dominio (Mapeo 1:1). Cuando se implementen las clases concretas de TS del Dominio (`new Session(...)`), estos repositorios deberán refinar su capa de deserialización mediante mappers para evitar discrepancias con los *Getters* y *Setters* si la entidad se vuelve muy rica.
- **Manejo de Errores de Prisma:** De momento los repositorios actúan como proxies pasivos (`await prisma...`). Los errores (`P2002` Constraint Violation) percolarán crudos hacia arriba. Su envoltorio en Custom Exceptions (Ej: `EntityNotFoundException`) deberá formalizarse cuando construyamos los Casos de Uso.
