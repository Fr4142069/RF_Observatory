# Primer Vertical REST (Register Capture)

**Proyecto:** RF_Observatory  
**Estado:** Normativo (Referencia Arquitectónica)  
**Fecha:** 16 de Julio de 2026

## 1. Objetivos y Principios
Este documento explica el flujo end-to-end del primer endpoint implementado: `POST /api/v1/captures` (UC-001 Register Capture). 
El objetivo es que este flujo sirva como el **Estándar Oficial** (Plantilla) para la construcción de todos los futuros endpoints del RF_Observatory, garantizando cero acoplamientos, inyección manual limpia y el uso estricto de los Factories transversales.

**Decisiones Clave:**
- **DA-041 (El primer endpoint define el estándar):** Los demás endpoints (Búsqueda, Fingerprints, Protocolos) solo deberán replicar este patrón.
- **DA-042 (No se replica un patrón sin auditarlo):** Si hay una mejora que hacer en el uso de Middlewares, DTOs o Controladores, se hará aquí antes de codificar los demás.

## 2. El Flujo de Ejecución del Vertical

El flujo atraviesa la red, la orquestación y el negocio de la siguiente manera:

1. **El Servidor Arranca (`serverBootstrap.ts`)**
   - El sistema llama a `ControllerFactory`, quien a su vez llama a `ApplicationFactory`, quien llama a `RepositoryFactory`.
   - Se instancia el Repositorio de Capturas. Se inyecta en `RegisterCaptureUseCase`. El Caso de Uso se inyecta en `CaptureController`.
   - El controlador ya ensamblado se inyecta en la Ruta (`createCaptureRouter(captureController)`).
2. **Llega la Petición HTTP (`POST /api/v1/captures`)**
   - Express parsea el JSON.
   - `RequestIdMiddleware` inyecta el ID único en el Header.
3. **El Controller Actúa (`CaptureController.ts`)**
   - Extrae `req.body` y construye el `RegisterCaptureRequestDTO` (Interfaz pura de TypeScript).
   - Instancia el `RegisterCaptureCommand` inyectando el DTO.
     - *(Aquí es donde actúan los Validadores creados en el Sprint 4, arrojando error si faltan datos).*
4. **La Application Layer Ejecuta (`RegisterCaptureUseCase.ts`)**
   - Recibe el Comando. Modela el dominio y guarda usando la abstracción del Repositorio. Devuelve el DTO de Respuesta.
5. **El Controller Responde**
   - Pasa el DTO a `ResponseFactory.success(...)`.
   - Devuelve `res.status(201).json(response)`.

## 3. Elementos Clave del Patrón

- **Validación Limpia:** El Controlador NO utiliza librerías de validación de HTTP, como Joi o Zod, incrustadas directamente. Se limita a instanciar el Comando, dejando que la **Application Layer** aplique su validación rigurosa. Si el Comando falla, se dispara una excepción que viaja hasta el `GlobalErrorHandler`.
- **Uso de ResponseFactory:** El Controlador jamás escribe `res.json({ success: true, data: result })`. Siempre utiliza `ResponseFactory`.
- **Catch & Next:** El Controlador está envuelto en un bloque `try/catch`. El `catch` delega el error a Express usando `next(error)`, asegurando que las fugas de memoria y bloqueos de hilo no ocurran, y delegando la formatación al Middleware de Errores.

## 4. Estructura de Capas Involucrada

```text
├── backend/src/
│   ├── bootstrap/
│   │   ├── repositoryFactory.ts       (Conoce Prisma)
│   │   ├── applicationFactory.ts      (Conoce el Use Case)
│   │   ├── controllerFactory.ts       (Conoce el Controller)
│   │   └── serverBootstrap.ts         (Monta Express)
│   ├── controllers/
│   │   └── CaptureController.ts       (Traduce Request a DTO y ResponseDTO a HTTP JSON)
│   ├── routes/
│   │   └── capture.routes.ts          (Vincula el verbo HTTP al método del Controller)
│   ├── application/
│   │   ├── dto/                       (Definen la forma de los datos)
│   │   ├── commands/                  (Aplica validaciones semánticas)
│   │   └── usecases/                  (Lógica central del Observatorio)
```
