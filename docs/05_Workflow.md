# Flujo Operativo del Sistema (Workflow)

## 1. Introducción
Este documento define el flujo operativo oficial del sistema **RF_Observatory**. Su propósito es describir paso a paso el ciclo de vida y recorrido de una señal de radiofrecuencia desde el momento en que ingresa al sistema hasta que es consultada por los usuarios. 
Este flujo es la coreografía dinámica de las reglas definidas en el *Modelo de Dominio* y actúa sobre las capas establecidas en la *Arquitectura del Sistema*. El objetivo es que cualquier desarrollador o ingeniero comprenda cómo transita la información sin necesidad de leer el código fuente.

## 2. Flujo General del Sistema
El recorrido integral de una captura a través del observatorio se resume en el siguiente diagrama:

```text
  Captura RF (Sesión / Archivo Crudo)
                 │
                 ▼
             Recepción
                 │
                 ▼
             Validación
                 │
                 ▼
       Generación de Fingerprint
                 │
                 ▼
            Clasificación
                 │
                 ▼
       Generación de Evidencias
       (DecoderResult, Calidad)
                 │
                 ▼
            Publicación
                 │
                 ▼
              Consulta
```

## 3. Flujo de ingreso de una captura
El proceso de entrada asegura que el sistema solo acepte información estructurada correctamente:
1. **Recepción:** El usuario (o laboratorio) envía un conjunto de datos (payload JSON o archivo SARF) hacia la API. Este paquete representa un experimento e incluye el contexto ambiental.
2. **Validación:** El sistema verifica que la solicitud esté bien formada, contenga los metadatos obligatorios y pertenezca a una Sesión lógica válida.
3. **Registro:** Se abren las estructuras en memoria para la Sesión y las Capturas individuales correspondientes.
4. **Persistencia:** Los datos originales y el archivo crudo se almacenan inmutablemente en el sistema antes de iniciar cualquier procesamiento complejo.

## 4. Flujo de clasificación
Una vez persistida, la captura entra al flujo analítico del negocio:
1. **Nueva captura:** La señal ingresa al motor de procesamiento.
2. **Sin clasificar:** Estado inicial donde la captura solo posee su Fingerprint pero carece de identidad.
3. **Análisis:** El sistema evalúa el Fingerprint comparando sus características contra la base de conocimientos teórica.
4. **Clasificación:** Se genera un vínculo semántico (Classification) que asocia la captura a un protocolo conocido o a un patrón desconocido, asignándole una puntuación de similitud.
5. **Revisión:** La clasificación queda sujeta a escrutinio (si la similitud es baja o ambigua).
6. **Publicación:** El resultado se hace visible en el dominio del observatorio.

## 5. Flujo de validación
La confiabilidad del observatorio se sostiene sobre tres pilares de validación progresiva:
- **Validación automática:** Procesos del Backend que emiten el *QualityReport* y descartan el ruido puro basándose en reglas matemáticas estrictas.
- **Validación manual:** Un Investigador revisa visual y analíticamente la captura para confirmar que la señal cruda coincide con la clasificación propuesta por el sistema.
- **Validación comunitaria:** Miembros del ecosistema pueden respaldar, corregir o proponer una nueva clasificación si la señal corresponde a un protocolo emergente o no documentado.

## 6. Flujo de generación de evidencia
Todo veredicto en el sistema debe estar respaldado por pruebas:
- Tras el ingreso, el **archivo crudo original** se asocia inseparablemente como Evidencia a la Captura.
- El sistema evalúa el archivo y adjunta un **QualityReport** (informe de ruido y salud de la señal).
- Si la clasificación es exitosa contra un protocolo conocido, se dispara la lógica de decodificación y se asocia un **DecoderResult** (la carga útil extraída).
- La comunidad puede asociar observaciones técnicas para enriquecer el contexto.

## 7. Flujo de publicación
Para garantizar que la base de conocimiento pública esté limpia, una captura transita hacia la visibilidad general bajo reglas estrictas:
- **Estados de transición:** Una captura en estado *Recibida* permanece privada o en cuarentena hasta que adquiere el estado *Validada*.
- **Restricciones:** Solamente las capturas que poseen un *QualityReport* aprobatorio y que no son consideradas ruido absoluto transitan al estado *Publicada*.
- Una vez publicada, pasa a formar parte de los índices globales y de las estadísticas del observatorio.

## 8. Flujo de consulta
El observatorio es fundamentalmente una biblioteca de investigación. Los usuarios interactúan con la información publicada mediante:
- **Búsqueda:** Búsqueda textual o paramétrica sobre metadatos (frecuencias, modulaciones, autores).
- **Filtros:** Aislamiento de capturas por su pertenencia a protocolos específicos o por rangos de calidad.
- **Visualización:** Representación de los detalles del Fingerprint, el contexto de la Sesión y el Payload.
- **Comparación:** Evaluación simultánea de dos capturas para observar diferencias en sus huellas.
- **Exportación:** Descarga de las evidencias asociadas y los metadatos JSON estandarizados para uso en herramientas de laboratorio.

## 9. Estados del ciclo de vida
A lo largo de los flujos descritos, la captura atraviesa de forma secuencial los siguientes estados inmutables:
- **Recibida:** Los datos han ingresado al sistema, pero no han sido procesados.
- **Validada:** El sistema confirmó que la señal es íntegra y procesable (tiene un QualityReport positivo).
- **Clasificada:** Se ha emitido un veredicto relacionando la señal con un protocolo (conocido o desconocido).
- **Publicada:** La captura es visible para el resto de la comunidad o para integraciones externas.
- **Archivada:** La captura ha perdido relevancia inmediata o ha sido suplantada, ocultándose de búsquedas por defecto, pero manteniéndose en el histórico para evitar la pérdida de conocimiento.

## 10. Excepciones
El flujo normal de los eventos puede desviarse ante anomalías físicas o lógicas:
- **Captura incompleta:** Los archivos de evidencia están corruptos o el payload carece de información vital. La captura aborta el flujo de validación.
- **Captura duplicada:** El sistema detecta que la misma evidencia exacta ya fue subida; se rechaza la ingesta para evitar redundancia en el observatorio.
- **Captura inválida:** La señal procesada es exclusivamente ruido o interferencia (determinado por el QualityReport). La captura no alcanza el estado de publicación.
- **Clasificación pendiente:** Una señal es válida pero no coincide con ningún patrón conocido, deteniéndose en el flujo a la espera de investigación comunitaria.

## 11. Responsabilidades
Cada capa del sistema orquesta una porción específica del flujo:
- **Usuario:** Inicia el flujo proveyendo las capturas y aportando validación comunitaria.
- **Frontend:** Guía al usuario en la subida, facilita la visualización y actúa como cliente de las consultas.
- **API:** Recibe el tráfico, impone restricciones de formato y enruta la información de entrada y salida de manera segura.
- **Backend:** Gobierna el núcleo del flujo: analiza fingerprints, invoca clasificadores, genera los reportes de calidad e instancia decodificadores.
- **Persistencia:** Almacena de forma definitiva los saltos de estado, los metadatos y las evidencias, garantizando que ninguna transacción se pierda.

## 12. Resumen
El flujo operativo de RF_Observatory es un pipeline unidireccional que transforma progresivamente datos crudos en conocimiento estructurado. Comienza con una estricta ingesta en la API, continúa con un procesamiento profundo en el Backend (extracción de huellas y evaluación de calidad), transita por la asignación de identidad mediante clasificación automática o humana, y finaliza cuando los datos se publican en un repositorio estandarizado. Este diseño garantiza que cada pieza de información esté validada, respaldada por evidencias físicas y lista para ser consultada por el ecosistema SmartAccess.
