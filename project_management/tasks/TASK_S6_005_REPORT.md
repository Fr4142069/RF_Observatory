# TASK-S6-005: HTTP Client Infrastructure

## Información General
- **Proyecto:** RF_Lab_Agent
- **Sprint:** Sprint 6
- **Tipo:** Infrastructure
- **Estado:** Completada

## Objetivo
Implementar la infraestructura HTTP (aislada y resiliente) que permita al `RF_Lab_Agent` comunicarse exclusivamente mediante contratos públicos con el `RF_Observatory`.

## Avance de la Implementación
Se codificaron los siguientes componentes dentro de `rf_lab_agent/`:
1. **Configuración Desacoplada (`config/index.ts`):** Módulo centralizado que parametriza la URI, variables de timeout, política de reintentos y la identidad inyectada del agente (`LAB_AGENT_ID`).
2. **Registro de Observabilidad (`logging/AgentLogger.ts`):** Una utilidad básica pero estructurada para grabar eventos operativos.
3. **Cliente Tolerante a Fallos (`api/ObservatoryClient.ts`):**
   - **Axios Interceptors (DA-057):** Todas las solicitudes y respuestas son interceptadas para registrar metadatos de latencia, estados HTTP y el `requestId` generado por el servidor, sin necesidad de que el caso de uso se entere.
   - **Retry Policy & Backoff:** Un algoritmo recursivo que captura errores. Distingue inteligentemente entre fallas del cliente (HTTP 4xx - NO REINTENTAR) y caídas temporales del servidor/red (Errores 5xx / Sin Respuesta - SÍ REINTENTAR).

## Decisiones Aplicadas
Se incluyó formalmente en el Casebook la **DA-057**: *"Toda comunicación entre procesos es observable"*. Esta regla asegura la futura capacidad técnica de trazar un log distribuido entre el Agente de hardware y el servidor del observatorio sin depender del payload, unificando la investigación de incidentes en el entorno del laboratorio.

## Conclusión
El Agente tiene ahora "boca" y "oídos". Sabe cómo hablar y cuándo debe intentarlo de nuevo, pero aún no tiene memoria a largo plazo. Según la visión arquitectónica, la próxima tarea es construir la Cola de Eventos (Event Queue) para que si el servidor o la red colapsan de forma severa, la captura RF no se pierda en la volatilidad de la memoria RAM, sino que resista y persista localmente.
