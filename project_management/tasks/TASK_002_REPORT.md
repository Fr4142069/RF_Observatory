# Reporte de Tarea: Backend HTTP Architecture (TASK-002)

**Sprint:** 5 – Infrastructure & Delivery Layer  
**Nombre de la Tarea:** Backend HTTP Architecture (TASK-002)  
**Estado:** Completada  

## 1. Objetivo
Diseñar la arquitectura HTTP (Delivery Layer) que servirá de frontera entre el mundo exterior y el Knowledge Engine (Application Layer), asegurando un blindaje absoluto contra la filtración de lógica de negocio o infraestructura en el núcleo.

## 2. Entregables
- Documento normativo oficial: `docs/20_BackendHttpArchitecture.md`.
- Estructura de directorios base generada en `backend/src/` (`controllers`, `routes`, `middlewares`, `errors`, `responses`, `config`, `http`).

## 3. Decisiones Arquitectónicas (Registradas en el Casebook)
- **DA-031 ("Las fronteras traducen, nunca deciden"):** Restringe la responsabilidad de los controladores a ser meros adaptadores entre peticiones HTTP y DTOs, prohibiéndoles tocar repositorios o tomar decisiones del dominio.
- **DA-032 ("HTTP es reemplazable"):** La capa de Aplicación no debe saber jamás cómo fue invocada (REST, GraphQL, gRPC), asegurando la longevidad del código central.

## 4. Restricciones Aplicadas y Verificadas
Se garantizó que el diseño prohíbe explícitamente:
- A un Controller conocer de SQL o Prisma.
- A un Use Case conocer códigos HTTP (`400`, `200`) o los objetos de Express (`req`, `res`).
- A un Route contener lógica procedimental.

## 5. Conclusión y Siguientes Pasos
La arquitectura HTTP teórica está congelada. El documento normativo guiará a los desarrolladores durante el resto del Sprint. El siguiente paso lógico, conforme al roadmap del Sprint, es definir el **API Error Model (TASK-003)** y el **REST Response Standard (TASK-004)** antes de programar cualquier endpoint real.
