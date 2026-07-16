# Reporte de Tarea: TASK-003 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Subsistema de Protocolos  
**Estado:** Completada  

## Objetivo
Implementar matemáticamente las entidades independientes `KnownProtocol` y `UnknownProtocol` como Agregados Raíz del Catálogo Documental del observatorio, abstrayéndolos por completo del motor de clasificación, decodificación y de las capturas experimentales.

## Archivos Creados / Modificados
- `shared/src/domain/entities/KnownProtocol.ts`: Creado (Entidad que alberga las reglas teóricas y documentación de un protocolo identificado).
- `shared/src/domain/entities/UnknownProtocol.ts`: Creado (Entidad que agrupa estimaciones de señales recurrentes huérfanas).
- `project_management/reports/TASK_003_REPORT.md`: Este documento de trazabilidad oficial.

## Relaciones Implementadas
- **Protocol -> Classification:** Se respetó estrictamente la regla del dominio: Un protocolo es un diccionario inmutable que NO es dueño de sus clasificaciones ni capturas. Por ende, ambas entidades carecen de arreglos internos o referencias cruzadas apuntando a Capturas. Será la futura entidad `Classification` la encargada de apuntar hacia los identificadores (`id`) de estos protocolos, preservando la inviolabilidad del Agregado Protocol.

## Decisiones Tomadas
- Se reutilizaron los Objetos de Valor creados en la TASK-002 (`Frequency` y `Modulation`) para mantener un "Lenguaje Ubicuo" cohesionado y estrictamente tipado a lo largo del sistema a la hora de estimar las propiedades de RF.
- Se implementaron propiedades teóricas descriptivas (`decodingRulesDescription`, `communityResearchNotes`) para cumplir con el alcance.

## Observaciones Detectadas
- El documento `02_DomainModel.md` menciona que `KnownProtocol` contiene "reglas de decodificación". Para respetar la restricción explícita de "NO implementar lógica RF ni algoritmos", decidí tipar dicha propiedad (`decodingRulesDescription`) como un texto puramente descriptivo. Con esta decisión, el dominio permanece inerte y estructural. El motor que ejecutará estas reglas pertenecerá inequívocamente al Sprint 6.

## Restricciones Respetadas
- **NO** se escribieron clases ejecutables, lógica heurística ni motores de inferencia.
- **NO** se acopló código de infraestructura. Todo es TypeScript puro.
