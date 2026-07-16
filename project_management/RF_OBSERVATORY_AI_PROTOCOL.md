# Protocolo Oficial de Arquitectura y Metodología (RF_Observatory)

> **AVISO PARA INTELIGENCIAS ARTIFICIALES (AI) Y NUEVOS DESARROLLADORES:**
> Si acabas de ingresar a este proyecto (por ejemplo, debido a un reinicio de contexto, una nueva sesión de chat o una ingesta en NotebookLM), **DEBES LEER Y ASIMILAR ESTE DOCUMENTO ANTES DE ESCRIBIR UNA SOLA LÍNEA DE CÓDIGO.**

Este documento condensa la "Memoria RAM" metodológica del ecosistema RF_Observatory. Define **CÓMO** pensamos, **CÓMO** decidimos y **CÓMO** estructuramos el código.

---

## 1. Paradigma Central: El Conocimiento antes que el Código

En RF_Observatory no somos "tiradores de código"; somos arquitectos de un ecosistema de conocimiento. 
* **El código es efímero.** Los algoritmos de IA, las librerías de ORM o los frameworks de UI cambiarán en pocos años.
* **El conocimiento es permanente.** La manera en la que el observatorio estructura, relaciona y confía en los datos RF debe ser inmutable y agnóstica a la tecnología.
* Por lo tanto, **las especificaciones (en la carpeta `docs/`) tienen valor normativo absoluto (Regla DA-019).** Si el código contradice la especificación, el código es el que tiene el bug.

## 2. El Flujo de Trabajo (Verticales Funcionales)

No programamos componentes aislados sin propósito (no hacemos un CRUD de tablas). Construimos **Capacidades del Sistema** a través de **Casos de Uso Verticales**.

Cada Caso de Uso se desarrolla íntegramente de la siguiente manera:
1. **Request DTO:** Contrato de entrada. Representa la conversación entre el actor externo y el sistema.
2. **Command:** Abstrae la intención del usuario. El sistema no sabe si vino de un endpoint HTTP, de un CLI, o de una IA.
3. **Validator:** Barrera de defensa. Asegura que la entrada sea pura antes de llegar al orquestador.
4. **Use Case (Application Layer):** Es un **Director de Orquesta**. Recupera datos de los Repositorios y coordina, pero **NO TIENE INTELIGENCIA**.
5. **Domain (Entities / Services):** Aquí vive la inteligencia. Los cálculos, el Machine Learning y las heurísticas de inferencia RF pertenecen exclusiva y obligatoriamente al Dominio (Regla DA-015).
6. **Response DTO:** Contrato inmutable de salida.

## 3. Decisiones de Arquitectura (DA) Críticas

Estas decisiones están "grabadas en piedra" en el `PROJECT_CASEBOOK.md`. No pueden violarse:

* **DA-014 (Use Cases Limpios):** Un Caso de Uso resuelve una y solo una intención del usuario. No se acopla a Express, Prisma ni NestJS.
* **DA-015 (La Inteligencia al Dominio):** La Application Layer solo orquesta flujos. Los motores algorítmicos que deciden si dos señales se parecen pertenecen al Dominio. Esto permite reemplazar la heurística actual por Redes Neuronales mañana sin tocar las APIs.
* **DA-016 (El Fingerprint es el Rey):** RF_Observatory no es un almacén de ondas (archivos I/Q). Es una base de datos del **conocimiento derivado**. La huella electromagnética matemática (Fingerprint) es el activo principal que permite cruzar información.
* **DA-017 (Inmutabilidad Histórica):** Una Evidencia técnica que contradice una Clasificación no muta la historia (no borra los datos viejos). Se documenta y requiere un nuevo flujo (Re-clasificación) para mantener la trazabilidad científica.

## 4. Estructura de Proyecto ("Clean Architecture" Estricta)

* `backend/src/domain/`: El corazón. Entidades puras y Value Objects. No conoce de Bases de Datos.
* `backend/src/application/`: Casos de Uso, DTOs, Commands, Validators y Custom Errors. No conoce de SQL ni HTTP.
* `backend/src/infrastructure/`: Prisma, Repositorios concretos, Composition Root. Todo lo que toque E/S externa.
* `shared/`: Entidades y Value Objects agnósticos compartidos (potencialmente con el frontend).
* `project_management/`: El cerebro administrativo. `PROJECT_CASEBOOK.md` es el registro histórico de decisiones. Los reportes de tareas viven aquí.

## 5. Instrucciones de Recuperación de Contexto (Para Agentes AI)

Si pierdes el contexto del proyecto, sigue este pipeline de lectura:
1. Lee este archivo (`RF_OBSERVATORY_AI_PROTOCOL.md`).
2. Lee `project_management/PROJECT_CASEBOOK.md` para entender por qué la arquitectura es como es.
3. Lee el último `SPRINT_XX_KICKOFF.md` en `project_management/sprints/` para saber en qué fase nos encontramos.
4. Consulta `docs/13_UseCases.md` para ver qué capacidades del sistema ya están desarrolladas.
5. Revisa la carpeta `docs/knowledge/` (o los documentos normativos como `14_FingerprintSpecification.md`) antes de proponer implementar cualquier lógica que cruce información, calcule huellas o realice comparaciones.

> **FILOSOFÍA DE TRABAJO DEL USUARIO:**
> "Pensar dos veces para no tener mejores ideas después de una idea."
> No saltes directamente a escribir un algoritmo sin haber propuesto y redactado primero la Especificación Normativa de cómo se debe comportar el conocimiento subyacente.
