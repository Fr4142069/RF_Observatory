# Reporte de Tarea: TASK-002 (Sprint 4)

**Sprint:** 4 – Application Layer & Use Cases  
**Nombre de la Tarea:** DTO Design  
**Estado:** Completada  

## 1. Objetivo
Diseñar la arquitectura perimetral de entrada y salida de datos de la Application Layer mediante el patrón DTO (Data Transfer Object), asegurando un desacoplamiento absoluto entre lo que el exterior envía/recibe y cómo el modelo interno está construido.

## 2. Directorios creados
Ubicados en `backend/src/application/dto/`:
- `capture/`
- `classification/`
- `evidence/`
- `fingerprint/`
- `protocol/`
- `session/`
- `shared/` (para constructos de paginación, metadatos, etc.)

## 3. Convención de nombres
Aprobada formalmente:
- Ingreso: `[Verbo/Acción][Entidad]RequestDTO` (ej. `CreateCaptureRequestDTO`).
- Egreso: `[Entidad]ResponseDTO` (ej. `CaptureResponseDTO`).
- La expresividad funcional precede al reduccionismo técnico.

## 4. Reglas de diseño (DA-012)
- Los DTO son contratos inmutables de casos de uso, no espejos de tablas.
- Carecen de dependencias a Prisma o Express.
- Carecen de lógica de negocio o métodos mutables.
- Tipado TypeScript estricto, sin `any`.

## 5. Diferencias con Entidades
Mientras la Entidad `Capture` es la "Verdad del Negocio" y contiene reglas invariantes, el DTO es simplemente el "Mensajero". La Entidad cambia si el negocio cambia; el DTO solo cambia si la interfaz de usuario (o el consumidor de la API) requiere enviar o recibir datos de manera distinta para un caso de uso particular.

## 6. Riesgos identificados
- **Duplicidad Inicial Percibida:** Los desarrolladores menos familiarizados con Clean Architecture podrían considerar "redundante" tener un `CreateCaptureRequestDTO` y luego un `Capture` Entity que en los primeros Sprints lucirán muy parecidos. Sin embargo, este peaje temprano es lo que salva a la aplicación de fracturarse cuando la base de datos comience a diferir drásticamente de los payloads de la API en el futuro. Se requerirá rigor en las revisiones de código para evitar que los DTOs incorporen métodos lógicos o dependencias externas.
