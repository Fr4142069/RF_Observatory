# Guías de Desarrollo (Development Guidelines)

## 1. Objetivo
El presente documento establece las reglas fundamentales de gobernanza, estilo y comportamiento metodológico del proyecto **RF_Observatory**. Su lectura y adopción son de carácter **obligatorio** para cualquier integrante, desarrollador humano o agente de Inteligencia Artificial que escriba código, documente o interactúe técnica y organizativamente con este repositorio.

## 2. Filosofía del proyecto
Toda acción ejecutada bajo este proyecto debe guiarse por los siguientes principios:
- **Documentar antes de implementar:** Ninguna línea de código de negocio puede ser escrita si no responde a un diseño o Historia de Usuario previamente aprobada.
- **Sin cambios silenciosos:** Queda prohibido introducir alteraciones arquitectónicas o refactorizaciones profundas sin autorización previa del arquitecto o responsable técnico.
- **Trabajo por Sprints:** El desarrollo es incremental, finito y predecible. No se saltan iteraciones.
- **Trazabilidad absoluta:** Cada tarea debe poder rastrearse hacia su respectivo documento de requerimientos o issue técnico (Ej. TASK_REPORT).
- **Cambios atómicos:** Se priorizan las entregas pequeñas, frecuentes y verificables por sobre los desarrollos masivos que bloquean el proceso de integración.

## 3. Convenciones de código
Independientemente del lenguaje de programación, el código base de RF_Observatory debe reflejar excelencia y madurez técnica:
- **Legibilidad:** El código debe ser auto-explicativo. Se escribe para que lo lean humanos o inteligencias posteriores; las computadoras son el lector secundario.
- **Simplicidad:** Rechazo sistemático a la sobre-ingeniería. Se resuelve el problema que tenemos hoy, no un escenario especulativo futuro.
- **Consistencia:** Respeto estricto a las reglas de los linters (`.eslintrc.json`) y formatters (`.prettierrc`) acordados en todo el ecosistema.
- **Modularidad:** Construir piezas pequeñas y reutilizables en lugar de archivos monolíticos difíciles de testear.
- **Responsabilidad Única:** Cada función, archivo o clase debe resolver un único problema o dominar un único concepto.

## 4. Convenciones de Git
La manipulación del sistema de control de versiones obedecerá a principios claros y protectores:
- **Ramas:** El trabajo debe estar aislado en ramas lógicas que eviten corromper la línea principal de integración.
- **Commits:** Mensajes imperativos, descriptivos y atómicos. No se admite amontonar cambios inconexos bajo un mismo commit (ej. "Varios arreglos").
- **Pull Requests:** Punto obligatorio de convergencia y escrutinio técnico antes de fusionar el código a ramas estables.
- **Revisiones:** Ningún código funcional es definitivo hasta ser revisado por un par humano o agente supervisor buscando brechas lógicas.

## 5. Convenciones de documentación
La literatura técnica de RF_Observatory es tan valiosa como su código:
- **Actualizar metódicamente:** Todo cambio en la infraestructura, API o flujos debe desencadenar la inmediata actualización de la documentación correspondiente.
- **Mantenimiento de README:** Los README de cada módulo deben mantener siempre su propósito claro y advertencias vigentes.
- **Evolución del CHANGELOG / Sprints:** Los logros técnicos se asientan de manera inmutable al cierre de cada tarea o iteración.

## 6. Trabajo con Agentes AI
Dado el entorno híbrido de este proyecto, los agentes operan bajo restricciones metodológicas severas:
- **No improvisar:** El agente se limita estrictamente a resolver el mandato recibido.
- **No modificar arquitectura:** Cualquier optimización que altere el flujo, estructura o herramientas debe ser consultada y aprobada antes de implementarse.
- **No mejoras no aprobadas:** Evitar la tentación de refactorizar partes colindantes al área de trabajo sin ser ordenado explícitamente.
- **No cambiar decisiones congeladas:** Respeto íntegro por los documentos de diseño fundacionales.
- **Trabajar únicamente sobre la tarea asignada:** Mantener el encapsulamiento absoluto.

## 7. Gestión de Cambios
Un proyecto escalable es capaz de rectificar su curso sin caos:
- **Regla de Ingeniería RF_Observatory-001 (Congelamiento de Capas):** A partir del Sprint 3, **ningún Sprint volverá a modificar una capa ya aprobada**. Las ideas nuevas no cambian el proyecto por sí solas. Si un nuevo motor o capa necesita algo nuevo, deberá adaptarse a las capas existentes o abrir un proceso formal de cambio arquitectónico (ADR), pero jamás modificar unilateralmente el diseño de una iteración ya cerrada.
- **Architecture Decision Records (ADR):** Toda decisión irreversible, de infraestructura pesada, integración externa o impacto generalizado debe resolverse abriendo un documento oficial.
- **Actualización Documental Simple:** Ajustes menores de nomenclatura o correcciones lógicas se gestionarán actualizando directamente la documentación viva afectada y detallando el suceso en el `PROJECT_CASEBOOK.md`.

## 8. Definición de "Terminado"
Una tarea en RF_Observatory se considera formal y completamente finalizada exclusivamente cuando:
1. Satisface explícitamente todos los Criterios de Aceptación especificados en su mandato.
2. Cumple con la trazabilidad exigida (Generación de su respectivo `TASK_xxx_REPORT.md`).
3. El código generado pasa exitosamente todos los análisis estáticos (Linters/TypeScript).
4. El cambio fue validado y aprobado por el Arquitecto del proyecto.

## 9. Resumen
Las directrices aquí plasmadas componen la carta magna técnica de RF_Observatory y son obligatorias durante toda la vida del proyecto. Su propósito trasciende lo punitivo; buscan garantizar un marco de seguridad donde tanto ingenieros humanos como agentes AI puedan construir con la certeza de que el software evolucionará bajo orden, calidad sostenida y alineación arquitectónica inviolable.
