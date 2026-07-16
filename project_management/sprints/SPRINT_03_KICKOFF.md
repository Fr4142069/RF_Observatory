# SPRINT 3 KICKOFF
## Proyecto RF_Observatory

**Tipo:** Planificación Oficial  
**Estado:** Previo al Sprint 3  

---

## CONTEXTO
Los siguientes documentos fundacionales y de diseño ya fueron formalmente aprobados:
- Arquitectura
- Domain Model
- Sprint 0
- Sprint 1
- Sprint 2
- Auditoría del Dominio (`SPRINT_02_DOMAIN_AUDIT.md`)
- Cierre Oficial (`SPRINT_02_CLOSEOUT.md`)

**El Dominio queda oficialmente congelado.**  
Durante la ejecución de este documento y a lo largo de todo el Sprint 3, el Dominio NO debe modificarse bajo ninguna circunstancia (conforme a la *Regla de Ingeniería RF_Observatory-001*).

---

## OBJETIVO
Crear la hoja de ruta oficial y definitiva para el Sprint 3. Este documento opera como el "plano de obra" estructurado previo al inicio del trabajo de desarrollo de la capa de Persistencia.

---

## MISIÓN DEL SPRINT 3
Construir y desplegar íntegramente la **capa de Persistencia** del proyecto.

**IMPORTANTE:**
- La Persistencia deberá adaptarse al Dominio.
- El Dominio **NO** se adapta a la Persistencia.

---

## ALCANCE
Durante el Sprint 3 podrán desarrollarse **únicamente** componentes tecnológicos, configuraciones y módulos estrictamente relacionados con persistencia de datos.

**Fuera de Alcance:**
- API
- Frontend
- Clasificación heurística / Algoritmos
- Motores RF
- Servicios (Lógica de negocio aplicada)
- Interfaz de Usuario (UI)

---

## OBJETIVOS
Definir completamente y materializar cómo se implementará:
- **PostgreSQL**: Configuración base de la conexión.
- **Esquema relacional**: Mapeo exacto entre el modelo conceptual (Dominio) y las tablas físicas.
- **Migraciones**: Estrategia y archivos de evolución del esquema de la base de datos.
- **Repositories**: Contratos e implementaciones para abstraer las transacciones.
- **Acceso al Dominio**: Entidades ORM / Mappers bidireccionales.
- **Persistencia de entidades**: Inserción, actualización y recuperación de datos puros.

---

## PLAN DEL SPRINT
El Sprint 3 se divide en las siguientes TASKs atómicas. Cada TASK será estrictamente independiente y deberá producir un incremento funcional verificable.

### Propuesta de TASKs
| TASK     | Objetivo Técnico |
|----------|------------------|
| **TASK-001** | Traducción del Modelo del Dominio al Modelo Relacional (Mapeo 1:1 a PostgreSQL). |
| **TASK-002** | Implementación inicial del Prisma Schema. |
| **TASK-003** | Preparación del Entorno de Persistencia (Prisma + PostgreSQL). |
| **TASK-004** | Configuración inicial de Docker Compose. |
| **TASK-005** | Planificación Primera Migración Oficial. |
| **TASK-006** | Repository Interfaces. |
| **TASK-007** | Repository Implementations (Prisma). |
| **TASK-008** | Inyección de Dependencias (Composition Root). |
| **TASK-009** | Auditoría Completa de Persistencia. |
| **TASK-010** | SPRINT_03_CLOSEOUT (Cierre oficial del Sprint). |

---

## ESTRATEGIA DE DESPLIEGUE (DA-005)
Las tareas de despliegue físico y orquestación final de la base de datos se desacoplan del Sprint ordinario. Se ejecutarán en una jornada posterior dedicada exclusivamente al **Deployment Sprint 3** sobre el VPS `iotsys.cloud`.

---

## DEPENDENCIAS Y FLUJO
Se documenta la siguiente cadena de dependencia jerárquica obligatoria para el proyecto:
**Dominio** → **Persistencia** → **Backend** → **API** → **Frontend**

*La capa de persistencia (Sprint 3) se subordina absolutamente al Dominio (Sprint 2) y servirá como cimiento inamovible para el Backend en el Sprint 4.*

---

## CRITERIOS DE ACEPTACIÓN
Este documento define de forma inequívoca:
1. **Qué se hará:** Configuración y persistencia relacional de todas las entidades del dominio.
2. **Qué NO se hará:** Lógicas RF, APIs, Frontend o modificaciones del Dominio.
3. **En qué orden:** Secuencial y jerárquico desde el diseño del esquema (TASK-001) hasta el cierre oficial (TASK-014).
4. **Entregables:** Repositorios, migraciones y esquemas relacionales configurados.
5. **Validaciones:** Auditoría final de persistencia antes del cierre (TASK-013).
6. **Finalización:** Cierre formal y documental con `SPRINT_03_CLOSEOUT.md`.

---

## RESTRICCIONES
- **NO** modificar el Domain Model.
- **NO** introducir mejoras arquitectónicas transversales improvisadas.
- **NO** crear tablas o código SQL directamente en esta fase de Kickoff.
- Esta hoja de ruta rige obligatoriamente todo el esfuerzo futuro del Sprint 3.
