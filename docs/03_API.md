# Especificación de la API REST

## 1. Introducción
Este documento define la especificación conceptual y oficial de la API de **RF_Observatory**. Su objetivo es establecer el contrato de comunicación estricto entre el Backend y cualquier cliente (Frontend web, herramientas de terceros, etc.). El diseño de esta API es un reflejo directo del Modelo de Dominio, exponiendo las entidades y casos de uso aprobados sin filtrar detalles de implementación de la base de datos o lógica interna.

## 2. Principios de la API
La arquitectura de comunicación se rige por los siguientes principios fundamentales:
- **API REST:** Orientada a recursos y basada en estándares arquitectónicos representacionales.
- **JSON:** Intercambio de datos estandarizado en formato JSON para todas las peticiones y respuestas (salvo transferencia de archivos binarios).
- **Stateless:** Cada solicitud del cliente debe contener toda la información necesaria para ser comprendida y procesada; el servidor no almacenará estado conversacional.
- **Versionada:** La evolución del contrato está garantizada sin romper la compatibilidad con clientes existentes.
- **Consistente:** La estructura de respuestas, errores y convenciones de URL es uniforme a lo largo de todos los recursos.
- **Documentable:** Diseñada para ser autocontenida y compatible con futuras herramientas de generación de documentación estándar.

## 3. Convenciones
Para asegurar la previsibilidad de las interacciones, se aplicarán las siguientes reglas:
- **Versionado:** El sistema soportará control de versiones explícito para prever cambios drásticos.
- **Formato de fechas:** Todos los sellos de tiempo utilizarán el estándar ISO 8601 en formato UTC (ej. `YYYY-MM-DDThh:mm:ssZ`).
- **Codificación:** Obligatoriamente UTF-8 en todas las transferencias de texto.
- **Paginación:** Las colecciones de recursos implementarán paginación basada en compensación o cursores (offset/limit) para proteger el rendimiento del servidor.
- **Ordenamiento:** Las consultas a colecciones permitirán ordenar resultados mediante parámetros estandarizados ascendentes y descendentes.
- **Filtros:** Se proveerá un mecanismo uniforme de paso de parámetros de búsqueda para filtrar colecciones basándose en los atributos del dominio.
- **Formato de errores:** Todos los errores retornarán un esquema predecible de datos y no simples mensajes de texto.

## 4. Recursos principales
La API expondrá interacciones en torno a los siguientes recursos primarios (alineados con el Modelo de Dominio):
- **Sesiones:** Agrupaciones temporales y contextuales de eventos.
- **Capturas:** Registros inmutables de señales de radiofrecuencia individuales.
- **Evidencias:** Archivos binarios crudos (SARF, I/Q) que respaldan una captura.
- **Fingerprints:** Extracciones matemáticas y patrones temporales de las señales.
- **Protocolos (Conocidos y Desconocidos):** Diccionarios teóricos y estándares contra los cuales se comparan las capturas.
- **Clasificaciones:** Veredictos del sistema sobre la identidad de una captura.
- **DecoderResults:** Extracciones de la carga útil (payloads).
- **QualityReports:** Diagnósticos sobre la integridad física de las señales.
- **Usuarios:** Perfiles y credenciales de los actores que interactúan con el sistema.

## 5. Operaciones disponibles
A nivel conceptual, las capacidades expuestas por recurso son:
- **Sesiones:** Crear, Consultar, Eliminar (lógicamente), Exportar.
- **Capturas:** Crear (Ingesta), Consultar, Buscar, Eliminar (lógicamente), Exportar.
- **Evidencias:** Crear (Upload), Consultar (Download), Validar.
- **Fingerprints:** Consultar, Buscar por similitud (Matching).
- **Protocolos:** Crear, Consultar, Actualizar, Buscar, Validar.
- **Clasificaciones:** Crear, Consultar, Actualizar.
- **DecoderResults:** Consultar, Generar (Disparar decodificación manual o automática).
- **QualityReports:** Consultar, Generar.
- **Usuarios:** Crear, Consultar, Actualizar, Validar.

*(Nota: Las entidades derivadas como Fingerprint, QualityReport y DecoderResult generalmente se crean como efecto secundario de la ingesta de Evidencias, pero su consulta es independiente).*

## 6. Autenticación
El sistema validará la identidad del cliente que solicita la operación mediante un modelo basado en tokens cifrados.
- El servidor será agnóstico respecto a la forma de inicio de sesión, requiriendo únicamente que las peticiones protegidas incluyan un token válido.
- La consulta de protocolos y capturas aprobadas como "públicas" no requerirá autenticación.
- Todas las operaciones de creación (ingesta de capturas, definición de protocolos), modificación y acceso a datos crudos requerirán autenticación obligatoria.

## 7. Autorización
Una vez autenticado el origen, el sistema evaluará los derechos de acceso utilizando perfiles:
- **Administrador:** Control total sobre clasificaciones, mantenimiento de protocolos teóricos, y gestión de usuarios.
- **Investigador:** Permisos para crear protocolos, subir capturas, forzar clasificaciones, evaluar similitudes y acceder a evidencias crudas.
- **Usuario registrado:** Permisos para subir sus propias sesiones y capturas, y consultar sus propios resultados de decodificación.
- **Invitado:** Acceso exclusivo de solo-lectura a la base de conocimiento pública (Protocolos aprobados, estadísticas generales).

## 8. Respuestas
La filosofía de respuestas busca la máxima claridad en la operación realizada:
- **Éxito:** Cuando la operación se completa, se retorna el recurso afectado encapsulado en una estructura estándar.
- **Advertencias:** Operaciones exitosas que sufrieron degradación o reportan anomalías (ej. una captura subida que superó la validación inicial, pero su QualityReport es bajo).
- **Errores:** Fallos de procesamiento o negocio.
- **Validaciones:** Rechazos estructurados indicando qué campos específicos de los datos de entrada fallaron las reglas del dominio.

## 9. Manejo de errores
Cuando una operación no puede completarse, la API debe garantizar trazabilidad y claridad:
- **Formato uniforme:** Un único contenedor JSON predecible para todo tipo de fallo.
- **Mensajes:** Descripciones legibles por humanos, destinadas a ser mostradas opcionalmente en interfaces gráficas.
- **Identificadores:** Códigos internos de error propios del negocio (ej. `ERR_CAPTURE_INVALID_MODULATION`), desvinculados de la capa de transporte, para facilitar traducciones en el frontend.
- **Trazabilidad:** Inclusión de IDs de correlación o Request IDs que permitan depurar el fallo en los registros (logs) del sistema.

## 10. Versionado
El contrato de la API evolucionará garantizando estabilidad:
- Se implementarán versiones principales.
- Se mantendrán activas simultáneamente la versión actual y al menos una versión anterior para permitir transiciones suaves de los clientes.
- Se aplicará el concepto de *Non-breaking changes* (adición de campos o recursos nuevos) dentro de una misma versión, reservando los cambios destructivos para saltos de versión mayor.

## 11. Seguridad
La exposición de los servicios requiere adherirse a rigurosas capas de protección:
- **Validación:** Confianza cero en las entradas. Validación exhaustiva de esquemas antes de tocar los servicios de dominio.
- **Autenticación:** Identificación de cada cliente.
- **Autorización:** Comprobación estricta de propiedad de recursos o permisos globales por cada petición.
- **Rate limiting:** Prevención de abuso, saturación y ataques de denegación controlando el volumen de peticiones por origen.
- **Auditoría:** Registro (log) en modo solo lectura de todas las operaciones destructivas y de modificación crítica de protocolos.

## 12. Compatibilidad
La API está concebida como la interfaz neutra del sistema, preparada para recibir tráfico de:
- **Frontend interno:** La interfaz web de los investigadores.
- **RF-LAB (Hardware):** Scripts de extracción automática generados por el laboratorio de hardware independiente, enviando mediciones masivas.
- **SmartAccess (Integración futura):** Consultas automatizadas desde la plataforma hermana para validar si una señal en el ecosistema físico general se considera riesgosa o está clasificada.
- **Clientes externos:** Herramientas de terceros, automatizaciones locales y scripts de ingeniería.

Esta filosofía asegura que RF_Observatory permanezca como un oráculo de conocimiento arquitectónicamente desacoplado.
