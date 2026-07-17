# 38_FirstLiveCapturePipeline

## 1. Objetivos
El hito principal de esta tarea consiste en materializar el primer **Vertical Slice** del proyecto: conectar un extremo físico (mando RF -> ESP32) con el cerebro del sistema (RF_Observatory -> PostgreSQL) utilizando exclusivamente los contratos públicos de transporte. 
El enfoque gira alrededor de construir la capacidad "end-to-end" de observar una señal en la realidad y verla persistida en la base de datos sin lógica intermedia.

## 2. Componentes Involucrados en el Pipeline
La señal transita por las siguientes capas (de Hardware a Base de Datos):
1. **ESP32 (Laboratorio):** Captura el pulso RF (OOK/ASK) a 433MHz y vuelca JSON por el puerto Serial (USB).
2. **RF_Lab_Agent / SerialAdapter:** Abre el puerto `COM`/`/dev/ttyUSB`, parsea la traza Serial y genera el payload normalizado.
3. **RF_Lab_Agent / AgentEngine:** Recibe el payload del hardware y ordena al cliente HTTP despacharlo.
4. **RF_Lab_Agent / ObservatoryClient:** Serializa el JSON, inyecta su `X-Agent-ID` y realiza un POST a `/api/v1/captures`.
5. **RF_Observatory / REST API:** Valida la estructura mediante Zod (sin lógica de RF) y delega al caso de uso.
6. **RF_Observatory / Prisma Repository:** Persiste la evidencia de manera transaccional.
7. **PostgreSQL:** Almacenamiento definitivo.

## 3. Restricciones Aplicadas
* **Cero Inteligencia en Tránsito:** El Lab Agent no sabe qué significan los pulsos, solo sabe cómo moverlos del ESP32 a HTTP.
* **Separación Física:** Todo el bloque del Agente opera como un proceso independiente (Node.js) respecto al backend de NestJS/Express.

## 4. Estado de Validación (Punto de Corte)
La escritura de este código establece el "chasis" del Pipeline. 
Para **Validar Empíricamente** este Pipeline y cumplir con la DA-055, se requiere:
1. Conectar el ESP32 a la máquina y encender el puerto Serial.
2. Iniciar la instancia PostgreSQL (Docker/Nube).
3. Levantar `RF_Observatory` en un puerto local.
4. Levantar `RF_Lab_Agent` configurando el `SERIAL_PORT` adecuado.
Emitir un pulso real y confirmar el registro transaccional extremo a extremo.
