# Modelo de Dominio (Domain Model)

## 1. Introducción
El presente documento define la especificación oficial del modelo de dominio del proyecto **RF_Observatory**. Su objetivo es establecer un lenguaje ubicuo y una abstracción pura de los conceptos fundamentales que rigen el ecosistema de radiofrecuencia. Esta especificación es la base absoluta sobre la cual se construirán el backend, la base de datos, la API y el frontend, asegurando que todos los sistemas hablen el mismo lenguaje y respeten las mismas reglas de negocio sin importar la tecnología subyacente.

## 2. Principios del dominio
El diseño del dominio está regido por los siguientes principios fundamentales:
- **Una captura nunca se modifica:** Una vez que una señal ingresa al sistema, sus datos crudos y su representación física son inmutables.
- **Toda evidencia debe conservarse:** Los archivos físicos originales, metadatos y contextos de la señal no deben eliminarse para garantizar la auditoría y análisis histórico.
- **La clasificación puede cambiar:** A medida que la comunidad aporta conocimiento o los motores de análisis mejoran, la identificación de una señal puede evolucionar o corregirse.
- **Los protocolos son independientes de las capturas:** Las definiciones formales de un protocolo (KnownProtocol / UnknownProtocol) existen independientemente de que haya o no capturas asociadas a ellos en un momento dado.
- **El dominio es independiente de la tecnología:** Ninguna entidad conoce detalles sobre bases de datos, redes HTTP, JSON o interfaces gráficas.

## 3. Entidades principales

### Capture
- **Propósito:** Representar una transmisión de radiofrecuencia individual e inmutable.
- **Descripción:** Es la unidad fundamental de información que ingresa al sistema, equivalente a pulsar el botón de un control remoto una vez.
- **Responsabilidad:** Mantener la integridad de los datos puros recibidos y agrupar los resultados de análisis derivados.
- **Información que representa:** Metadatos temporales, origen de la señal y referencias a sus componentes analíticos.
- **Ciclo de vida:** Nace tras la recepción, se enriquece durante la clasificación y permanece en almacenamiento a largo plazo (solo lectura).
- **Relaciones:** Pertenece a una `Session`. Contiene `Fingerprint`, `Evidence`, `Classification`, `QualityReport` y `DecoderResult`.

### Session
- **Propósito:** Agrupar lógicamente un conjunto de capturas relacionadas.
- **Descripción:** Representa un evento en el tiempo donde un usuario o laboratorio graba múltiples transmisiones (ej. presionar repetidamente un mismo botón o probar un dispositivo completo).
- **Responsabilidad:** Dar contexto temporal y de origen a múltiples capturas, permitiendo analizar secuencias o contadores dinámicos (Rolling Codes).
- **Información que representa:** Autor, ventana de tiempo y contexto ambiental del experimento.
- **Ciclo de vida:** Se abre al iniciar la ingesta, agrupa capturas, y se cierra al finalizar el experimento.
- **Relaciones:** Contiene múltiples entidades de tipo `Capture`.

### Fingerprint
- **Propósito:** Servir como huella dactilar matemática de la captura.
- **Descripción:** Abstracción estructurada de las características físicas y temporales de la señal, extraída de los datos crudos.
- **Responsabilidad:** Proveer los datos estructurados necesarios para comparar señales y determinar su similitud.
- **Información que representa:** Modulación, frecuencia, duraciones de pulsos, pausas y estructura del preámbulo.
- **Ciclo de vida:** Se genera unívocamente al procesar la `Capture` y permanece inmutable.
- **Relaciones:** Pertenece exclusivamente a una `Capture`.

### KnownProtocol
- **Propósito:** Representar un estándar o protocolo de comunicación de RF documentado e identificado.
- **Descripción:** Contiene las reglas, especificaciones teóricas y la lógica de negocio que define a un sistema propietario o abierto (ej. Keeloq, PT2262).
- **Responsabilidad:** Servir como diccionario y referencia global para validar clasificaciones.
- **Información que representa:** Nombre, características teóricas de pulsos, reglas de decodificación y fabricante.
- **Ciclo de vida:** Es persistente. Se crea por expertos o por consenso comunitario y se enriquece a lo largo del tiempo.
- **Relaciones:** Múltiples `Classification` apuntan a esta entidad.

### UnknownProtocol
- **Propósito:** Agrupar características recurrentes de señales que aún no han sido identificadas.
- **Descripción:** Una entidad que consolida similitudes entre múltiples huellas (`Fingerprint`) huérfanas, formando un "candidato a protocolo".
- **Responsabilidad:** Rastrear patrones en el mundo real que justifiquen la investigación de un nuevo protocolo.
- **Información que representa:** Promedios de pulsos, estimaciones matemáticas y notas de investigación comunitaria.
- **Ciclo de vida:** Nace al detectar similitudes masivas, muta conforme se agrupan más evidencias, y muere o se convierte en un `KnownProtocol` al ser descifrado.
- **Relaciones:** Múltiples `Classification` apuntan a esta entidad.

### Classification
- **Propósito:** Establecer el vínculo semántico entre una señal y un protocolo.
- **Descripción:** Es el veredicto del sistema o de la comunidad sobre qué es exactamente una `Capture`.
- **Responsabilidad:** Asignar una captura a un protocolo (conocido o desconocido) con un nivel de confianza determinado.
- **Información que representa:** Puntuación de similitud, fecha de clasificación y origen del veredicto (sistema automático o experto humano).
- **Ciclo de vida:** Es mutable. Puede reescribirse si los algoritmos mejoran o un investigador aporta nuevos datos.
- **Relaciones:** Pertenece a una `Capture`. Apunta a un `KnownProtocol` o `UnknownProtocol`.

### Evidence
- **Propósito:** Resguardar la verdad física de la captura.
- **Descripción:** Es el archivo crudo y original (ej. un archivo SARF o I/Q) que documenta el origen innegable de la señal.
- **Responsabilidad:** Permitir la reproducibilidad del experimento en cualquier momento futuro.
- **Información que representa:** Datos binarios o formatos de archivo específicos subidos al sistema.
- **Ciclo de vida:** Se guarda durante la ingesta y se vuelve estático e inamovible (Write-Once, Read-Many).
- **Relaciones:** Pertenece a una `Capture`.

### DecoderResult
- **Propósito:** Documentar el resultado de aplicar una lógica de decodificación sobre la captura.
- **Descripción:** Almacena la carga útil (Payload) extraída si la señal pertenece a un protocolo comprensible.
- **Responsabilidad:** Traducir los pulsos físicos a información binaria o hexadecimal legible para el negocio (ID de botón, número de serie, contador).
- **Información que representa:** Bits extraídos, bytes verificados (Checksum/CRC) y valores interpretados.
- **Ciclo de vida:** Nace si la clasificación tiene éxito y los decodificadores están disponibles. Se regenera si los decodificadores se actualizan.
- **Relaciones:** Pertenece a una `Capture`.

### QualityReport
- **Propósito:** Evaluar la salud e integridad de la señal recibida.
- **Descripción:** Es un diagnóstico técnico sobre la legibilidad de la captura cruda.
- **Responsabilidad:** Indicar si una captura es útil para investigación o debe descartarse por exceso de ruido.
- **Información que representa:** Relación señal-ruido (SNR), anomalías detectadas y porcentaje de pulsos deformados.
- **Ciclo de vida:** Se calcula al procesar la `Evidence` y es estático.
- **Relaciones:** Pertenece a una `Capture`.

## 4. Relaciones entre entidades
El siguiente diagrama describe la jerarquía y dependencia entre las entidades del dominio:

```text
Session
 │
 ├── Capture (1)
 │    │
 │    ├── Fingerprint (1:1)
 │    │
 │    ├── Evidence (1:N)
 │    │
 │    ├── QualityReport (1:1)
 │    │
 │    ├── DecoderResult (1:1)
 │    │
 │    └── Classification (1:1)
 │         │
 │         └──> KnownProtocol / UnknownProtocol
 │
 └── Capture (2)
      │
      └── ...
```

## 5. Ciclo de vida de una captura
1. **Recepción:** El sistema recibe los datos de una transmisión en el contexto de una sesión.
2. **Almacenamiento:** Los datos crudos se respaldan inmutablemente como Evidencia (`Evidence`).
3. **Validación:** Se genera un reporte de calidad (`QualityReport`) para verificar si la señal es procesable.
4. **Clasificación:** Se extraen las características físicas (`Fingerprint`) y el motor de análisis asigna una o varias hipótesis de identificación (`Classification`).
5. **Decodificación (Opcional):** Si el protocolo es conocido, se genera el resultado legible (`DecoderResult`).
6. **Publicación:** La captura se indexa y se expone a los flujos del sistema de investigación.
7. **Consulta:** Investigadores y usuarios pueden consultar, comparar y validar la captura indefinidamente.

## 6. Agregados del dominio
Los agregados son fronteras transaccionales naturales que agrupan entidades fuertemente acopladas.
- **Agregado Session (Raíz: Session):** Protege la consistencia de las capturas. Modificar, ingresar o consultar capturas se hace a través de la raíz `Session`. Las entidades `Capture`, `Fingerprint`, `Evidence`, `Classification`, `QualityReport` y `DecoderResult` están encapsuladas bajo este agregado y no deben existir flotando aisladamente en el sistema.
- **Agregado Protocol (Raíz: KnownProtocol / UnknownProtocol):** Mantiene la integridad del conocimiento documental. Sus definiciones, características teóricas y documentación histórica se gestionan de manera independiente a las sesiones experimentales.

## 7. Reglas del dominio
- Una captura (`Capture`) pertenece siempre y obligatoriamente a una sola sesión (`Session`).
- Una clasificación (`Classification`) puede cambiar con el tiempo sin alterar la evidencia original.
- Una evidencia (`Evidence`) jamás se elimina ni se sobrescribe.
- Un protocolo conocido (`KnownProtocol`) puede tener múltiples capturas apuntando a él, pero no es dueño de ninguna de ellas.
- Una sesión puede contener capturas que pertenezcan a protocolos completamente distintos.

## 8. Objetos de valor (Value Objects)
Los Objetos de Valor identifican piezas de información que se definen por sus atributos y no por su identidad. Sirven para dar riqueza y precisión a las entidades.
- **Frequency:** Propósito: Representar una frecuencia física con precisión y unidad (ej. 433.92 MHz), asegurando que no existan valores irreales (ej. frecuencias negativas).
- **Modulation:** Propósito: Tipificar esquemas matemáticos de modulación (ej. OOK, FSK).
- **TimeWindow / Timestamp:** Propósito: Centralizar la medición del tiempo (duración de pulsos, fechas de creación) de manera unificada ytimezone-agnostic.
- **Payload:** Propósito: Representar un tren de bits o bytes extraído de forma segura, garantizando inmutabilidad.

## 9. Eventos del dominio
Los eventos notifican a otras partes del sistema cuando ocurre un cambio de estado importante dentro del negocio:
- `CaptureReceived`: Disparado cuando una nueva señal ingresa al sistema y está lista para su procesamiento inicial.
- `CaptureValidated`: Disparado una vez que se emite el `QualityReport` confirmando si la señal contiene información útil.
- `ProtocolClassified`: Disparado cuando un algoritmo o un humano asigna o actualiza una `Classification` a una captura.
- `EvidenceAdded`: Disparado cuando se anexa un respaldo físico a la captura.
- `DecoderExecuted`: Disparado tras la extracción exitosa del payload generando un `DecoderResult`.

## 10. Invariantes
- Una captura (`Capture`) no puede existir sin su respectiva huella (`Fingerprint`); si no se puede generar la huella matemática, la señal no es procesable en el dominio.
- El origen temporal (Timestamp) de una `Capture` debe estar obligatoriamente dentro de la ventana de tiempo de la `Session` a la que pertenece.
- La puntuación de similitud dentro de una `Classification` nunca puede estar fuera del rango predefinido del sistema (ej. 0% a 100%).

## 11. Glosario
- **Fingerprint (Huella dactilar de RF):** Patrón matemático y temporal que describe la forma en la que una señal transmite bits al aire (tiempos de alto, bajo, sincronización).
- **Payload (Carga Útil):** Los datos informáticos (bits o bytes) subyacentes transportados por la transmisión de radiofrecuencia.
- **SARF:** Formato de archivo estructurado adoptado por el ecosistema para documentar mediciones crudas de RF y sus contextos.
- **Decoder (Decodificador):** Lógica matemática capaz de tomar un `Fingerprint` y un `KnownProtocol` para transformar los pulsos en un `Payload`.
