# ROADMAP COMERCIAL (MVP)

**Objetivo Comercial Único:** SmartAccess debe poder registrar un control remoto desconocido exactamente igual que hoy registra una tarjeta RFID o una huella digital.

---

## FASE 1: RF_Laboratory (Adquisición Física)
El cuello de botella ya no es el software, es el laboratorio. Esta fase se ejecuta en el mundo real.

- **Etapa 1:** Validar hardware físico (RX/TX 433MHz, RX/TX 315MHz, Analizador Lógico).
- **Etapa 2:** Comparar fuentes de verdad (Analizador Lógico vs UART del ESP32) para asegurar confianza ciega en la captura.
- **Etapa 3:** Definir el formato interno definitivo de captura (estructura en C/C++ para el ESP32).
- **Etapa 4:** Enviar la primera captura real al Observatorio.

## FASE 2: RF_Observatory (Procesamiento)
El backend procesa la evidencia real proveniente de la Fase 1.

- **Etapa 5:** Persistir la captura en PostgreSQL sin pérdidas.
- **Etapa 6:** Calcular el Fingerprint inicial.
- **Etapa 7:** Consultar similitud contra base de datos.
- **Etapa 8:** Registrar protocolo (Conocido / Desconocido).

## FASE 3: SmartAccess (Integración Comercial)
El consumidor final cierra el ciclo. El Observatorio actúa como servicio de fondo.

- **Etapa 9:** Integrar llamadas HTTP desde SmartAccess al Observatorio.
  - Registrar control nuevo.
  - Buscar si ya existe.
  - Asociarlo a un usuario de SmartAccess.
  - Permitir / Denegar acceso físico a la puerta.

---
*El proyecto se rige por pragmatismo absoluto. Si una tarea no avanza una de estas 9 etapas, se traslada inmediatamente al Backlog Estratégico.*
