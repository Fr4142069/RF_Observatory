# SPRINT 05 CLOSEOUT

**Proyecto:** RF_Observatory  
**Fase:** Infrastructure & Delivery Layer  
**Estado del Sprint:** CERRADO  
**Fecha de Cierre:** 16 de Julio de 2026

## 1. Capacidades Incorporadas
RF_Observatory cuenta ahora con un **puerto de entrada oficial hacia el exterior**. Específicamente, se ha integrado y expuesto a través de una API REST (Express.js):
- **Ingesta:** `POST /api/v1/captures` y `POST /api/v1/evidence`
- **Inferencia:** `POST /api/v1/fingerprints/compare`
- **Gobernanza de Conocimiento:** `POST /api/v1/protocols` y `POST /api/v1/protocols/:id/publish`
- **Descubrimiento:** `POST /api/v1/search`

## 2. Decisiones Arquitectónicas Consolidadas (DA)
Durante este Sprint se enriqueció el Casebook con decisiones definitivas sobre la comunicación de la plataforma:
- **DA-033 y DA-035:** Toda respuesta (error o éxito) sigue un contrato estandarizado (`ResponseFactory`, `ErrorFactory`).
- **DA-037:** Centralización absoluta de las dependencias en un único *Composition Root*.
- **DA-051 y DA-052:** La API REST expone flujos de negocio (operaciones semánticas), desterrando el CRUD genérico y abstrayendo la naturaleza de la base de datos subyacente.
- **DA-053:** Todo Vertical debe probarse End-to-End desde HTTP hasta el Repositorio para considerarse certificado.

## 3. Evidencia de Disponibilidad (API Lista)
1. **Pruebas de Integración E2E:** 9 escenarios superados (flujos del dominio, payload erróneo, endpoints inexistentes) vía HTTP (ver `32_EndToEndTests.md`).
2. **OpenAPI V3:** Documentación agnóstica (`backend/openapi.yaml`) y lista para ser consumida en interfaces UI.

## 4. Estado Arquitectónico
El sistema ha dejado de ser un plano y un esqueleto aislado de pruebas unitarias. Actualmente es una **arquitectura sólidamente consolidada** (como define la Dirección) que separa drásticamente el HTTP del dominio, lista para evolucionar y conectar clientes reales (Web, Hardware) y bases de datos físicas (Prisma, PostgreSQL).

## 5. Riesgos Abiertos y Deuda Técnica
1. **Mock Repositories:** Todos los repositorios operan en memoria o devuelven valores simulados. En el mundo real (concurrencia, asincronía SQL) surgirán retos técnicos (Ej: timeouts de persistencia de bases de datos).
2. **Autenticación/Autorización:** La API actual es completamente pública. Procesos como `Publish Protocol` asumen un "approvedBy" inyectado en el payload sin validar la identidad ni los roles de administrador/experto.
3. **Manejo de Archivos Masivos:** Para el Fingerprint raw, el backend recibe por ahora arrays o Base64, lo cual exigirá validación de carga, límites de transferencia y buffers si las muestras son gigantescas.

## 6. Objetivos del Sprint 6
Cambio de paradigma: "De afuera hacia adentro".
- **Integración Real:** Consumidores web o hardware comunicándose activamente con la API REST.
- **Implementación Física:** Reemplazar el `RepositoryFactory` in-memory por **Prisma** + **PostgreSQL** para persistencia absoluta de los Casos de Uso.
- **Identidad (Opcional pero crítico):** Asegurar los endpoints de Gobernanza (`Publish Protocol`).
- **Monitorización:** Incorporar observabilidad real al sistema en movimiento.
