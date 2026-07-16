# Diario de Ingeniería (Project Casebook)

**Objetivo:** Este documento constituye el historial técnico permanente del proyecto **RF_Observatory**. No es un changelog comercial ni un registro de commits funcionales diarios, sino un diario de ingeniería metodológica que asienta las decisiones importantes de negocio, soluciones, lecciones aprendidas, bloqueos y alteraciones arquitectónicas aprobadas a lo largo de los Sprints.

---

### [2026-07-15] - Sprint 3 (Kickoff)
**Descripción:** Decisión de Arquitectura DA-004. RF_Observatory utilizará PostgreSQL como motor de base de datos, Prisma ORM (Prisma Migrate y Prisma Client) como capa de persistencia y Docker como infraestructura subyacente. El Dominio permanecerá completamente desacoplado de Prisma mediante el uso de interfaces Repository, materializando el principio de Inversión de Dependencias (Clean Architecture). Además, Prisma materializará el diseño relacional pero NO gobernará el diseño; se aplicará una traducción 1:1 desde el Dominio hacia el esquema.
**Impacto:** Crítico. Congela el stack tecnológico para toda la versión 1.x del proyecto e imposibilita que la base de datos corrompa las reglas del negocio, permitiendo reemplazar o "mockear" la DB a futuro.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-005. "Estrategia de Despliegue Diferido". El despliegue de infraestructura física (PostgreSQL, Migraciones Prisma) no se ejecutará de forma parcial ni local durante el Sprint. Todo el código del Sprint se desarrolla, prueba y audita primero. Al cerrar el Sprint, se realiza una sesión única de "Deployment" directamente en el entorno oficial (VPS `iotsys.cloud`). 
**Impacto:** Crítico. Evita duplicidad de trabajo (crear base local y luego base remota) y consolida a la PC local exclusivamente como entorno de desarrollo abstracto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-006. "La Persistencia es reemplazable". Ninguna porción del Dominio conocerá cómo se almacenan los datos. Todo el acceso a datos se realizará exclusivamente a través de Repository Interfaces que pertenecerán a la capa de Dominio. Si en el futuro se reemplaza PostgreSQL/Prisma por otro motor (ej. MongoDB, Supabase), el Dominio no sufrirá ninguna modificación.
**Impacto:** Crítico. Es el pilar fundamental de Clean Architecture en este proyecto, asegurando independencia tecnológica absoluta a largo plazo.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-007. "Flujo Oficial de Dependencias". El ensamblaje de la aplicación obedecerá estrictamente la jerarquía Inversa: Infrastructure -> Composition Root -> Application Layer -> Domain. Nunca al revés. Toda dependencia concreta se resolverá exclusivamente y por única vez en el Composition Root (Ensamblador central).
**Impacto:** Crítico. Impide el esparcimiento de `new PrismaClient()` o instancias espagueti, concentrando la materialización de componentes físicos en un único punto del sistema y facilitando el testing integral.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-008. "Auditoría obligatoria de cierre". Ningún Sprint se considerará terminado únicamente porque el código compile o las funcionalidades existan. Todo Sprint debe finalizar con una secuencia inmutable: Desarrollo -> Revisión -> Auditoría Arquitectónica -> Corrección -> Cierre Documental.
**Impacto:** Crítico. Evita institucionalizar la deuda técnica. Mantiene la salud de la arquitectura asegurando que las presiones de tiempo no corrompan los estándares de calidad del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-009. "Política de Cierre de Sprint". Todos los Sprints cumplirán el ciclo: Kickoff -> TASKS -> Auditoría Técnica -> Correcciones -> SPRINT_CLOSEOUT -> Arquitectura Congelada. Una vez emitido el CLOSEOUT, el Sprint queda cerrado de forma inmutable. Cualquier refactorización o mejora futura será tratada como una nueva tarea en Sprints posteriores, nunca reabriendo el pasado.
**Impacto:** Crítico. Convierte el avance del proyecto en un histórico trazable, seguro y auditable. Permite que cualquier equipo herede el proyecto sin ambigüedades.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-010. "Casos de Uso como Unidad Funcional". El backend no se modelará alrededor de tablas ni CRUDs genéricos. El sistema estará modelado exclusivamente alrededor de acciones de negocio (Ej. "Registrar captura", "Clasificar trama", "Asociar evidencias").
**Impacto:** Crítico. Define la filosofía de la Application Layer. Elimina los Controladores y Servicios CRUD anémicos, sustituyéndolos por Comandos y Casos de Uso expresivos que reflejan el trabajo real de un ingeniero de RF.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-011. "Un Caso de Uso representa una intención del usuario". Cada archivo dentro de `usecases/` deberá responder estrictamente a la pregunta "¿Qué intenta hacer el usuario?" y no a interrogantes técnicas u operacionales relativas a bases de datos. 
Además, se adopta formalmente la nomenclatura funcional para el rastreo del proyecto: las tareas y Casos de Uso emplearán identificadores descriptivos (ej. `TASK-001 – Application Layer Architecture`, `UC-001 – RegisterCapture`) para elevar la semántica y legibilidad a largo plazo.
**Impacto:** Crítico. Refuerza el diseño CQS (Command Query Separation) y promueve una trazabilidad humana (no solo mecanizada) del histórico del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-012. "Los DTO son contratos, no modelos". Un DTO no representa una entidad del sistema ni una tabla de base de datos. Representa exclusivamente la información mínima necesaria para intercambiar datos en una operación (Caso de Uso) específica. Si la entidad interna cambia, el DTO no tiene por qué cambiar, garantizando independencia entre el modelo de negocio y las interfaces (APIs) externas.
**Impacto:** Crítico. Protege el Dominio de las modificaciones de la API y viceversa. Erradica la peligrosa práctica de propagar la estructura de la base de datos hacia el exterior (leak de infraestructura).
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-013. "Política de Versionado y Control de Código". Se abandona la nomenclatura M[X].RC[Y] en favor de **SemVer** puro (vX.Y.Z) y **Conventional Commits**. Cada cierre de Sprint mayor generará un incremento MINOR (Y) y un Tag oficial. El historial de Git debe ser un reflejo semántico de la evolución arquitectónica, vinculando Sprints como Epics.
**Impacto:** Crítico. Estandariza la trazabilidad del código fuente, facilitando despliegues automáticos (CI/CD), generación de changelogs y legibilidad inter-equipos a largo plazo.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-15] - Sprint 13
**Descripción:** Decisión de Ingeniería DI-001. "Todas las migraciones de RF_Observatory serán reproducibles desde cero". Cualquier desarrollador o entorno deberá poder levantar la base de datos de cero ejecutando únicamente las migraciones versionadas de Prisma. Quedan terminantemente prohibidos los cambios manuales en la base de datos que no estén reflejados en una migración oficial.
**Impacto:** Crítico. Asegura la portabilidad inter-entornos (Desarrollo, Pruebas, Producción) y erradica el "drift" (desvío) del esquema a lo largo de los años de vida del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Ingeniería DI-002. "Cada proyecto será autosuficiente en Docker". RF_Observatory mantendrá su propia infraestructura Docker aislada (`docker-compose.yml`), al igual que SmartAccess mantendrá la suya. La integración inter-proyectos será exclusivamente a nivel de interfaces/servicios (API). Quedan prohibidos los monolitos de infraestructura (super docker-compose).
**Impacto:** Alto. Garantiza que RF_Observatory sea desplegable de forma totalmente autónoma, modular y mantenible.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Ingeniería DI-003. "La base de datos nunca será la fuente de verdad". Se establece el flujo unidireccional obligatorio: Domain Model -> Relational Model -> schema.prisma -> Prisma Migrate -> PostgreSQL. Queda taxativamente prohibido alterar las tablas de forma manual para luego adaptar el dominio. El Dominio es la autoridad absoluta; la base de datos es un mero detalle de implementación.
**Impacto:** Crítico. Protege la arquitectura a largo plazo, impidiendo que los caprichos del motor relacional dicten o fuercen cambios en las reglas del negocio.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-15] - Sprint 1
**Descripción:** Corrección arquitectónica temprana ("Regularización TASK-001"). Durante la inicialización técnica inicial del proyecto, se configuró el Backend asumiendo erróneamente una arquitectura de "ejecución local nativa". Se detectó el riesgo, se detuvo la ejecución y se corrigió documentalmente el enfoque hacia una orquestación centralizada en Docker.
**Impacto:** Crítico. Evitó anclar el ecosistema técnico localmente al sistema operativo Windows. Definió tempranamente la regla inmutable de que Backend, Frontend y Persistencia deben ser desarrollados asumiendo un entorno contenerizado dentro de `iotsys.cloud`.
**Estado:** Resuelto y Aprobado.

---
*(Nuevas anotaciones deberán reflejarse en este documento en orden cronológico descendente, registrando de manera rigurosa Fecha, Sprint, Descripción, Impacto y Estado).*
