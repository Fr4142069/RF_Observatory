# SPRINT 5: Infrastructure & Delivery Layer

**Proyecto:** RF_Observatory  
**Tipo:** Kickoff Oficial  
**Fecha:** 16 de Julio de 2026

---

## 1. Objetivo General del Sprint
Inaugurar oficialmente la fase de exposición del sistema. El objetivo de este Sprint es conectar el núcleo del Observatorio (el Knowledge Engine) con el mundo exterior mediante una infraestructura REST completamente desacoplada. Se persigue habilitar el acceso a los Casos de Uso manteniendo intactos los principios de Clean Architecture y la pureza del Dominio lograda en las iteraciones pasadas.

## 2. Estado Heredado desde Sprint 4
Recibimos una línea base impecable (Tag: `v0.4.0`). El sistema cuenta actualmente con:
- Un Dominio Puro y agnóstico de frameworks.
- Una Capa de Aplicación madura con 8 Casos de Uso orquestados (Registro, Clasificación, Fingerprinting, Pipeline de Comparación, y Consultas al Observatorio).
- Una Teoría del Conocimiento documentada e incrustada en el comportamiento del código (Similitud Semántica, Confianza Auditable, Catálogos Oficiales).
- Inversión de Dependencias estricta: los Casos de Uso esperan interfaces puras (SearchPorts, Repositories).
**Conclusión:** Tenemos el motor construido y calibrado; ahora fabricaremos el chasis y el volante para conducirlo.

## 3. Objetivos Específicos
- **Arquitectura HTTP:** Definir el flujo `Express -> Routes -> Controllers -> Application`.
- **API REST:** Exponer endpoints seguros que traduzcan HTTP a DTOs de Aplicación.
- **Dependency Injection:** Conectar físicamente las interfaces requeridas por la Application Layer con implementaciones concretas en tiempo de ejecución, sin inundar el proyecto con frameworks IoC mágicos.
- **Swagger/OpenAPI:** Documentar oficialmente el contrato de la API.
- **Bootstrap de Infraestructura:** Establecer el punto de entrada de la aplicación (`server.ts` o equivalente).

## 4. Roadmap del Sprint
- **TASK-001:** Sprint 5 Kickoff *(Este documento)*
- **TASK-002:** Backend HTTP Architecture
- **TASK-003:** API Error Model
- **TASK-004:** REST Response Standard
- **TASK-005:** Dependency Injection Bootstrap
- **TASK-006:** REST API
- **TASK-007:** Swagger / OpenAPI
- **TASK-008:** Auditoría Sprint 5
- **TASK-009:** Sprint 5 Closeout

## 5. Dependencias con Sprint 4
La principal dependencia funcional y arquitectónica estriba en la estricta adherencia a la **DA-030**: *"La API REST nunca contendrá lógica de negocio"*. La Delivery Layer que construiremos será una frontera tonta y estandarizada; dependerá exclusivamente de los `Commands` y `DTOs` construidos en el Sprint 4 para interactuar con la verdad del Observatorio.

## 6. Riesgos Conocidos
- **Acoplamiento Accidental:** La tentación de pasar el objeto `Request` de Express directamente a un Caso de Uso para ahorrar tiempo de mapeo.
- **Fuga de Excepciones:** No atrapar correctamente las `ApplicationError` en los controladores, provocando que el servidor devuelva *stack traces* o el clásico Error 500 en lugar de un Error 400 semántico.
- **Sobre-ingeniería en Inyección de Dependencias:** Usar frameworks complejos como Awilix o Inversify cuando un Composition Root manual es suficiente y más seguro para esta etapa.

## 7. Criterios para Declarar Terminado el Sprint
- El servidor Express arranca correctamente.
- Todos los Casos de Uso del Sprint 4 están mapeados a endpoints REST.
- Las respuestas HTTP siguen un estándar unificado (Success, Metadata, Errors).
- Los errores de Dominio/Aplicación son interceptados y traducidos a códigos HTTP (`400`, `404`, `409`, `422`).
- Existe documentación Swagger accesible.
- La Auditoría Integral (TASK-008) confirma cero fugas de lógica de negocio en los Controllers.
- Se ha generado el Acta de Cierre (TASK-009).
