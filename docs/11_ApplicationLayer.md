# 11. Arquitectura de la Application Layer

## Objetivo de la Application Layer
La Capa de Aplicación (Application Layer) es el "motor orquestador" de RF_Observatory. Su misión es dirigir el flujo de datos entre el exterior y las entidades de negocio. Define **qué** puede hacer el sistema (sus Casos de Uso) sin preocuparse por los detalles técnicos de **cómo** llegan esos datos (HTTP, CLI) o **cómo** se guardan (PostgreSQL, MongoDB).

## Responsabilidad y Filosofía (Regla DA-011)
La unidad funcional del backend ya no es una tabla o un controlador CRUD; **es el Caso de Uso**. Cada Caso de Uso (ubicado en `usecases/`) representará una única y exclusiva intención de negocio del usuario, por ejemplo: `RegisterCapture`, `ClassifyCapture`, `PublishKnownProtocol`.

## Estructura de Directorios

- `dto/` (Data Transfer Objects): Define las estructuras inmutables con las que la capa de aplicación recibe datos (ej. InputDTO) y entrega resultados (ej. OutputDTO).
- `commands/`: Objetos semánticos que expresan una mutación de estado o ejecución de tarea (CQS - Command).
- `queries/`: Objetos semánticos para la recuperación pura de información sin efectos secundarios (CQS - Query).
- `usecases/`: El núcleo duro de esta capa. Clases con un método `execute()` que orquestan las acciones.
- `validators/`: Lógica de validación estructural para asegurar que los DTOs que ingresan a los Casos de Uso están íntegros antes de tocar el Dominio.
- `errors/`: Excepciones personalizadas del nivel de aplicación (ej. `ValidationException`, `ResourceNotFoundException`).
- `mappers/`: Funciones de traducción para convertir estructuras externas o de base de datos a Entidades puras y viceversa, protegiendo el Dominio.
- `ports/`: Interfaces requeridas por la aplicación que serán implementadas por la infraestructura en el futuro (ej. FileStorageService, EmailService, AIInferenceService).
- `services/`: Coordinadores genéricos de aplicación requeridos por múltiples casos de uso de forma transversal (ej. un despachador de eventos de dominio, aunque raramente contendrá lógica de negocio primaria).

## Límites de Aislamiento
- **NO Conoce a la API:** La Application Layer no importa Express, ni *Requests*, ni *Responses* HTTP.
- **NO Conoce la Base de Datos:** No importa `PrismaClient` ni SQL. Solo interactúa con las Interfaces Repository inyectadas en sus constructores.
- **Solo conoce:** Entidades, Interfaces Repository y DTOs propios.

## Flujo de Ejecución Arquitectónico

```text
Cliente (ej. Angular, CLI, API Externa)
   │
   ▼
API REST (Express Controller / Router)  -- [Sprint 5]
   │
   ▼
DTO (Request parseado)                  -- [Sprint 4]
   │
   ▼
Validation Layer                        -- [Sprint 4]
   │
   ▼
USE CASE (Application Layer)            -- [Sprint 4]
   │
   ▼
Repository Interface                    -- [Sprint 3]
   │
   ▼
Dominio (Entidades de Negocio)          -- [Sprint 2]
   │
   ▼
Prisma Repository (Infrastructure)      -- [Sprint 3]
   │
   ▼
PostgreSQL                              -- [Sprint 3]
```

## Relación con el Dominio
La Application Layer es cliente del Dominio. Ella es responsable de invocar los métodos de las Entidades y orquestar que los Repositorios las guarden. La regla de oro dicta que la complejidad y las reglas matemáticas/heurísticas de RF radican en el Dominio, y la Application Layer simplemente actúa como director de orquesta.
