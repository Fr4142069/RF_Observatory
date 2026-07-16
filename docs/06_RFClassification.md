# Arquitectura de Clasificación RF (RF Classification)

## 1. Introducción
Este documento define la arquitectura conceptual y operativa del proceso de clasificación dentro del sistema **RF_Observatory**. Su propósito es explicar cómo el observatorio entiende, organiza, y otorga identidad a una captura de radiofrecuencia. Esta especificación se alinea estrictamente con las entidades definidas en el *Modelo de Dominio* y extiende conceptualmente las etapas analíticas delineadas en el *Workflow* operativo, sirviendo como la referencia teórica oficial para futuros motores de análisis.

## 2. Objetivos de la clasificación
El proceso de clasificación es el corazón intelectual del observatorio y existe para cumplir los siguientes propósitos:
- **Organizar conocimiento:** Agrupar millones de capturas individuales en familias lógicas y estructuradas.
- **Facilitar búsquedas:** Permitir a los investigadores aislar rápidamente señales que pertenecen al mismo tipo de tecnología.
- **Identificar protocolos:** Vincular la realidad física (señales en el aire) con la teoría documental (estándares y marcas).
- **Detectar similitudes:** Encontrar correlaciones entre señales que, aunque no posean un nombre comercial, comparten la misma estructura.
- **Mejorar la calidad del repositorio:** Separar el ruido y las señales corruptas de los datos útiles para la ingeniería inversa.

## 3. Conceptos fundamentales
En el contexto estricto de este proceso, los términos clave se entienden de la siguiente manera:
- **Captura:** La muestra original e inmutable que requiere ser dotada de identidad.
- **Fingerprint:** La extracción estructural de la Captura. Es el insumo principal sobre el cual opera la clasificación.
- **Protocolo conocido (KnownProtocol):** Un estándar documentado y descifrado. El objetivo ideal de toda clasificación.
- **Protocolo desconocido (UnknownProtocol):** Un perfil creado dinámicamente para agrupar capturas que comparten un mismo Fingerprint, pero cuyo fabricante o decodificación aún es un misterio.
- **Clasificación:** El enlace semántico que une una Captura con un Protocolo. Es una hipótesis o un veredicto respaldado por evidencia.
- **Evidencia:** Los datos físicos originales o contextos que justifican por qué se emitió un veredicto de clasificación.
- **Confianza:** El nivel de certeza que tiene el sistema o la comunidad sobre la exactitud de una clasificación.
- **Validación:** El proceso de confirmar o rechazar una hipótesis de clasificación.

## 4. Flujo conceptual de clasificación
El ciclo intelectual mediante el cual una captura adquiere identidad sigue el siguiente recorrido lógico:

```text
       Captura Cruda
             │
             ▼
        Fingerprint (Abstracción)
             │
             ▼
          Análisis (Comparación)
             │
             ▼
    Clasificación inicial (Hipótesis)
             │
             ▼
         Validación (Sistema/Comunidad)
             │
             ▼
  Clasificación definitiva (Veredicto)
             │
             ▼
         Publicación (Conocimiento)
```

## 5. Estados de clasificación
A lo largo de su proceso de análisis, la relación entre la captura y su identidad atraviesa los siguientes estados:
- **No clasificada:** La captura posee un Fingerprint, pero el motor aún no ha intentado compararla contra el diccionario de protocolos.
- **En análisis:** El sistema se encuentra activamente comparando evidencias y buscando similitudes en la base de datos global.
- **Clasificación preliminar:** Se ha encontrado una coincidencia, pero requiere ser validada por investigadores o requiere cruzar más datos para elevar su confianza.
- **Validada:** La coincidencia es inequívoca, respaldada por decodificación exitosa o consenso de expertos.
- **Rechazada:** Una clasificación previa demostró ser un falso positivo y ha sido anulada, devolviendo la captura a un estado de pendiente de reclasificación.
- **Archivada:** La clasificación es un registro histórico que ha sido superado por un veredicto más moderno.

## 6. Tipos de clasificación
Dependiendo del resultado del análisis, una clasificación adopta distintas naturalezas:
- **Protocolo conocido:** La señal coincide perfectamente con un estándar documentado en el sistema (ej. coincidencia con Keeloq).
- **Protocolo desconocido:** La señal es huérfana de nombre, pero coincide con otras señales en la base de datos, uniéndose a un clúster de investigación.
- **Clasificación parcial:** Se han identificado partes de la señal (ej. el preámbulo o la modulación coinciden con una marca), pero el resto de la estructura diverge.
- **Clasificación pendiente:** La señal es válida pero no tiene similitud con absolutamente nada en el repositorio actual.
- **Clasificación revisada:** Una clasificación que inicialmente fue generada por el sistema automático, pero posteriormente fue ajustada o confirmada por un experto humano.

## 7. Evidencias
Para emitir un veredicto de clasificación, el proceso se apoya en pilares probatorios tangibles:
- **Fingerprint:** Es la evidencia primaria matemática de los anchos de pulso y pausas.
- **Temporización:** Las duraciones lógicas de la ventana del experimento.
- **Frecuencia:** La banda del espectro electromagnético en la que se transmitió.
- **Modulación:** La técnica utilizada (OOK, FSK, etc.).
- **Documentación técnica:** Hojas de datos o manuales de fabricantes aportados por la comunidad.
- **Capturas relacionadas:** La existencia de otras capturas idénticas generadas por otros usuarios en distintos tiempos, confirmando que no es una anomalía aleatoria.

## 8. Nivel de confianza
La Confianza es un indicador conceptual que acompaña a cada clasificación.
- **Qué representa:** Representa la fiabilidad del veredicto. Diferencia una suposición lejana de un emparejamiento exacto.
- **Cómo ayuda al usuario:** Permite a los investigadores filtrar el repositorio, enfocando sus esfuerzos en señales dudosas (baja confianza) para ayudar a clasificarlas, o utilizando únicamente señales perfectas (alta confianza) para extraer payloads seguros.

## 9. Reclasificación
El conocimiento en el observatorio es vivo y dinámico. Una captura puede cambiar de clasificación bajo nuevas evidencias:
- **Cuándo ocurre:** Cuando un motor de análisis es actualizado, cuando un investigador identifica un falso positivo, o cuando un protocolo desconocido finalmente es descifrado y nombrado.
- **Qué permanece:** La Captura original, su Fingerprint, sus Evidencias físicas y su QualityReport jamás mutan. La historia de la señal es intocable.
- **Qué cambia:** Únicamente se genera un nuevo registro de Clasificación que apunta al protocolo correcto.
- **Trazabilidad:** La clasificación anterior se marca como "Archivada/Rechazada", dejando un historial claro de quién tomó la decisión, por qué cambió, y qué se creía anteriormente.

## 10. Relación con KnownProtocol y UnknownProtocol
La clasificación actúa como un puente entre la realidad de la captura y la abstracción del diccionario de protocolos:
- **Diferencia:** Una clasificación contra un `KnownProtocol` indica que el sistema sabe exactamente cómo decodificar o leer la señal. Una clasificación contra un `UnknownProtocol` indica que el sistema solo sabe agrupar señales similares que aún nadie ha podido entender.
- **Evolución:** Cuando la comunidad logra investigar y descifrar la lógica de un `UnknownProtocol`, este se transforma conceptualmente en un `KnownProtocol`. En ese momento, todas las clasificaciones históricas apuntadas al clúster desconocido se reclasifican automáticamente para heredar la identidad y decodificación del nuevo estándar conocido.

## 11. Principios de clasificación
La lógica de diseño del motor de clasificación debe respetar inexorablemente estos principios:
- **Nunca perder información:** Los metadatos de análisis fallidos o parciales son valiosos y no deben eliminarse.
- **Toda clasificación debe ser trazable:** Debe ser posible rastrear qué algoritmo, usuario o regla generó el veredicto actual.
- **Toda evidencia debe conservarse:** Los datos que justifican un veredicto deben persistir permanentemente.
- **Las clasificaciones pueden evolucionar:** El sistema debe prever que el conocimiento actual puede ser erróneo y estar preparado para la autocorrección.
- **Los protocolos permanecen independientes de las capturas:** El diccionario teórico no pertenece ni depende de ninguna sesión específica de recolección de datos.

## 12. Resumen
La clasificación RF en el observatorio no es simplemente una etiqueta estática; es un proceso iterativo, trazable y basado en evidencias que transforma datos binarios sin sentido en familias lógicas de conocimiento. Al separar de manera estricta las capturas físicas de sus definiciones teóricas, el sistema asegura que la base de datos global de huellas pueda madurar continuamente, facilitando la transición progresiva desde señales completamente desconocidas hasta protocolos maduros y documentados.
