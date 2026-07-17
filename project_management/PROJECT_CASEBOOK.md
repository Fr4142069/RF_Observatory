# Diario de Ingeniería (Project Casebook)

**Objetivo:** Este documento constituye el historial técnico permanente del proyecto **RF_Observatory**. No es un changelog comercial ni un registro de commits funcionales diarios, sino un diario de ingeniería metodológica que asienta las decisiones importantes de negocio, soluciones, lecciones aprendidas, bloqueos y alteraciones arquitectónicas aprobadas a lo largo de los Sprints.

---

### [2026-07-15] - Sprint 3 (Kickoff)
**Descripción:** Decisión de Arquitectura DA-004. RF_Observatory utilizará PostgreSQL como motor de base de datos, Prisma ORM (Prisma Migrate y Prisma Client) como capa de persistencia y Docker como infraestructura subyacente. El Dominio permanecerá completamente desacoplado de Prisma mediante el uso de interfaces Repository, materializando el principio de Inversión de Dependencias (Clean Architecture). Además, Prisma materializará el diseño relacional pero NO gobernará el diseño; se aplicará una traducción 1:1 desde el Dominio hacia el esquema.
**Impacto:** Crítico. Congela el stack tecnológico para toda la versión 1.x del proyecto e imposibilita que la base de datos corrompa las reglas del negocio, permitiendo reemplazar o "mockear" la DB a futuro.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-005. "Estrategia de Despliegue Diferido". El despliegue de infraestructura física (PostgreSQL, Migraciones Prisma) no se ejecutará de forma parcial ni local durante el Sprint. Todo el código del Sprint se desarrolla, prueba y audita primero. Al cerrar el Sprint, se realiza una sesión única de "Deployment" directamente en el entorno oficial (VPS `iotsys.cloud`). 
**Impacto:** Crítico. Evita duplicidad de trabajo (crear base local y luego base remota) y consolida a la PC local exclusivamente como entorno de desarrollo abstracto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-006. "La Persistencia es reemplazable". Ninguna porción del Dominio conocerá cómo se almacenan los datos. Todo el acceso a datos se realizará exclusivamente a través de Repository Interfaces que pertenecerán a la capa de Dominio. Si en el futuro se reemplaza PostgreSQL/Prisma por otro motor (ej. MongoDB, Supabase), el Dominio no sufrirá ninguna modificación.
**Impacto:** Crítico. Es el pilar fundamental de Clean Architecture en este proyecto, asegurando independencia tecnológica absoluta a largo plazo.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-007. "Flujo Oficial de Dependencias". El ensamblaje de la aplicación obedecerá estrictamente la jerarquía Inversa: Infrastructure -> Composition Root -> Application Layer -> Domain. Nunca al revés. Toda dependencia concreta se resolverá exclusivamente y por única vez en el Composition Root (Ensamblador central).
**Impacto:** Crítico. Impide el esparcimiento de `new PrismaClient()` o instancias espagueti, concentrando la materialización de componentes físicos en un único punto del sistema y facilitando el testing integral.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-008. "Auditoría obligatoria de cierre". Ningún Sprint se considerará terminado únicamente porque el código compile o las funcionalidades existan. Todo Sprint debe finalizar con una secuencia inmutable: Desarrollo -> Revisión -> Auditoría Arquitectónica -> Corrección -> Cierre Documental.
**Impacto:** Crítico. Evita institucionalizar la deuda técnica. Mantiene la salud de la arquitectura asegurando que las presiones de tiempo no corrompan los estándares de calidad del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Arquitectura DA-009. "Política de Cierre de Sprint". Todos los Sprints cumplirán el ciclo: Kickoff -> TASKS -> Auditoría Técnica -> Correcciones -> SPRINT_CLOSEOUT -> Arquitectura Congelada. Una vez emitido el CLOSEOUT, el Sprint queda cerrado de forma inmutable. Cualquier refactorización o mejora futura será tratada como una nueva tarea en Sprints posteriores, nunca reabriendo el pasado.
**Impacto:** Crítico. Convierte el avance del proyecto en un histórico trazable, seguro y auditable. Permite que cualquier equipo herede el proyecto sin ambigüedades.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-010. "Casos de Uso como Unidad Funcional". El backend no se modelará alrededor de tablas ni CRUDs genéricos. El sistema estará modelado exclusivamente alrededor de acciones de negocio (Ej. "Registrar captura", "Clasificar trama", "Asociar evidencias").
**Impacto:** Crítico. Define la filosofía de la Application Layer. Elimina los Controladores y Servicios CRUD anémicos, sustituyéndolos por Comandos y Casos de Uso expresivos que reflejan el trabajo real de un ingeniero de RF.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-011. "Un Caso de Uso representa una intención del usuario". Cada archivo dentro de `usecases/` deberá responder estrictamente a la pregunta "¿Qué intenta hacer el usuario?" y no a interrogantes técnicas u operacionales relativas a bases de datos. 
Además, se adopta formalmente la nomenclatura funcional para el rastreo del proyecto: las tareas y Casos de Uso emplearán identificadores descriptivos (ej. `TASK-001 – Application Layer Architecture`, `UC-001 – RegisterCapture`) para elevar la semántica y legibilidad a largo plazo.
**Impacto:** Crítico. Refuerza el diseño CQS (Command Query Separation) y promueve una trazabilidad humana (no solo mecanizada) del histórico del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-012. "Los DTO son contratos, no modelos". Un DTO no representa una entidad del sistema ni una tabla de base de datos. Representa exclusivamente la información mínima necesaria para intercambiar datos en una operación (Caso de Uso) específica. Si la entidad interna cambia, el DTO no tiene por qué cambiar, garantizando independencia entre el modelo de negocio y las interfaces (APIs) externas.
**Impacto:** Crítico. Protege el Dominio de las modificaciones de la API y viceversa. Erradica la peligrosa práctica de propagar la estructura de la base de datos hacia el exterior (leak de infraestructura).
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-013. "Política de Versionado y Control de Código". Se abandona la nomenclatura M[X].RC[Y] en favor de **SemVer** puro (vX.Y.Z) y **Conventional Commits**. Cada cierre de Sprint mayor generará un incremento MINOR (Y) y un Tag oficial. El historial de Git debe ser un reflejo semántico de la evolución arquitectónica, vinculando Sprints como Epics.
**Impacto:** Crítico. Estandariza la trazabilidad del código fuente, facilitando despliegues automáticos (CI/CD), generación de changelogs y legibilidad inter-equipos a largo plazo.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-014. "Un Caso de Uso debe ser pequeño y completo". Los Casos de Uso no representan pantallas ni operativas mecánicas, representan **capacidades del sistema** aisladas del mecanismo de entrada (REST, CLI, IA). Cada Use Case resolverá **una única intención del usuario**, se probará aisladamente (con mocks) y, si empieza a tener múltiples responsabilidades, deberá dividirse.
**Impacto:** Crítico. Garantiza el Principio de Responsabilidad Única (SRP) en la Application Layer y prepara el sistema para arquitecturas hexagonales puras, impidiendo que el motor de procesamiento se acople a frameworks o interfaces públicas.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-015. "La inteligencia pertenece al Dominio". Los algoritmos que determinan cómo se clasifica una señal RF, cálculos de fingerprints, inferencias o análisis estadísticos no vivirán en la Application Layer. La Application Layer exclusivamente coordina flujos. El Dominio razona.
**Impacto:** Crítico. Protege el núcleo del proyecto. Permite cambiar o expandir los motores de IA y algoritmos heurísticos futuros de RF_Observatory modificando solo el Dominio, sin alterar en absoluto los Casos de Uso, APIs ni CLI.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-016. "El Fingerprint es el activo principal de RF_Observatory". El objetivo primario del sistema no es almacenar capturas, sino transformar esa materia prima en conocimiento reutilizable (Fingerprints). El Fingerprint es la unidad semántica que permite comparar, relacionar y agrupar la información técnica, desplazando a la captura y a los protocolos como el núcleo real de valor del observatorio.
**Impacto:** Crítico. Altera la prioridad del diseño y la hoja de ruta (Roadmap). Todos los casos de uso avanzados (asociar evidencias, comparar, publicar, buscar) orbitarán alrededor de la existencia de un Fingerprint consolidado.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-017. "La evidencia nunca modifica el conocimiento". Una Evidencia no altera un Fingerprint ni una Classification. Únicamente respalda, documenta o incrementa el nivel de confianza de la información existente. Si una evidencia descubierta fuerza a corregir una clasificación previa, ese cambio deberá ocurrir mediante un Caso de Uso independiente (Ej. ReclassifyCapture), garantizando la inmutabilidad histórica.
**Impacto:** Crítico. Establece el límite de responsabilidad de las evidencias, previniendo efectos colaterales en cascada. Fomenta el diseño de flujos anexos para correcciones, preservando la trazabilidad.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4 (Fase de Consolidación)
**Descripción:** Decisión de Arquitectura DA-018. "El conocimiento antes que el algoritmo". RF_Observatory no comparará señales basándose puramente en un algoritmo de turno, sino que comparará basándose en un modelo formal de conocimiento. Antes de programar motores de inferencia o búsqueda (UC-005), debe existir una definición estricta de qué es un Fingerprint, qué significa Similitud (exacta, parcial, familia) y cómo se mide la Confianza.
**Impacto:** Crítico. Protege al UC-005 de convertirse en un script difícil de mantener. Permite que el motor de comparación en el Dominio escale desde heurísticas simples hasta IA sin cambiar el modelo conceptual.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4 (Fase de Consolidación)
**Descripción:** Decisión de Arquitectura DA-019. "Las especificaciones son parte del código". Ciertos documentos en `docs/` (como `14_FingerprintSpecification.md`, `15_SimilarityModel.md`, etc.) tienen un valor normativo absoluto, superior al código. Si un algoritmo contradice la especificación, el error radica en el algoritmo, no en el documento.
**Impacto:** Crítico. Convierte a RF_Observatory en un lenguaje y metodología estandarizada. Permite que futuros desarrolladores o módulos (incluso externos) interactúen o reemplacen motores del sistema simplemente cumpliendo la especificación.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4 (Fase de Consolidación)
**Descripción:** Decisión de Arquitectura DA-020. "La similitud es multidimensional". Dos señales RF nunca serán consideradas similares por una sola característica. La comparación siempre evaluará conjuntamente múltiples dimensiones (Frecuencia, Modulación, Tiempos, Relación ON/OFF, etc.).
**Impacto:** Alto. Garantiza que el futuro motor de inferencia (UC-005) no emita falsos positivos simplistas, obligando a los algoritmos a ponderar distintos vectores antes de dictaminar compatibilidad.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4 (Fase de Consolidación)
**Descripción:** Decisión de Arquitectura DA-021. "La confianza es evidencia acumulada, no una opinión". La confianza en RF_Observatory no es un veredicto ciego de un algoritmo o una IA. Es una métrica auditable, explicable y puramente trazable que solo muta debido a la adición o invalidación de respaldo técnico formal (evidencias, capturas repetidas, intervenciones humanas). Todo score de confianza debe poder justificar "de dónde" provino ese cálculo.
**Impacto:** Crítico. Protege la base científica del sistema y destierra el fenómeno de "caja negra" propio del Machine Learning tradicional. Permite a los investigadores auditar el razonamiento del sistema en retrospectiva.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4 (Fase de Consolidación)
**Descripción:** Decisión de Arquitectura DA-022. "El Pipeline es estable; los motores evolucionan". El Pipeline de comparación (Reception, Validation, Preparation, Comparison, Similarity Eval, Confidence Eval, Persistence) define *qué* etapas ocurren y en qué orden. Los motores (heurístico, ML, estadístico) definen *cómo* se ejecutan. El Pipeline es inmutable y normativo; los motores son plugins intercambiables.
**Impacto:** Alto. Evita que la introducción de un nuevo motor de IA destruya o reemplace la lógica de flujo del sistema. Permite la coexistencia de múltiples algoritmos.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-023. "El motor de comparación es el núcleo estratégico de RF_Observatory". UC-005 constituye la única puerta oficial para comparar conocimiento dentro del sistema. Ningún módulo periférico deberá comparar Fingerprints por su cuenta; toda comparación debe fluir por el Pipeline centralizado, respetando los Modelos de Similitud y Confianza.
**Impacto:** Crítico. Garantiza consistencia, trazabilidad de auditoría unificada y facilita la evolución del motor interno sin causar regresiones ni efectos secundarios en el resto del ecosistema.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-024. "Un KnownProtocol representa conocimiento validado". Un protocolo conocido no es ni un Fingerprint ni una Captura; es una abstracción superior que catalogiza familias de comunicaciones RF validadas. Un Fingerprint puede asociarse a un KnownProtocol, pero jamás convertirse en uno.
**Impacto:** Alto. Separa ontológicamente la materia prima (Fingerprint observado) del estándar documentado (Protocolo validado), permitiendo versionar protocolos aunque no se tenga aún un decodificador.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-025. "Publicar significa certificar". Promover un KnownProtocol al estado 'Published' significa exclusivamente que el protocolo ha superado el proceso interno de validación del RF_Observatory (requisitos mínimos de evidencias y fingerprints). No implica publicación web, liberación de código ni sincronización externa.
**Impacto:** Crítico. Evita acoplar la madurez del conocimiento a la infraestructura de presentación pública. Mantiene a RF_Observatory como una fuente de verdad agnóstica de su frontend.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-026. "La búsqueda consulta conocimiento, no tablas". UC-008 no es un buscador SQL tradicional, sino el portal oficial de consultas agnósticas de la Base de Conocimiento. El DTO de búsqueda (SearchCriteria) abstrae al usuario de la estructura relacional subyacente y permite el retorno de entidades heterogéneas (Protocolos, Capturas, Evidencias).
**Impacto:** Crítico. Asegura que el sistema pueda evolucionar a motores de búsqueda vectoriales (IA) o ElasticSearch en el futuro sin modificar la Capa de Aplicación ni los clientes consumidores.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Arquitectura DA-027. "Auditar antes de corregir". Una auditoría debe describir el estado del sistema, no modificarlo. Cualquier hallazgo o no conformidad encontrada durante una auditoría arquitectónica debe registrarse primero. Solo después de aprobada el acta de auditoría se procede a la fase de corrección.
**Impacto:** Alto. Evita que la auditoría oculte deuda técnica bajo correcciones improvisadas y mantiene una trazabilidad transparente de la evolución del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 4
**Descripción:** Decisión de Metodología DA-028. "Ningún Sprint termina sin un cierre formal". Un Sprint no se considera finalizado cuando el código compila ni cuando las tareas están marcadas como completas. Finaliza únicamente cuando existe un documento de cierre aprobado que certifica el estado alcanzado, las decisiones tomadas y las condiciones para continuar.
**Impacto:** Crítico. Protege la memoria a largo plazo del proyecto. Garantiza que futuros ingenieros (humanos o IA) puedan heredar el contexto exacto en el que finalizó un hito sin requerir lectura arqueológica del código.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-030. "La API REST nunca contendrá lógica de negocio". Los Controllers únicamente actúan como fachada: reciben HTTP, convierten la petición en DTOs, invocan a los Casos de Uso (Application Layer) y envuelven la respuesta en un formato HTTP estandarizado. Toda decisión, mutación o regla de validación de negocio seguirá viviendo estrictamente en la Capa de Aplicación y en el Dominio.
**Impacto:** Crítico. Preserva el aislamiento del Knowledge Engine conseguido en el Sprint 4. Permite que en el futuro se puedan crear interfaces GraphQL, CLI o gRPC compartiendo exactamente el mismo núcleo orquestal sin duplicar lógica.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-031. "Las fronteras traducen, nunca deciden". Los Controllers actúan exclusivamente como traductores bidireccionales entre el protocolo de transporte (HTTP) y el lenguaje del negocio (Application Layer). No toman decisiones, no conocen el Dominio (solo interactúan a través de DTOs) y no poseen lógica condicional de negocio. Su único flujo es: `HTTP -> DTO -> UseCase -> ResponseDTO -> HTTP`.
**Impacto:** Crítico. Elimina el riesgo de "Fuga de Dominio", asegurando que conceptos como `Request`, `Response` o `next` de Express jamás penetren en los Casos de Uso.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-032. "HTTP es reemplazable". La Application Layer no debe tener forma de distinguir si fue invocada por una petición HTTP REST, una mutación GraphQL, una llamada gRPC, un job CRON, una cola RabbitMQ, un comando CLI o una prueba unitaria.
**Impacto:** Estratégico. Garantiza la extrema longevidad del sistema. Si los protocolos de comunicación cambian en el futuro, solo será necesario programar nuevos "Adaptadores/Controladores" sin tocar ni una línea del Knowledge Engine.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-033. "Los errores son contratos, no textos". Toda respuesta de error de RF_Observatory deberá seguir un modelo único, estable y predecible. Los clientes consumirán códigos constantes y estructuras uniformes, erradicando los mensajes libres disonantes entre distintos endpoints.
**Impacto:** Alto. Simplifica el consumo de la API, previene que los clientes se rompan ante redacciones de texto diferentes y estandariza la comunicación.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-034. "El código identifica; el mensaje explica". Las aplicaciones cliente deben tomar decisiones lógicas (if/else/switch) basándose exclusivamente en el campo `code` de la respuesta de error (ej: `KNOWN_PROTOCOL_NOT_FOUND`). Nunca se deberá interpretar el texto de los campos `title` o `detail`.
**Impacto:** Alto. Permite la futura internacionalización (i18n) de los mensajes de error sin romper las integraciones de los clientes.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-035. "Toda respuesta exitosa tiene la misma forma". Toda operación exitosa de RF_Observatory deberá responder utilizando un único contrato REST oficial. Queda prohibido devolver arrays u objetos desnudos en la raíz de la respuesta HTTP. El formato universal requiere un envoltorio con `timestamp`, `requestId`, `success`, `data` y `meta`.
**Impacto:** Alto. Estandariza el consumo de la API. Cualquier cliente o parser construido para la API podrá ingerir la respuesta sin importar el endpoint consultado.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-036. "El contrato HTTP es estable". Una vez publicado el contrato oficial de respuestas REST, cualquier cambio incompatible (eliminar o renombrar campos base) requerirá obligatoriamente un cambio mayor de versión de la API (ej: de v1 a v2). Solo se permite añadir campos opcionales sin incrementar la versión mayor.
**Impacto:** Estratégico. Genera una garantía de compatibilidad hacia atrás y protege las integraciones B2B o el desarrollo de aplicaciones cliente descentralizadas.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-037. "Existe un único Composition Root". Toda la composición de objetos del sistema deberá realizarse en un único lugar lógico (Composition Root). Ningún Controller instanciará un Use Case, y ninguna Ruta instanciará un Controller. La inyección se hace manualmente de arriba hacia abajo para evitar acoplamiento oculto.
**Impacto:** Crítico. Mantiene la pureza de la inversión de dependencias y facilita la migración a un contenedor IoC automático si el proyecto crece a gran escala.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-038. "La composición ocurre una sola vez". El sistema ensamblará su grafo de objetos (Repositorios -> Use Cases -> Controllers -> Routes) exactamente una vez durante el arranque de la aplicación (Bootstrap). A partir de ese momento, el grafo es inmutable y ninguna capa puede crear nuevas dependencias estructurales en tiempo de ejecución.
**Impacto:** Alto. Garantiza que la arquitectura se comporte de manera determinista y facilita enormemente el testing unitario y de integración.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-039. "Los Controllers no formatean respuestas". Un Controller nunca construirá manualmente un JSON de respuesta ni un JSON de error. Todo Controller deberá utilizar un `ResponseFactory` y un `ErrorFactory` para estructurar la salida HTTP, garantizando la uniformidad absoluta definida en los contratos REST.
**Impacto:** Alto. Evita que la construcción del payload de respuesta mute a lo largo de los endpoints. Reduce la duplicación de código en los controladores.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-040. "La infraestructura es reutilizable". Toda la infraestructura HTTP deberá ser completamente reutilizable entre controladores. Ningún Controller podrá implementar por sí mismo mecanismos de respuesta, manejo de errores, generación de RequestId o comportamiento transversal (cross-cutting concerns).
**Impacto:** Estratégico. Habilita que futuros endpoints se implementen rápidamente sin repetir lógicas estructurales (DRY).
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-041. "El primer endpoint define el estándar". El primer endpoint implementado (POST /captures) servirá como referencia oficial de calidad, estructura y organización (Controller, DTO, Validator, Route, Bootstrap, Factories) para todos los endpoints futuros. No es un ejemplo, es el estándar.
**Impacto:** Alto. Garantiza que todos los desarrollos subsecuentes hereden un patrón idéntico y probado.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Metodología DA-042. "No se replica un patrón sin auditarlo". Todo patrón arquitectónico nuevo deberá implementarse una única vez y ser auditado rigurosamente antes de replicarse en el resto del sistema.
**Impacto:** Crítico. Reduce drásticamente la deuda técnica al impedir que un error estructural o un anti-patrón se multiplique a través de múltiples controladores o módulos.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Metodología DA-043. "Un endpoint se certifica ejecutándolo". Ningún endpoint podrá convertirse en patrón oficial únicamente por revisión estática de código. Deberá superar pruebas funcionales ejecutándose sobre un servidor real (verificando códigos HTTP, envoltorios de error, etc.). La arquitectura se inspecciona; el comportamiento se demuestra.
**Impacto:** Crítico. Evita aprobar "teorías arquitectónicas" que en la práctica explotan o no respetan el estándar JSON acordado.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Metodología DA-044. "La primera implementación certificada se convierte en referencia". Una vez que el primer endpoint supere satisfactoriamente la auditoría estática y funcional, quedará declarado como "Endpoint de Referencia". Todo nuevo endpoint deberá clonar exactamente el mismo patrón estructural, erradicando los "estilos personales".
**Impacto:** Alto. Garantiza que, a lo largo de los años, toda la API mantenga un único lenguaje coherente.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-045. "Las búsquedas complejas son comandos de consulta". Toda búsqueda que admita múltiples filtros, estructuras complejas o criterios combinados (como Search) deberá implementarse mediante POST con un objeto de criterios en el body, y no mediante GET con query params. RF_Observatory es un motor de investigación, no un CRUD simple.
**Impacto:** Alto. Permite estructurar consultas complejas JSON (ej. `confidence: { min: 0.85 }`) sin ensuciar la URL, promoviendo claridad en las peticiones.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-046. "Los algoritmos de comparación son reemplazables". El endpoint nunca debe conocer el algoritmo de comparación, delegando toda esa inferencia al Use Case correspondiente. 
**Impacto:** Alto. Garantiza que la evolución a futuros motores de inferencia (IA, ML) no exija reescritura de APIs ni controladores.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-047. "La similitud es una evidencia, no una verdad". El observatorio es un laboratorio; nunca dictará "X es Y". En su lugar, emitirá evidencia cuantificada (Similarity, Confidence, Tier, Matched Features). 
**Impacto:** Crítico. Preserva el rigor científico y delega la decisión final al investigador/usuario.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-048. "Los resultados científicos son reproducibles". Todo resultado emitido por el endpoint de comparación deberá poder reproducirse de manera determinista utilizando exactamente las mismas entradas (algoritmo, configuración, capturas).
**Impacto:** Estratégico. Eleva el sistema al nivel de un verdadero instrumento de investigación científica, permitiendo auditorías y trazabilidad de inferencias.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-049. "El conocimiento es gobernado". Ningún protocolo conocido podrá incorporarse a la Base de Conocimiento oficial sin pasar por un proceso explícito de gobernanza y revisión. No todo lo observado es automáticamente un protocolo; existe un embudo estricto: Observación -> Hipótesis -> Protocolo Conocido -> Protocolo Publicado.
**Impacto:** Crítico. Establece que RF_Observatory no es un mero log de señales, sino un ente que certifica descubrimientos científicos.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-050. "Publicar no es registrar". Son etapas distintas del ciclo de vida. Registrar (UC-006) significa proponer un protocolo (editable, mudable). Publicar (UC-007) significa certificarlo y congelarlo como conocimiento institucional (citable, inmutable, exportable).
**Impacto:** Alto. Impone el control de estados y abre la puerta a futuras capacidades de versionado, revisión por pares y trazabilidad.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-051. "La API expresa acciones de negocio". Los endpoints de RF_Observatory deberán representar acciones del dominio (RPC style / verbos de negocio como `POST /compare` o `POST /publish`) y no operaciones CRUD genéricas (PUT/PATCH/DELETE) que no explican qué está ocurriendo semánticamente.
**Impacto:** Crítico. Evita la mentalidad de "gestor de base de datos" en favor de una API de investigación.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Arquitectura DA-052. "Search nunca consulta tablas". Toda búsqueda (UC-008) consulta el modelo de conocimiento del Observatorio, no filas de una base de datos.
**Impacto:** Alto. Abstrae la persistencia por completo. Si en el futuro RF_Observatory usa Elasticsearch o Vector DBs, el endpoint de Search permanece inmutable.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 5
**Descripción:** Decisión de Metodología DA-053. "La integración completa se certifica antes del cierre". Antes de declarar finalizado un Sprint que introduzca capacidades accesibles mediante API, deberá ejecutarse al menos un flujo funcional completo de extremo a extremo (E2E) utilizando únicamente interfaces públicas (Endpoints).
**Impacto:** Estratégico. Garantiza que no existan eslabones rotos en la cadena operativa del Observatorio.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-15] - Sprint 13
**Descripción:** Decisión de Ingeniería DI-001. "Todas las migraciones de RF_Observatory serán reproducibles desde cero". Cualquier desarrollador o entorno deberá poder levantar la base de datos de cero ejecutando únicamente las migraciones versionadas de Prisma. Quedan terminantemente prohibidos los cambios manuales en la base de datos que no estén reflejados en una migración oficial.
**Impacto:** Crítico. Asegura la portabilidad inter-entornos (Desarrollo, Pruebas, Producción) y erradica el "drift" (desvío) del esquema a lo largo de los años de vida del proyecto.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Ingeniería DI-002. "Cada proyecto será autosuficiente en Docker". RF_Observatory mantendrá su propia infraestructura Docker aislada (`docker-compose.yml`), al igual que SmartAccess mantendrá la suya. La integración inter-proyectos será exclusivamente a nivel de interfaces/servicios (API). Quedan prohibidos los monolitos de infraestructura (super docker-compose).
**Impacto:** Alto. Garantiza que RF_Observatory sea desplegable de forma totalmente autónoma, modular y mantenible.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 3
**Descripción:** Decisión de Ingeniería DI-003. "La base de datos nunca será la fuente de verdad". Se establece el flujo unidireccional obligatorio: Domain Model -> Relational Model -> schema.prisma -> Prisma Migrate -> PostgreSQL. Queda taxativamente prohibido alterar las tablas de forma manual para luego adaptar el dominio. El Dominio es la autoridad absoluta; la base de datos es un mero detalle de implementación.
**Impacto:** Crítico. Protege la arquitectura a largo plazo, impidiendo que los caprichos del motor relacional dicten o fuercen cambios en las reglas del negocio.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-15] - Sprint 1
**Descripción:** Corrección arquitectónica temprana ("Regularización TASK-001"). Durante la inicialización técnica inicial del proyecto, se configuró el Backend asumiendo erróneamente una arquitectura de "ejecución local nativa". Se detectó el riesgo, se detuvo la ejecución y se corrigió documentalmente el enfoque hacia una orquestación centralizada en Docker.
**Impacto:** Crítico. Evitó anclar el ecosistema técnico localmente al sistema operativo Windows. Definió tempranamente la regla inmutable de que Backend, Frontend y Persistencia deben ser desarrollados asumiendo un entorno contenerizado dentro de `iotsys.cloud`.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 6
**Descripción:** Decisión de Arquitectura DA-055. "Validaciones de infraestructura sobre la tecnología objetivo". Las pruebas de integración y persistencia deberán ejecutarse utilizando la misma tecnología que será empleada en producción, salvo que exista una justificación técnica documentada y aprobada. No se utilizará SQLite para simular PostgreSQL.
**Impacto:** Crítico. Evita caer en el clásico problema de "funcionaba en desarrollo/SQLite pero falló en producción/PostgreSQL". Mantiene la integridad de las pruebas de infraestructura.
**Estado:** Resuelto y Aprobado.

---

### [2026-07-16] - Sprint 6
**Descripción:** Decisión de Arquitectura DA-056. "Los proyectos colaboran mediante contratos públicos". Ningún proyecto puede importar código fuente de otro proyecto para reutilizar lógica de negocio. La colaboración entre RF_Gateway y RF_Observatory se realizará exclusivamente mediante contratos públicos (HTTP, OpenAPI o protocolos definidos), preservando la independencia de ambos ciclos de vida.
**Impacto:** Crítico. Permite que RF_Observatory evolucione sin obligar a recompilar el Gateway, habilita la sustitución del Gateway por otras implementaciones (ej. Go o Rust) y posibilita múltiples gateways consumiendo la misma API, evitando el acoplamiento entre proyectos.
**Estado:** Resuelto y Aprobado.

---
*(Nuevas anotaciones deberán reflejarse en este documento en orden cronológico descendente, registrando de manera rigurosa Fecha, Sprint, Descripción, Impacto y Estado).*
