# Reporte de Tarea: API Error Model (TASK-003)

**Sprint:** 5 – Infrastructure & Delivery Layer  
**Nombre de la Tarea:** API Error Model (TASK-003)  
**Estado:** Completada  

## 1. Objetivo
Asegurar que la capa HTTP del RF_Observatory exponga un contrato de errores predecible, estandarizado y seguro frente a los clientes externos, evitando la fragmentación y la filtración de detalles internos de la base de datos.

## 2. Entregables
- Se ha generado el documento oficial `docs/21_ApiErrorModel.md`.
- Se han registrado las decisiones **DA-033** y **DA-034** en el `PROJECT_CASEBOOK.md`.

## 3. Resumen de Decisiones
Se ha congelado un formato JSON obligatorio para todos los errores de la API. Este formato incluye identificadores críticos como `requestId` (esencial para trazabilidad de logs), un código semántico constante (`code`, ej. `PROTOCOL_ALREADY_EXISTS`) que será utilizado para decisiones lógicas en los clientes, y descripciones humanas (`title`, `detail`) diseñadas para ser amigables o traducibles. 

Se estableció una prohibición estricta sobre la fuga de Stack Traces y detalles subyacentes de ORMs (como mensajes crudos de restricción única de Prisma), los cuales deberán ser interceptados y traducidos a códigos estables del catálogo.

## 4. Estado y Siguientes Pasos
La tarea no incluyó escritura de código fuente, cumpliendo con la restricción de diseño de arquitectura. Con los errores definidos, el proyecto está listo para acometer la **TASK-004 (REST Response Standard)**, tras lo cual se procederá a implementar los Exception Handlers y Middlewares correspondientes en Express.
