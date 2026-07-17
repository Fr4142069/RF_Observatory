# 37_HttpClientInfrastructure

## 1. Objetivos
El objetivo es aislar la lógica de comunicación externa del **RF Lab Agent** hacia el **RF_Observatory** mediante un cliente HTTP robusto (`ObservatoryClient`), implementando políticas de reintento, tolerancia a fallos y observabilidad (DA-057).

## 2. Responsabilidades del Cliente HTTP
* **Serialización:** Transformar el payload estandarizado interno a formato JSON compatible con la API REST.
* **Tolerancia a fallos de Red (Retry & Backoff):** Reintentar envíos automáticamente ante problemas de conectividad transitorios (Timeouts o códigos 5xx). Los errores por lógica de negocio (4xx) nunca se reintentan.
* **Observabilidad (DA-057):** Interceptar cada respuesta HTTP y emitir un log estructurado que detalle:
  - Destino (Base URL)
  - Endpoint (URL Relativa)
  - Método HTTP
  - Código de estado
  - `requestId` (emitido por RF_Observatory)
  - Resultado/Error.

## 3. Configuración por Entorno
El cliente no maneja variables quemadas en el código. Todas las constantes vitales se extraen del entorno (`config/index.ts`):
* `OBSERVATORY_API_URL`: Punto de enlace al servidor.
* `API_TIMEOUT`: Tiempo máximo de espera por la red. Evita bloquear el agente.
* `API_RETRY_COUNT`: Máximo número de intentos ante caídas del servidor.
* `LAB_AGENT_ID`: Identificador físico de la instancia del agente (ej. ESP_LAB_1).

## 4. Evolución Futura
El diseño deja la puerta abierta para que, en caso de fallo absoluto tras agotar los reintentos HTTP, el error sea atrapado por el `GatewayEngine` (Composition Root) quien, gracias a la **Queue local** (próxima TASK-006), encolará el evento en disco/memoria y volverá a delegarlo a este Cliente HTTP en el futuro.
