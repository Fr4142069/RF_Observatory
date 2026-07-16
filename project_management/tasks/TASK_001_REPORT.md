# Reporte de Tarea: TASK-001 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** Arquitectura de la Application Layer  
**Estado:** Completada  

## 1. Objetivo
Trazar las fronteras, directorios y responsabilidades de la Capa de Aplicación, diseñándola expresamente para estar orientada a **Casos de Uso** (Regla DA-011) en lugar de operaciones CRUD genéricas, dejando listos los cimientos físicos en los que se alojará el comportamiento del sistema.

## 2. Directorios creados
Ubicados en `backend/src/application/`:
- `dto/`
- `commands/`
- `queries/`
- `usecases/`
- `validators/`
- `errors/`
- `mappers/`
- `ports/`
- `services/`

*(Nota: todos los directorios fueron inicializados con `.gitkeep` para garantizar su preservación en control de versiones).*

## 3. Responsabilidad
Se asignó semántica inmutable a cada directorio. `usecases/` albergará las "intenciones", `validators/` los filtros de sanidad, y `ports/` los enchufes abstractos para infraestructura futura. El flujo y límite de responsabilidad está oficializado en el documento `docs/11_ApplicationLayer.md`.

## 4. Justificación arquitectónica
Si mezclamos los Casos de Uso con los Controladores (API), la aplicación se vuelve in-testeable sin invocar la red. Si los mezclamos con el Dominio, contaminamos las reglas puras con DTOs sucios. Esta arquitectura asegura que el sistema tiene un "motor de procesamiento" agnóstico de su método de entrada, altamente testeable (usando mocks para los repositorios) e independiente del framework web.

## 5. Relación con Clean Architecture
Constituye el Anillo Central-Externo (Application / Use Cases Ring). Su propósito exclusivo es la **Orquestación**: recibe órdenes del exterior, extrae datos de la capa persistente, dirige la lógica de dominio puro, y persiste nuevamente. Cumple a rajatabla la Regla de Dependencia (DIP) interactuando con la persistencia solo vía interfaces.

## 6. Riesgos identificados
- **Inflación de Casos de Uso:** Es posible que al modelar funcionalmente un sistema complejo terminemos con una gran cantidad de archivos en `usecases/` (Ej. `UC-045.ts`). Aunque es sano por Principio de Responsabilidad Única (SRP), a futuro podría requerir agruparlos en sub-módulos dentro de `usecases/` (ej. `usecases/capture/`, `usecases/analysis/`) para facilitar la navegación.
