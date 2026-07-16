# Sprint 2: Modelo del Dominio

## 1. Información General
- **Sprint:** 2
- **Nombre:** Modelo del Dominio
- **Estado:** Planeado

## 2. Objetivo
El propósito central de este Sprint es construir el **corazón inmutable del sistema**. Se transcribirá el Modelo de Dominio teórico (diseñado en el Sprint 0) hacia código fuente estructurado y completamente puro.
**Regla de Oro:** Todo el código escrito durante esta iteración debe ser absoluta y matemáticamente independiente de Express, React, PostgreSQL, Docker o cualquier otro framework o librería de infraestructura.

## 3. Alcance
Durante este Sprint, el esfuerzo técnico se enfocará de manera exclusiva en modelar las entidades del dominio de radiofrecuencia. Como mínimo, se deberán instanciar:
- `Session`
- `Capture`
- `Fingerprint`
- `KnownProtocol`
- `UnknownProtocol`
- `Classification`
- `Evidence`
- `DecoderResult`
- `QualityReport`

Cada entidad, sus propiedades y relaciones deberán calcar con exactitud clínica el diseño validado en el documento fundacional `02_DomainModel.md`.

## 4. Fuera del Alcance
Para prevenir el desvío de foco ("Scope Creep"), queda explícita y taxativamente prohibido durante este Sprint:
- **NO** crear API REST (endpoints, rutas).
- **NO** escribir instrucciones SQL ni migraciones.
- **NO** implementar Repositorios, Controladores ni Servicios Transaccionales.
- **NO** programar la lógica matemática de Radiofrecuencia.
- **NO** diseñar algoritmos de procesamiento de señales.
- **NO** escribir el motor de clasificación automática (IA/Heurística).

## 5. Entregables
Al finalizar el Sprint, se espera contar con:
- La totalidad de las entidades conceptuales del sistema codificadas como estructuras de datos puras.
- Un mapa relacional codificado que interconecte las entidades sin violar el aislamiento.
- Los reportes de trazabilidad (`TASK_xxx_REPORT.md`) correspondientes a cada tarea atómica ejecutada.
- El Documento de Cierre Oficial del Sprint 2.

## 6. Dependencias
Este ciclo de desarrollo requiere la validación y finalización exitosa de:
- **Sprint 0:** Arquitectura Teórica Completada (Particularmente el documento `02_DomainModel.md`).
- **Sprint 1:** Inicialización Técnica Completada y Cierre Oficial (Infraestructura base compilando, `shared/` instanciado, reglas de desarrollo congeladas).

## 7. Riesgos
- *Acoplamiento involuntario:* Riesgo de introducir dependencias espurias de red, base de datos o utilerías externas dentro del modelo puro de dominio.
- *Inconsistencia Teórica:* Riesgo de desviar la estructura de las entidades codificadas respecto al `02_DomainModel.md` original, rompiendo la arquitectura pensada en el Sprint 0.

## 8. Criterios de aceptación
El Sprint se considerará válido si y sólo si:
- Todo el dominio ha sido mapeado a código.
- El código compila sin advertencias ni errores bajo las reglas más estrictas.
- El código resultante no contiene el más mínimo rastro de dependencias de terceros relacionadas a infraestructura.
- Las relaciones entre entidades están resueltas lógicamente.

## 9. Criterios de salida
Para declarar el Sprint como concluido y habilitar el Sprint 3, debe existir:
- Todas las tareas documentadas del desglose terminadas.
- La aprobación final del Arquitecto verificando el cumplimiento de las restricciones.
- El archivo formal `SPRINT_02_CLOSEOUT.md` cerrado y firmado.

---

## 10. Desglose de Tareas (Roadmap del Sprint)
La ejecución de este Sprint se llevará a cabo mediante las siguientes tareas atómicas incrementales, verificando cada avance:

| TASK     | Objetivo                                                               |
| -------- | ---------------------------------------------------------------------- |
| TASK-001 | Construcción del núcleo del dominio (Session + Capture + relaciones)   |
| TASK-002 | Construcción del sistema de Fingerprints                               |
| TASK-003 | Construcción del catálogo de Protocolos (Known / Unknown)              |
| TASK-004 | Construcción del sistema de Clasificación                              |
| TASK-005 | Construcción del sistema de Evidencias                                 |
| TASK-006 | Construcción del sistema de Resultados (DecoderResult + QualityReport) |
| TASK-007 | Validación completa del Modelo del Dominio                             |
| TASK-008 | Documentación y cierre del Sprint                                      |
