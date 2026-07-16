# Segundo Vertical REST (Attach / Register Evidence)

**Proyecto:** RF_Observatory  
**Estado:** Activo  
**Fecha:** 16 de Julio de 2026

## 1. Objetivo y Nomenclatura
Este documento registra la implementación del segundo endpoint de la API REST: `POST /api/v1/evidence`.  
Corresponde al **UC-002 (Attach Evidence)**, el cual fue referenciado por el usuario en esta fase como "Register Evidence". Para mantener la coherencia con el Dominio y la Application Layer del Sprint 4, se utilizaron las clases subyacentes `AttachEvidenceUseCase`, `AttachEvidenceCommand` y `AttachEvidenceRequestDTO`, que resuelven exactamente la misma intención.

## 2. Reutilización Arquitectónica
Siguiendo las directivas de las normativas **DA-044** y **DA-042**, el patrón del **Endpoint de Referencia** (`POST /api/v1/captures`) ha sido clonado de manera íntegra, sin introducir nuevas estructuras JSON, ni bibliotecas, ni "estilos personales" en el controlador.

- **Infraestructura intocada:** Se re-importaron y utilizaron `ResponseFactory` y `GlobalErrorHandler`.
- **Controller Estéril:** `EvidenceController.ts` hace exactamente lo mismo que el primero: extraer del `req.body` el DTO `AttachEvidenceRequestDTO`, instanciar su `Command` respectivo e inyectarlo en el `UseCase`.
- **Inyección Centralizada:** El repositorio mock de `Evidence` fue añadido al `repositoryFactory`. La cadena de inyección fue replicada hasta `serverBootstrap.ts`.

## 3. Diferencias Funcionales
Al no existir diferencias arquitectónicas, la única variación es intrínseca a la semántica del payload que recibe y el caso de uso que ejecuta. 

Mientras el primer endpoint recibe un flujo de señal y características físicas para crear una `Capture`, este segundo endpoint recibe apuntadores (`targetId`, `targetType` como `CAPTURE`, `FINGERPRINT` o `CLASSIFICATION`) para adjuntarle una `Evidence` fotográfica, manual o referencial.

**Contratos REST e Interceptores de Error** actúan de idéntica manera; si el validador del caso de uso rechaza la vinculación (ej. falta de `title`), el interceptor arroja el `422 Unprocessable Entity` acordado y auditado previamente.
