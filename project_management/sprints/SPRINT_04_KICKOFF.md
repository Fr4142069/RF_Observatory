# SPRINT 4 KICKOFF
## RF_Observatory

**Fase:** Sprint 4  
**Nombre:** Application Layer & Use Cases  
**Tipo:** Planificación Oficial  
**Estado:** Activo  

---

## 1. OBJETIVO Y MISIÓN
Construir la capa de Aplicación de RF_Observatory.
Esta capa actuará como coordinadora orquestal: recibirá peticiones (mediante DTOs/Commands) desde el exterior (en el futuro, desde la API REST), validará los datos y orquestará a las Entidades del Dominio junto con los Repositorios de Persistencia para cumplir las reglas del negocio.

**Misión:** Responder estrictamente a la pregunta "¿Qué hace RF_Observatory?". Se implementarán **Casos de Uso**, que representarán el comportamiento funcional del sistema.

---

## 2. DECISIÓN FUNDAMENTAL: DA-010
**"Los Casos de Uso serán la unidad funcional del sistema."**
RF_Observatory abandona por completo el patrón de "CRUD genéricos orientados a bases de datos" (ej. *CaptureService.create*, *CaptureService.update*). 
Se modelará la capa de aplicación con acciones expresivas y orientadas al negocio, tales como:
- Registrar una captura RF.
- Clasificar automáticamente una trama.
- Asociar evidencias a una captura.
- Publicar un protocolo conocido.

---

## 3. ALCANCE
Durante este Sprint **SE DISEÑARÁN**:
- **DTOs** (Data Transfer Objects) para ingreso y salida de datos.
- **Commands & Queries** (CQS) para expresar la intención del usuario.
- **Casos de Uso (Use Cases)**.
- **Validaciones** estrictas de datos de entrada.
- **Manejo de errores de aplicación** (Custom Exceptions).
- **Mappers** (traductores estructurales entre capas).

**FUERA DEL ALCANCE** (Prohibido en este Sprint):
- Controladores Express, Endpoints REST.
- Autenticación (JWT/OAuth), WebSockets, Frontend.

---

## 4. PRINCIPIOS DE AISLAMIENTO
La Application Layer estará en el medio del flujo: `API -> Application -> Domain -> Infrastructure`.
- **NO conoce:** Prisma, PostgreSQL, Docker, Express, HTTP.
- **SÍ conoce:** Las Entidades del Dominio y las Interfaces Repository (`src/domain/repositories`).

---

## 5. HOJA DE RUTA REVISADA (ROADMAP VERTICAL)
El desarrollo del Sprint 4 evolucionó hacia un modelo de **verticales funcionales**. Una vez establecidos los cimientos, se construirán los Casos de Uso (UC) de inicio a fin:

| Tarea | Descripción |
|---|---|
| **TASK-001** | Estructura de Application Layer |
| **TASK-002** | DTO Design |
| **UC-001**   | Register Capture |
| **UC-002**   | Classify Capture |
| **UC-003**   | Generate Fingerprint |
| **UC-004**   | Attach Evidence |
| **UC-005**   | Compare Fingerprints |
| **UC-006**   | Register Known Protocol |
| **UC-007**   | Publish Known Protocol |
| **UC-008**   | Search Observatory |
| **TASK-009** | Auditoría Arquitectónica |
| **TASK-010** | SPRINT_04_CLOSEOUT |

---

## 6. CRITERIOS DE ÉXITO
Al finalizar el Sprint, RF_Observatory será funcionalmente capaz de ejecutar los procesos de negocio complejos, validando los datos y gestionando el modelo, probando que el sistema "funciona" a nivel programático aunque aún carezca de una interfaz pública para el mundo exterior.
