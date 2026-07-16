# Historias de Usuario (User Stories)

## 1. Introducción
Este documento establece las necesidades funcionales oficiales de **RF_Observatory** desde la perspectiva de sus actores. Su propósito es traducir la teoría arquitectónica en requisitos de negocio ejecutables. Sirve como el puente que conecta el *Project Vision* (qué queremos lograr), el *Domain Model* (qué información manejamos), el *Workflow* (cómo fluye la información) y la *API* (cómo nos integramos), definiendo el contrato de funcionalidades que deberán implementar tanto el Frontend como el Backend.

## 2. Actores del sistema
De acuerdo con las definiciones arquitectónicas previas, el sistema reconoce cuatro perfiles formales:

- **Visitante (Invitado):**
  - *Descripción:* Cualquier persona o sistema no autenticado que accede a la plataforma pública.
  - *Objetivos:* Consultar el catálogo público de protocolos y capturas para investigación rápida.
  - *Responsabilidades:* Respetar las cuotas de acceso (rate limiting).
  - *Alcance:* Exclusivamente lectura pública.

- **Usuario Registrado:**
  - *Descripción:* Individuo autenticado que interactúa regularmente con el sistema aportando datos.
  - *Objetivos:* Subir sesiones, validar el estado de sus capturas y consultar resultados de decodificación de su propia información.
  - *Responsabilidades:* Garantizar que las capturas que sube son reales e incluyen metadatos verídicos.
  - *Alcance:* Lectura global, escritura sobre sus propios recursos.

- **Investigador:**
  - *Descripción:* Usuario avanzado (analista o ingeniero) especializado en la ingeniería inversa de señales.
  - *Objetivos:* Analizar similitudes, auditar evidencias crudas, crear protocolos y emitir validaciones de clasificación.
  - *Responsabilidades:* Aportar conocimiento riguroso y basar sus veredictos en evidencias físicas (Quality Reports).
  - *Alcance:* Lectura global profunda (archivos crudos), escritura de clasificaciones, creación de protocolos teóricos.

- **Administrador:**
  - *Descripción:* Mantenedor principal del observatorio.
  - *Objetivos:* Garantizar la salud del sistema, auditar comportamientos anómalos y gestionar la comunidad.
  - *Responsabilidades:* Proteger la plataforma del spam, resolver disputas de investigación y gestionar accesos.
  - *Alcance:* Control total sobre todos los datos y usuarios.

## 3. Objetivos de cada actor
- **Visitante:** Espera encontrar un diccionario mundial abierto que le indique rápidamente a qué tecnología corresponde un protocolo o modulación específicos.
- **Usuario Registrado:** Espera una herramienta donde pueda almacenar su trabajo empírico y recibir retroalimentación automática del sistema sobre sus capturas.
- **Investigador:** Busca un espacio de inteligencia colectiva donde disponga de herramientas de comparación masiva para descifrar el comportamiento de clústeres desconocidos.
- **Administrador:** Busca herramientas de supervisión que garanticen la escalabilidad y la pureza de los datos del repositorio, sin necesidad de manipular código.

## 4. Historias de Usuario
Todas las historias están redactadas estructuradamente bajo el patrón estándar de valor funcional. No determinan pantallas ni tecnologías.

## 5. Módulo de Capturas
- **HU-01 (Registro de Sesión)**
  - *Como* Usuario Registrado
  - *Quiero* subir un paquete de datos como una Sesión con múltiples Capturas
  - *Para* almacenar y analizar masivamente mis experimentos de laboratorio.
  - *Criterios de Aceptación:* La subida debe asociar un contexto a todas las capturas. Si un archivo está corrupto, la subida completa se aborta.

- **HU-02 (Consulta General)**
  - *Como* Visitante
  - *Quiero* buscar capturas públicas mediante metadatos (frecuencia, autor, fecha)
  - *Para* encontrar ejemplos de una señal específica.
  - *Criterios de Aceptación:* La búsqueda debe aplicar filtros cruzados. Solo se mostrarán capturas en estado "Publicada".

- **HU-03 (Visualización de Fingerprint)**
  - *Como* Investigador
  - *Quiero* inspeccionar las métricas de sincronización y anchos de pulso de un Fingerprint
  - *Para* entender físicamente cómo modula una captura.
  - *Criterios de Aceptación:* Los tiempos y anchos deben mostrarse en unidades lógicas. 

- **HU-04 (Comparación)**
  - *Como* Investigador
  - *Quiero* seleccionar dos capturas simultáneamente
  - *Para* comparar las discrepancias en sus Fingerprints o sus Payloads extraídos.
  - *Criterios de Aceptación:* El sistema debe mostrar un diferencial (delta) lógico entre las características de ambas.

## 6. Módulo de Protocolos
- **HU-05 (Consulta de Diccionario)**
  - *Como* Visitante
  - *Quiero* listar todos los Protocolos Conocidos y Desconocidos
  - *Para* informarme sobre las familias de señales soportadas por el observatorio.
  - *Criterios de Aceptación:* El listado debe mostrar la descripción teórica, y la cantidad de capturas asociadas a cada protocolo.

- **HU-06 (Evolución de Protocolo)**
  - *Como* Investigador
  - *Quiero* convertir un Protocolo Desconocido en un Protocolo Conocido
  - *Para* documentar formalmente una señal que la comunidad logró descifrar.
  - *Criterios de Aceptación:* Las capturas históricamente asociadas al protocolo desconocido deben reclasificarse y apuntar automáticamente a la nueva entidad documentada.

- **HU-07 (Creación Teórica)**
  - *Como* Investigador
  - *Quiero* registrar la teoría matemática de un protocolo nuevo (KnownProtocol)
  - *Para* que el sistema pueda comenzar a identificarlo en futuras capturas.
  - *Criterios de Aceptación:* Debe incluir rangos válidos, fabricante y reglas documentales.

## 7. Módulo de Clasificación
- **HU-08 (Revisión de Veredicto)**
  - *Como* Investigador
  - *Quiero* auditar la Clasificación de una captura
  - *Para* comprobar si el sistema generó un falso positivo.
  - *Criterios de Aceptación:* Debe existir acceso al historial completo de clasificaciones previas de esa misma captura.

- **HU-09 (Validación Experta)**
  - *Como* Investigador
  - *Quiero* forzar una nueva clasificación para una señal
  - *Para* corregir los algoritmos automáticos basados en mi conocimiento empírico.
  - *Criterios de Aceptación:* El veredicto del investigador reemplaza al del sistema automático, y deja registrado su autor para trazabilidad y auditoría.

- **HU-10 (Consulta de Historial)**
  - *Como* Usuario Registrado
  - *Quiero* ver cómo ha cambiado la identidad de mi captura
  - *Para* entender cómo ha evolucionado el análisis sobre mis datos.
  - *Criterios de Aceptación:* Mostrar los estados (Validada, Clasificada, Archivada) de la captura en una línea de tiempo cronológica.

## 8. Módulo de Evidencias
- **HU-11 (Auditoría Cruda)**
  - *Como* Investigador
  - *Quiero* descargar o visualizar el archivo crudo original de la evidencia
  - *Para* reprocesarlo en mis propias herramientas de laboratorio locales.
  - *Criterios de Aceptación:* La descarga debe proveer el archivo exacto inalterado (bit-perfect).

- **HU-12 (Consulta de Calidad)**
  - *Como* Usuario Registrado
  - *Quiero* consultar el QualityReport de mis evidencias
  - *Para* saber si mi equipo de captura está inyectando demasiado ruido.
  - *Criterios de Aceptación:* El reporte debe indicar la relación señal-ruido y por qué fue o no procesable.

## 9. Administración
- **HU-13 (Gestión de Perfiles)**
  - *Como* Administrador
  - *Quiero* promover a un Usuario Registrado al rol de Investigador
  - *Para* otorgarle permisos de clasificación avanzada y evolución de protocolos.
  - *Criterios de Aceptación:* Los cambios de perfil deben ser retroactivos respecto a los permisos de lectura, pero no alteran los orígenes de autoría.

- **HU-14 (Auditoría Global)**
  - *Como* Administrador
  - *Quiero* revisar un registro (log) inmutable de clasificaciones reclasificadas
  - *Para* detectar investigadores que puedan estar introduciendo datos erróneos intencionalmente.
  - *Criterios de Aceptación:* El sistema debe exponer autor, fecha, y el protocolo asignado en cualquier cambio destructivo o reclasificación.

## 10. Restricciones funcionales
De acuerdo al Modelo de Dominio y la Arquitectura, se aplican inexorablemente las siguientes limitaciones de negocio:
- Un usuario no puede borrar sus evidencias físicas; la información del observatorio es estrictamente histórica.
- Las capturas generadas por otros usuarios no pueden ser borradas ni por Investigadores ni por Administradores, solo pueden ser catalogadas como Inválidas.
- Las consultas que no poseen un QualityReport aprobatorio no son visibles públicamente (para Invitados), para mantener puro el diccionario global.

## 11. Prioridad
Las Historias de Usuario se implementarán de acuerdo con su importancia estratégica:
- **Imprescindibles:** HU-01 (Registro), HU-02 (Consulta), HU-11 (Auditoría Cruda), HU-05 (Consulta Diccionario). Constituyen la base operativa del Workflow.
- **Importantes:** HU-07 (Creación Teórica), HU-09 (Validación Experta), HU-12 (Consulta de Calidad). Le dan vida al motor de investigación de Protocolos.
- **Deseables:** HU-04 (Comparación), HU-10 (Historial), HU-14 (Auditoría Global). Agregan valor analítico pero no bloquean la funcionalidad inicial.

## 12. Trazabilidad
Este documento depende de y cumple con los siguientes manifiestos:
- **Project Vision:** Protege que los actores mantengan la neutralidad tecnológica y respeten que el sistema no es un emisor/clonador (No existe historia de clonación).
- **Architecture:** Separa responsabilidades entre perfiles de solo-lectura y escritura.
- **Domain Model:** Las historias operan estrictamente sobre las entidades `Capture`, `Protocol`, `Evidence` y `Classification`.
- **Workflow:** Los estados "Archivado", "Validada" y "Clasificada" de las HU reflejan los hitos descritos en los diagramas de flujo operativos.
- **RF Classification:** Las HU de reclasificación validan el soporte conceptual del motor dinámico del observatorio.

## 13. Resumen
Las Historias de Usuario descritas transforman todas las definiciones teóricas del sistema en reglas y flujos tangibles. Estas especificaciones demuestran que RF_Observatory prioriza la apertura de datos y el análisis de huellas dactilares sobre el control privativo, brindando funcionalidades robustas a los analistas, al tiempo que mantiene un catálogo público limpio e inmutable. Este documento dictará qué endpoints debe construir la API y qué vistas debe consumir el Frontend, garantizando que todo desarrollo técnico tenga un origen de negocio comprobable.
