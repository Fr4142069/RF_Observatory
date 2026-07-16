# Reporte de Tarea: TASK-004

**Sprint:** 1 – Inicialización Técnica  
**Nombre de la Tarea:** Infraestructura Docker Base  
**Estado:** Completada  

## Objetivo
Preparar la base organizativa y documental de la infraestructura Docker, estableciendo los planos arquitectónicos para el despliegue del proyecto sobre `iotsys.cloud`, sin ejecutar contenedores ni crear imágenes definitivas.

## Archivos Creados / Modificados
- `docker/README.md`: Documentación central de la orquestación y despliegue del proyecto.
- `docker/compose/`: Estructura para agrupar especificaciones compose.
- `docker/development/`: Estructura para recursos de hot-reload y desarrollo.
- `docker/production/`: Estructura para recursos inmutables de producción.
- `docker/database/`: Estructura para scripts de inicialización de la base de datos.
- `docker/proxy/`: Estructura lógica del Reverse Proxy que interconectará la nube.
- `docker/volumes/`: Estructura que servirá de anclaje para los montajes de persistencia.
- `project_management/reports/TASK_004_REPORT.md`: Este reporte de trazabilidad oficial.

## Decisiones Documentadas
- Se definió formalmente la segregación operativa entre entornos de desarrollo (con montaje vivo del código local) y de producción (contenedores estáticos cerrados).
- Se clarificó la responsabilidad del Reverse Proxy alojado en `rf-observatory.iotsys.cloud` como único puente de tráfico HTTPS, protegiendo las redes internas.
- Se definieron los volúmenes para salvaguardar PostgreSQL y la evidencia física recolectada, garantizando el principio WORM (Write-Once, Read-Many) del Observatorio.
- **Acuerdo Metodológico:** Se adoptó de forma permanente la práctica de emitir reportes de trazabilidad para cada Tarea (TASK) al momento de cerrarla, tal como sugirió el humano. Esto robustece drásticamente la capacidad analítica del proyecto en el largo plazo.

## Restricciones Respetadas
- **NO** se creó ningún archivo `Dockerfile`.
- **NO** se creó un `docker-compose.yml` definitivo, únicamente las carpetas para albergarlo en el futuro.
- **NO** se instanció la infraestructura, no hay contenedores reales corriendo que pertenezcan a esta TASK.
- Los módulos de `backend/`, `frontend/` y `shared/` no fueron alterados en lo absoluto.

## Pendientes Detectados (Próximos Pasos en Docker)
- Creación física del `docker-compose.yml` y los `Dockerfile` específicos de cada servicio una vez comience la integración de componentes vivos.
- Diseño de las inyecciones de credenciales mediante `.env` verdaderos en el sistema host.
