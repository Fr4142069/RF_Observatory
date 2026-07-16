# Reporte de Tarea: TASK-008 (Sprint 3)

**Sprint:** 3 – Persistencia  
**Nombre de la Tarea:** Composition Root (Dependency Injection)  
**Estado:** Completada  

## 1. Objetivo
Diseñar e implementar el "Composition Root" del proyecto, estableciendo un único punto autorizado en toda la arquitectura para crear objetos concretos de la infraestructura (PrismaClient y sus Repositorios derivados) y orquestarlos. 

## 2. Dependencias registradas
Se registró y ensambló el ecosistema íntegro de persistencia para las entidades del dominio:
- `SessionPrismaRepository`
- `CapturePrismaRepository`
- `FingerprintPrismaRepository`
- `KnownProtocolPrismaRepository`
- `UnknownProtocolPrismaRepository`
- `ClassificationPrismaRepository`
- `EvidencePrismaRepository`
- `DecoderResultPrismaRepository`
- `QualityReportPrismaRepository`

## 3. Ciclo de vida de PrismaClient
`PrismaClient` fue instanciado exclusivamente **una sola vez** en la raíz del archivo `compositionRoot.ts` (Singleton por inicialización de módulo). Esto evita fugas de memoria (memory leaks), exprime al máximo la capacidad de Connection Pooling de PostgreSQL y obedece las recomendaciones oficiales de rendimiento de Prisma en Node.js.

## 4. Repositories registrados
Cada uno de los 9 adaptadores Prisma fue instanciado a través de Constructor Injection, pasándoles por parámetro la instancia global única de `PrismaClient` antes creada. Todas estas instancias se empaquetaron y exportaron mediante el objeto inmutable `dependencies`.

## 5. Justificación del patrón
El Composition Root es la antítesis limpia del infame *Service Locator*. 
Al usar un ensamblador central:
1. Ninguna clase de negocio necesita saber dónde encontrar sus recursos; se los daremos armados.
2. Todo el acoplamiento a herramientas ajenas (`@prisma/client`) queda confinado en un solo archivo.
3. Permite hacer testing e intercambiar dependencias con una facilidad asombrosa (solo habría que cambiar el objeto exportado o utilizar Mocks).

## 6. Riesgos identificados
- **Escalabilidad del Objeto Exportado:** En este punto el objeto `dependencies` exporta repositorios de datos puros. Al llegar al Sprint 4 (Application Layer) la longitud de este archivo crecerá sustancialmente al incluir Controladores y Casos de Uso. Si el archivo se vuelve inmanejable, en el futuro podrá dividirse lógicamente en varios "Ensambladores" (Ej. `databaseRoot.ts`, `servicesRoot.ts`), pero manteniendo la filosofía de que todo parte de un único hub.

## 7. Confirmación de Cero Lógica de Negocio
- Se confirma taxativamente: **NO se ha importado ni inicializado Express**.
- No existen lógicas condicionales, controladores, ni casos de uso.
- El archivo `compositionRoot.ts` consta única y exclusivamente de la declaración y exportación de instancias. 
- La arquitectura está estructuralmente lista para comenzar el desarrollo superior (Sprint 4).
