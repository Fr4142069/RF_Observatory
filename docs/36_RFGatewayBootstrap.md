# 36_RFGatewayBootstrap

## 1. Objetivos
El objetivo principal es crear el proyecto base del **RF Gateway**, que actuará como puente tecnológico entre el laboratorio físico (hardware) y el `RF_Observatory` (motor de conocimiento). Este Gateway nace como un proyecto **independiente**, materializando la decisión de arquitectura **DA-056**, garantizando cero acoplamiento de código fuente con el backend central.

## 2. Arquitectura de Desacoplamiento
El Gateway se interpone entre la adquisición física y la inferencia. 
Su diseño refleja las siguientes reglas (Clean Architecture aplicada a infraestructura):
1. **Sin Inteligencia de Negocio:** El Gateway no clasifica ni entiende los Fingerprints; únicamente recibe, envuelve y despacha.
2. **Independencia de Proyectos:** El Gateway y el Observatorio solo conversan vía HTTP/JSON.
3. **Desacoplamiento Interno:** Las capas internas del Gateway aseguran que cambiar el cliente HTTP no afecte a la lectura del puerto Serial.

## 3. Estructura de Directorios
El proyecto se inicializa en la raíz `/rf_gateway/` con la siguiente organización:
- `src/config/`: Configuración global, variables de entorno y constantes.
- `src/capture/`: Componentes y adaptadores para la recepción de datos desde los dispositivos físicos (ESP32, SDR).
- `src/transport/`: Abstracciones de comunicación y normalización de la señal hacia el dominio del Gateway.
- `src/api/`: Cliente HTTP exclusivo encargado de consumir la API REST del RF_Observatory.
- `src/queue/`: Sistema de encolamiento temporal de eventos para mitigar caídas de red o picos de tráfico.
- `src/logging/`: Mecanismo estructurado para registrar auditoría operativa del laboratorio.
- `src/health/`: Endpoints o rutinas para verificar el estado de salud y conectividad del propio Gateway.
- `src/bootstrap/`: Composition Root. Ensamblaje central de todas las dependencias del Gateway.
- `docs/`: Documentación propia del Gateway.
- `tests/`: Pruebas unitarias y de integración exclusivas del Gateway.

## 4. Flujo Interno Previsto
1. El hardware emite datos a través de una interfaz física (ej. Serial/USB).
2. Un módulo dentro de `capture/` lee el flujo de bytes.
3. El módulo delega a `transport/` para estructurar la trama.
4. El mensaje estructurado se encola en `queue/`.
5. Un worker extrae mensajes de `queue/` y utiliza el cliente de `api/` para hacer POST al Observatorio.
6. Todos los eventos (recepciones, errores, envíos) se registran mediante `logging/`.

## 5. Expansión Futura
Al no acoplar el código a un solo proyecto monorepo ni compartir la base de código del dominio, el ecosistema puede crecer:
- Creando `go_gateway` para escenarios de muy alta concurrencia.
- Incorporando un `MQTT_gateway` que lea de un broker IoT corporativo.
- Manteniendo a `RF_Observatory` agnóstico a todos estos clientes; para el Observatorio, todo el universo externo se comporta igual.
