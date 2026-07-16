# Reporte de Tarea: TASK-002 (Sprint 2)

**Sprint:** 2 – Modelo del Dominio  
**Nombre de la Tarea:** Construcción del Sistema de Fingerprints  
**Estado:** Completada  

## Objetivo
Implementar matemáticamente la entidad `Fingerprint` y sus Objetos de Valor asociados (`Frequency`, `Modulation`) como una representación técnica abstracta e inmutable de la señal, vinculándola relacionalmente (1:1) a la entidad `Capture`.

## Archivos Creados / Modificados
- `shared/src/domain/value-objects/Frequency.ts`: Creado (Objeto de Valor para representación física sin ambigüedades).
- `shared/src/domain/value-objects/Modulation.ts`: Creado (Tipificación estricta de esquemas matemáticos permitidos).
- `shared/src/domain/entities/Fingerprint.ts`: Creado (Entidad core del subsistema, alberga las características de pulsos y preámbulos).
- `shared/src/domain/entities/Capture.ts`: Modificado para eliminar el tipo stub (`unknown`) e importar la interfaz formal de `Fingerprint`.
- `project_management/reports/TASK_002_REPORT.md`: Este documento de trazabilidad oficial.

## Relaciones Implementadas
- **Fingerprint -> Capture:** `Fingerprint` tiene un vínculo estricto forzado mediante la propiedad `captureId`.
- **Capture -> Fingerprint:** La captura posee la huella dentro de sí, cumpliendo el dictamen del agregado.

## Decisiones Tomadas
- Se diseñó el objeto de valor `Frequency` exigiendo internamente mediciones en **Hercios enteros** (`valueInHertz: number`). Esto es una decisión de dominio fundamental para evitar corrupciones de datos por errores de coma flotante clásicos de JavaScript al modelar Megahercios fraccionados (ej. 433.92 MHz).
- La modulación se materializó como un "Literal Type Union" de TypeScript (`'OOK' | 'FSK' ...`), protegiendo el sistema de strings arbitrarios erróneos y asegurando un lenguaje ubicuo inquebrantable.

## Observaciones Detectadas
- Al modelar el patrón matemático de la señal, el `02_DomainModel.md` exige "duraciones de pulsos" y "pausas" sin dictaminar una unidad de medida universal. A nivel de implementación técnica, decidí tiparlos como arreglos de números y documentar explícitamente su requerimiento en **microsegundos**, ya que es la unidad natural del ecosistema RF para IoT. Esta decisión se aplicó puramente en el código base, manteniendo sagrado e intocado el Domain Model como solicitaste.

## Restricciones Respetadas
- El Fingerprint actual **NO** calcula lógicas, **NO** infiere protocolos, **NO** clasifica y **NO** posee ningún método funcional; es una estructura pura de datos.
- Todo permanece estrictamente agnóstico (cero dependencias de infraestructura).
