# Plan Maestro de Ejecución (Project Execution Plan)

## 1. Estado actual del proyecto
A la fecha de emisión de este documento, la realidad del proyecto **RF_Observatory** se define de la siguiente manera:
- **Bootstrap:** Completado. Repositorios y estructura estática inicializados.
- **Arquitectura:** Completamente documentada, revisada y aprobada (Sprint 0 cerrado).
- **Desarrollo técnico:** Cero líneas de código implementadas. El proyecto se encuentra en estado inmaculado a nivel de software.

## 2. Objetivo general
El propósito absoluto del proyecto es construir y estabilizar la versión 1.0 de **RF_Observatory**: una plataforma web escalable, desacoplada y robusta que actúe como la base de conocimiento mundial del ecosistema SmartAccess para capturar, almacenar, clasificar y validar protocolos de radiofrecuencia (RF).

## 3. Estrategia de desarrollo
La construcción del sistema no será monolítica, sino iterativa e incremental, orquestada rigurosamente mediante **Sprints**. Para garantizar la calidad, cada Sprint atravesará invariablemente las siguientes fases de control:
1. **Planificarse:** Definir el alcance técnico exacto de la iteración.
2. **Ejecutarse:** Escribir el código y configurar la infraestructura de manera aislada.
3. **Documentarse:** Actualizar manuales técnicos y registros de decisiones (ADRs) derivados del código.
4. **Validarse:** Someter la implementación a pruebas de consistencia y escrutinio (Code Review).
5. **Aprobarse:** Obtener el visto bueno final del Arquitecto del Proyecto.

Ningún Sprint posterior podrá iniciar si el anterior no se encuentra formalmente cerrado y aprobado.

## 4. Organización por Sprints
El ciclo de desarrollo hasta la versión 1.0 se segmenta en 10 Sprints secuenciales:

### Sprint 0: Arquitectura
- **Objetivo:** Definir conceptualmente el sistema, sus flujos, dominio y restricciones.
- **Resultado esperado:** Documentación oficial congelada en el repositorio.
- **Dependencias:** Ninguna.
- **Estado:** Completado.

### Sprint 1: Inicialización técnica
- **Objetivo:** Establecer los cimientos del desarrollo.
- **Resultado esperado:** Configuración de linters, empaquetadores, dependencias base (TypeScript, Node), Dockerfiles vacíos y esquemas de repositorios enlazados.
- **Dependencias:** Sprint 0.
- **Estado:** Pendiente.

### Sprint 2: Modelo de Dominio
- **Objetivo:** Transcribir el `02_DomainModel.md` a código.
- **Resultado esperado:** Tipos, Interfaces y DTOs agnósticos implementados en el directorio `shared/`.
- **Dependencias:** Sprint 1.
- **Estado:** Pendiente.

### Sprint 3: Persistencia
- **Objetivo:** Preparar la base de datos relacional.
- **Resultado esperado:** Motor PostgreSQL dockerizado, scripts de migración generados y repositorios lógicos conectados al Modelo de Dominio.
- **Dependencias:** Sprint 2.
- **Estado:** Pendiente.

### Sprint 4: Backend
- **Objetivo:** Dar vida a la lógica de negocio y las interfaces del servidor.
- **Resultado esperado:** API REST funcional y probada (Express) que respete estrictamente la especificación `03_API.md`.
- **Dependencias:** Sprint 3.
- **Estado:** Pendiente.

### Sprint 5: Frontend
- **Objetivo:** Desarrollar las interfaces gráficas y la experiencia de usuario.
- **Resultado esperado:** Aplicación web (React/Vite) capaz de consumir la API, renderizando el catálogo y permitiendo la interacción de usuarios e investigadores.
- **Dependencias:** Sprint 4.
- **Estado:** Pendiente.

### Sprint 6: Motor de Clasificación
- **Objetivo:** Construir el subsistema analítico de *Fingerprints*.
- **Resultado esperado:** Un motor lógico que asigne veredictos de clasificación automáticamente basándose en los parámetros de similitud.
- **Dependencias:** Sprint 4.
- **Estado:** Pendiente.

### Sprint 7: Integración
- **Objetivo:** Consolidar todos los módulos aislados en un único ecosistema.
- **Resultado esperado:** Frontend, Backend, Base de datos y Clasificador interconectados y fluyendo con datos experimentales (End-to-End).
- **Dependencias:** Sprint 5 y Sprint 6.
- **Estado:** Pendiente.

### Sprint 8: Pruebas
- **Objetivo:** Asegurar la resiliencia del observatorio ante errores y datos corruptos.
- **Resultado esperado:** Tests automatizados (unitarios y de integración), resolución de bugs críticos y auditorías de seguridad.
- **Dependencias:** Sprint 7.
- **Estado:** Pendiente.

### Sprint 9: Versión 1.0
- **Objetivo:** Transición a producción y cierre del ciclo de vida de desarrollo inicial.
- **Resultado esperado:** Proyecto desplegado, manuales de usuario redactados, y Release oficial emitida (`v1.0.0`).
- **Dependencias:** Sprint 8.
- **Estado:** Pendiente.

## 5. Reglas de ejecución
El equipo, tanto humano como sintético, deberá obedecer las siguientes reglas restrictivas durante la ejecución:
- **No saltar Sprints:** La linealidad es innegociable.
- **No programar sin documentación:** Cualquier nueva característica que surja durante el desarrollo debe actualizar primero los documentos de diseño.
- **Toda modificación requiere revisión:** Las fusiones de código al repositorio principal solo ocurren bajo escrutinio (Pull Requests).
- **Toda decisión importante debe documentarse:** Las desviaciones técnicas deben registrarse formalmente.
- **Todo cambio debe ser trazable:** Los commits deben asociarse a las Historias de Usuario correspondientes.

## 6. Gestión documental
La documentación es la única fuente de la verdad del proyecto.
- **Documentos vivos:** Aunque están congelados, pueden modificarse ante hallazgos críticos durante el desarrollo, bajo autorización explícita.
- **Versionado:** Cada documento pertenece al control de ramas del proyecto Git.
- **Revisión y Aprobación:** Las modificaciones documentales siguen el mismo flujo de Code Review que el software.

## 7. Gestión del código
Los estándares de programación aseguran mantenibilidad a largo plazo:
- **Commits pequeños:** Cambios granulares, descriptivos y autoexplicativos.
- **Cambios trazables:** Cada pieza de código debe responder a un criterio de aceptación de una Historia de Usuario.
- **No mezclar funcionalidades:** Un Pull Request = Un objetivo.
- **Mantener consistencia:** Respeto estricto por las reglas de linters, Prettier y guías de estilo adoptadas en el Sprint 1.

## 8. Gestión de agentes AI
En este ecosistema colaborativo, los agentes de Inteligencia Artificial operan bajo restricciones quirúrgicas:
- **No modificar arquitectura:** Salvo instrucción directa del arquitecto humano.
- **No proponer mejoras no solicitadas:** Los agentes ejecutan el contrato y se limitan al alcance de la tarea asignada; no diseñan *features* por motu propio.
- **No cambiar decisiones aprobadas:** Un agente no puede alterar una convención ya documentada.
- **Trabajar únicamente sobre la tarea asignada:** Mantener el foco total para evitar efectos colaterales (Scope Creep).
- **Entregar resultados autocontenidos:** Cada acción del agente debe dejar el sistema en un estado funcional y compilable.

## 9. Criterios para cerrar un Sprint
Un Sprint abandona la columna "En Progreso" y se considera "Completado" exclusivamente cuando:
1. Todos los objetivos técnicos declarados operan sin errores conocidos.
2. El código ha sido subido y fusionado a la rama de desarrollo (ej. `develop`).
3. El Arquitecto o Responsable ha revisado, validado funcionalmente y aprobado explícitamente el entregable global del Sprint.

## 10. Riesgos del proyecto
Desde la perspectiva de la gestión, los peligros más latentes son:
- **Pérdida de alineación arquitectónica:** Riesgo de que los desarrolladores o agentes generen deuda técnica al omitir el Domain Model.
- **Efecto "Bola de Nieve" en Sprints iniciales:** Problemas en la configuración base del Sprint 1 que puedan arrastrar fallos de compatibilidad hasta el Sprint 7.
- **Desincronización de conocimiento:** Avances técnicos que no queden reflejados en la documentación viva, dificultando el mantenimiento a largo plazo.

## 11. Resumen
El **Plan Maestro de Ejecución (Project Execution Plan)** es la guía oficial que rige cómo se convertirá la abstracción teórica de RF_Observatory en un software funcional. A través de Sprints secuenciales, reglas inquebrantables y una delimitación estricta de las responsabilidades de los agentes AI y operadores humanos, este documento garantiza que la construcción del proyecto se mantenga ordenada, predecible y orientada a la excelencia estructural requerida para la Versión 1.0.
