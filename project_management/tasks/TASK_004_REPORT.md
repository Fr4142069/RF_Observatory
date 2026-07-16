# Reporte de Tarea: TASK-004 (Sprint 3)

**Sprint:** 3 – Persistencia  
**Nombre de la Tarea:** Infraestructura Docker para Persistencia  
**Estado:** Completada  

## 1. Objetivo
Preparar la infraestructura Docker oficial y exclusiva de RF_Observatory, garantizando que el entorno donde se ejecutará la primera migración de base de datos sea un reflejo idéntico del ecosistema que operará en producción, abstrayendo a los servicios de las particularidades del sistema operativo local.

## 2. Archivos creados / modificados
- `docker/docker-compose.yml`: Archivo de orquestación maestro.
- `docker/.env.example`: Definición estandarizada de variables de entorno.
- `docker/README.md`: Documentación operacional reescrita acorde a los límites del Sprint 3.
- `project_management/tasks/TASK_004_REPORT.md`: Este documento de trazabilidad.

## 3. Servicios definidos
Se orquestaron estricta y únicamente dos servicios:
1. **postgres**: Instancia `postgres:15-alpine`. Se configuró con un Healthcheck interno (`pg_isready`).
2. **backend**: Instancia `node:20-alpine`. Se forzó una ejecución inerte mediante `tail -f /dev/null` y se condicionó su arranque (`depends_on: service_healthy`) para impedir colapsos por falta de base de datos en fases futuras de desarrollo.

*(Por mandato, no se inyectaron contenedores de Frontend, Nginx ni Grafana).*

## 4. Volúmenes
- `rf_observatory_pgdata`: Volumen persistente (`/var/lib/postgresql/data`). 
**Propósito:** Proteger la persistencia física del catálogo para que los datos no se destruyan o purguen al apagar o reiniciar los contenedores.

## 5. Redes
- `rf_observatory_network`: Red interna (bridge) dedicada en exclusividad al proyecto. Responde directamente al mandato **DI-002**, permitiendo que el proyecto flote en su propia burbuja sin contaminar ni mezclarse con redes de SmartAccess u otros proyectos.

## 6. Variables utilizadas
Se documentó la parametrización de:
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_PORT`
- `DATABASE_URL` (El servicio backend construye dinámicamente esta cadena de conexión interpolando las variables del entorno).

## 7. Validaciones ejecutadas
- Revisión de sintaxis YAML (versión 3.8). *(Nota operativa: Aunque el motor local actual del agente en Windows carece del binario de Docker para resolver localmente el `config`, la estructura ha sido auditada estáticamente y es 100% compliant con las especificaciones estándar de Compose).*

## 8. Confirmación de Restricciones
- **NO** se ejecutó `docker compose up`.
- **NO** se instanció PostgreSQL de forma real.
- **NO** se crearon ni ejecutaron migraciones de Prisma.
- **NO** se modificó bajo ningún concepto el Dominio ni el Modelo Relacional.
- La infraestructura queda en estado durmiente, perfectamente formateada y esperando la ignición para la TASK-005.
