# 12. DTO Guidelines (Data Transfer Objects)

## ¿Qué es un DTO?
Un **Data Transfer Object (DTO)** es un objeto plano, inmutable y tonto (sin comportamiento) cuyo único propósito es transportar datos de un extremo a otro. En RF_Observatory, los DTOs definen el **contrato de comunicación** de la Application Layer con el exterior (ej. la API).

## ¿Qué NO es un DTO?
- **NO es una Entidad del Dominio:** Las Entidades tienen reglas de negocio y cambian por motivos funcionales.
- **NO es un Modelo de Base de Datos:** Los DTOs no conocen a Prisma ni heredan su estructura.
- **NO contiene lógica:** Un DTO nunca tendrá métodos como `calculate()`, `save()` o `validate()`. 

## Regla de Oro (DA-012)
**Los DTO son contratos, no modelos.**
La estructura de un DTO responde únicamente a lo que un **Caso de Uso específico** requiere para ejecutarse (Input) o lo que desea devolver (Output). Si una Entidad `Capture` tiene 20 campos, pero el Caso de Uso de "Registrar Captura" solo requiere 3, el `RegisterCaptureRequestDTO` tendrá únicamente 3 campos.

## Tipos de DTOs en RF_Observatory
Por convención, utilizaremos el siguiente sufijo (aunque semánticamente también pueden verse como Commands/Queries según la capa que los manipule, en la frontera perimetral serán DTOs):
- `[Accion]RequestDTO`: Datos que entran a la aplicación (ej. `CreateCaptureRequestDTO`).
- `[Entidad]ResponseDTO`: Datos que salen de la aplicación hacia el cliente (ej. `CaptureResponseDTO`).
- `Update[Entidad]DTO`: Datos para modificación (cuando aplique, si no usamos comandos específicos).

## Tipado y Reglas Estrictas
- Se programan en **TypeScript puro**.
- Queda totalmente prohibido usar el tipo `any`.
- Se aconseja utilizar `readonly` en todas las propiedades para garantizar su inmutabilidad intrínseca.
- Estarán desprovistos de validadores (decoradores tipo `class-validator`) si estos ensucian el contrato. La capa de validación (`validators/`) los analizará extrínsecamente.

## Flujo de Datos

```text
Cliente (Angular / Postman / CLI)
   │
   ▼ (Envía JSON)
API (Controlador Express)
   │
   ▼ (Parsea a Request DTO)
Application Layer (Caso de Uso)
   │
   ▼ (Extrae datos del DTO)
Dominio (Entidad)
   │
   ▼ (Reglas de Negocio)
Dominio (Entidad mutada)
   │
   ▼ (Mapper)
Application Layer (Caso de Uso)
   │
   ▼ (Empaqueta en Response DTO)
API
   │
   ▼ (Envía JSON)
Cliente
```
