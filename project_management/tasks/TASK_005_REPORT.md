# Reporte de Tarea: Dependency Injection Bootstrap (TASK-005)

**Sprint:** 5 – Infrastructure & Delivery Layer  
**Nombre de la Tarea:** Dependency Injection Bootstrap (TASK-005)  
**Estado:** Completada  

## 1. Objetivo
Diseñar el esquema inmutable de ensamblaje (Dependency Graph) para que todas las dependencias estructurales del sistema (Repositorios, Casos de Uso, Controladores) se inyecten de manera manual y tipada en un único punto lógico (el Composition Root), evadiendo la necesidad de ensuciar el código del dominio con decoradores de librerías de terceros (IoC).

## 2. Entregables
- Directorio de infraestructura creado: `backend/src/bootstrap/`.
- Documento oficial de arquitectura generado: `docs/23_DependencyInjectionArchitecture.md`.
- Decisiones arquitectónicas registradas en el Casebook: **DA-037** (Único Composition Root) y **DA-038** (Ensamblaje ejecutado solo una vez).

## 3. Resumen del Diseño Estructural
Se estableció el *Composition Root* como la única zona autorizada para "ensuciarse" importando todas las capas. Se diseñó su división en fábricas específicas:
- `repositoryFactory`: Inicializa las implementaciones de base de datos.
- `applicationFactory`: Construye Casos de Uso recibiendo los repositorios previamente construidos.
- `controllerFactory`: Construye los controladores HTTP inyectando los Casos de Uso.
- `serverBootstrap`: Conecta las salidas de los controladores con las rutas de Express.

Esta inversión de control manual garantiza que el núcleo de la aplicación permanezca puro e inmutable, y que cualquier framework IoC futuro solo reemplace a estos *factories* sin afectar ninguna otra capa.

## 4. Estado y Siguientes Pasos
Se ha cumplido íntegramente la restricción de no escribir endpoints, no codificar el contenedor ni modificar los casos de uso.
Con este mapa logístico cerrado, el proyecto se declara listo para la **TASK-006 (REST API)**, que será la implementación física final donde Express, Controladores, Middlewares de Error y el Bootstrap cobrarán vida para habilitar los Casos de Uso de Observación y Consultas.
