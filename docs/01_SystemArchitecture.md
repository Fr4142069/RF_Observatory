# 1. Introducción
Este documento define la arquitectura oficial del proyecto **RF_Observatory**. Su propósito es servir como la especificación técnica de referencia para el desarrollo, asegurando que todos los componentes del sistema mantengan un diseño consistente, escalable y mantenible a lo largo del tiempo.

# 2. Principios arquitectónicos
- **Modularidad:** El sistema está dividido en módulos lógicos que encapsulan funcionalidades específicas, permitiendo el desarrollo y actualización independiente.
- **Bajo acoplamiento:** Los componentes interactúan a través de interfaces bien definidas, minimizando las dependencias directas entre ellos.
- **Alta cohesión:** Cada módulo y clase dentro del sistema tiene una responsabilidad única y claramente delimitada.
- **Escalabilidad:** El diseño permite soportar un incremento en el volumen de datos (capturas y fingerprints) sin requerir rediseños fundamentales.
- **Mantenibilidad:** La estandarización del código y la separación estricta de capas facilita la lectura, pruebas y futuras modificaciones.

# 3. Arquitectura General
El sistema RF_Observatory se compone de los siguientes grandes bloques:
- **Backend:** Núcleo de procesamiento y reglas de negocio.
- **Frontend:** Interfaz de usuario para visualización, carga y consulta de datos.
- **Base de datos:** Motor relacional para la persistencia del modelo de dominio.
- **API:** Capa de comunicación RESTful que expone los servicios del sistema.
- **Almacenamiento de archivos:** Sistema para persistir evidencias físicas (archivos SARF o JSON).
- **Autenticación:** Mecanismo de validación de identidad para el acceso a la plataforma y la API.
- **Documentación:** Sistema integrado de referencia técnica y de API (Swagger/OpenAPI).

# 4. Diagrama general
```text
  [ Usuario / Investigador / Hardware (RF-LAB) ]
                       │
                       ▼
       +-------------------------------+
       |           Frontend            |
       |  (Interfaz Web React / Vite)  |
       +---------------+---------------+
                       │
                       ▼
       +-------------------------------+
       |             API               |
       |     (Endpoints RESTful)       |
       +---------------+---------------+
                       │
                       ▼
       +-------------------------------+
       |           Backend             |
       |   (Node.js / Express / TS)    |
       +-------+---------------+-------+
               │               │
               ▼               ▼
 +-------------------+   +-------------------+
 |  Base de Datos    |   | Almacenamiento    |
 |  (PostgreSQL)     |   | de Archivos       |
 +-------------------+   +-------------------+
```

# 5. Descripción de cada componente

### Frontend
- **Propósito:** Proveer la interfaz gráfica de usuario.
- **Responsabilidades:** Visualizar capturas, gestionar subidas, presentar estadísticas y clasificaciones.
- **Entradas:** Interacciones del usuario, respuestas JSON de la API.
- **Salidas:** Peticiones HTTP REST, renderizado de vistas.
- **Dependencias:** API REST externa.

### API (Capa de Enrutamiento)
- **Propósito:** Servir como única puerta de entrada al sistema.
- **Responsabilidades:** Validar esquemas, enrutar peticiones, manejar códigos de estado HTTP.
- **Entradas:** Peticiones HTTP (GET, POST, PUT, DELETE).
- **Salidas:** Respuestas HTTP (JSON), Códigos de error.
- **Dependencias:** Capa de Servicios del Backend.

### Backend (Servicios y Dominio)
- **Propósito:** Ejecutar la lógica de negocio y procesamiento de RF.
- **Responsabilidades:** Clasificar señales, procesar huellas (fingerprints), orquestar la persistencia.
- **Entradas:** DTOs validados desde la API.
- **Salidas:** Modelos de Dominio hacia la API, Entidades hacia Persistencia.
- **Dependencias:** Capa de Persistencia, Repositorios.

### Base de Datos
- **Propósito:** Persistencia estructurada a largo plazo.
- **Responsabilidades:** Almacenar relacionalmente el modelo de dominio garantizando integridad.
- **Entradas:** Consultas y mutaciones SQL.
- **Salidas:** Conjuntos de datos estructurados.
- **Dependencias:** Ninguna.

# 6. Flujo general del sistema
1. Se recibe un archivo de captura RF o un payload JSON a través del Frontend o directamente vía API.
2. La API valida la sintaxis de la petición y el formato del archivo.
3. El archivo es delegado al Backend, que extrae la huella digital (Fingerprint) y la metadata asociada.
4. El archivo físico se envía al Almacenamiento de archivos como evidencia.
5. El Backend consulta la Base de Datos para clasificar la captura contra los protocolos conocidos.
6. El resultado (Capture, Session, QualityReport) se persiste en la Base de Datos.
7. La API retorna el estado de la operación (Classification o DecoderResult) al cliente.

# 7. Tecnologías aprobadas
- **Node.js**: Entorno de ejecución para el servidor.
- **Express**: Framework web minimalista para el backend.
- **TypeScript**: Lenguaje tipado para todo el ecosistema (Frontend y Backend).
- **React**: Biblioteca para la construcción de interfaces de usuario.
- **Vite**: Empaquetador y entorno de desarrollo para el frontend.
- **Tailwind CSS**: Framework de utilidades para estilos.
- **PostgreSQL**: Motor de base de datos relacional.
- **Docker**: Plataforma de contenerización para el despliegue del ecosistema completo.

# 8. Separación por capas
- **Presentación:** Maneja exclusivamente la interfaz gráfica y la interacción con el usuario (React).
- **API:** Recibe tráfico externo, valida formatos y responde HTTP. No contiene lógica de negocio.
- **Servicios (Casos de Uso):** Contiene la lógica de aplicación, coordina transacciones y flujos de trabajo.
- **Dominio:** Alberga las entidades puras del sistema (Capture, Fingerprint) y las reglas de negocio más fundamentales. No tiene dependencias externas.
- **Persistencia:** Implementa los repositorios, traduciendo modelos de dominio a operaciones de base de datos (PostgreSQL).

# 9. Comunicación entre módulos
- La comunicación es estrictamente unidireccional hacia adentro: **Frontend -> API -> Servicios -> Dominio**.
- La capa de persistencia se inyecta mediante inversión de control, asegurando que el Dominio y los Servicios interactúen solo con interfaces y no con detalles de implementación (como queries de base de datos directas).
- Los módulos comparten información exclusivamente mediante estructuras de datos definidas (DTOs y Modelos de Dominio compartidos en el directorio `shared/`).

# 10. Escalabilidad
La arquitectura permite un crecimiento orgánico:
- Al ser Dockerizado, el Backend y la Base de datos pueden escalar de manera independiente.
- La separación entre Frontend y Backend (API REST) permite agregar nuevos clientes (ej. integraciones CLI o B2B) sin alterar la lógica de negocio.
- El diseño basado en dominio permite agregar nuevos modelos de protocolos RF sin afectar a los existentes, ya que los módulos operan sobre abstracciones de huellas digitales en lugar de reglas estáticas.

# 11. Restricciones
- **No modificar la estructura del proyecto:** Los directorios raíz establecidos son definitivos.
- **No mezclar responsabilidades:** Un servicio no debe conocer sobre HTTP; un enrutador no debe procesar reglas de negocio.
- **No acceder directamente a la base de datos desde el frontend:** Toda interacción debe realizarse obligatoriamente pasando a través de la API REST.
- **No duplicar lógica de negocio:** Si Frontend y Backend requieren la misma validación de modelos, esta debe definirse centralizadamente en el directorio `shared/`.
