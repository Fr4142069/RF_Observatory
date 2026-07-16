# RF_Observatory - Infraestructura Docker

Este directorio consolida la infraestructura en contenedores exclusiva para **RF_Observatory**, cumpliendo fielmente la Regla de Ingeniería **DI-002** (Cada proyecto será autosuficiente en Docker).

## Servicios Disponibles (Sprint 3)
De acuerdo a la planificación, la infraestructura base provee:
- **postgres**: Base de datos relacional PostgreSQL 15. Posee retención de volumen dedicada y healthcheck integrado.
- **backend**: Contenedor Node.js 20. Inicia de manera inactiva (`tail -f /dev/null`) por defecto. Se ha preparado para que dependa transaccionalmente de `postgres` (solo arrancará cuando la DB esté sana).

*(Nota: Servicios adicionales como Frontend, Nginx, Redis o Grafana quedan explícitamente fuera del alcance de este entorno base y se integrarán en Sprints posteriores).*

## Configuración inicial
1. Copiar el archivo `.env.example` a `.env` dentro de este directorio (`docker/`).
2. Validar que los puertos expuestos (`5432` y `3000`) se encuentren disponibles en la máquina host.

## Comandos Útiles

**Validar la sintaxis del archivo compose (Sin levantarlo):**
```bash
docker compose config
```

**Iniciar los servicios en segundo plano:**
```bash
docker compose up -d
```

**Detener los servicios (preservando el volumen de persistencia):**
```bash
docker compose down
```

**Forzar la reconstrucción de los contenedores:**
```bash
docker compose up -d --build
```

**Consultar logs de servicio en tiempo real:**
```bash
docker compose logs -f postgres
docker compose logs -f backend
```

**Verificar manualmente el estado de PostgreSQL:**
```bash
docker compose exec postgres pg_isready -U postgres -d rf_observatory
```

## Limitaciones y Restricciones
*Atención metodológica:* **NO inicie los contenedores (up)** si aún se encuentra en la fase de preparación de infraestructura del Sprint 3. Se debe aguardar a la TASK-005 para realizar la **Primera Migración Oficial** en un entorno controlado.
