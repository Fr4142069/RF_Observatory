# RF_Observatory: Git Workflow & Versioning

Este documento establece la política oficial (DA-013) de control de versiones y flujo de trabajo colaborativo para el ecosistema RF_Observatory.

## 1. Estrategia de Ramas (Branching Strategy)
Se utilizará un modelo simplificado basado en *Git Flow* / *Trunk Based Development*:
- **`main`**: Refleja siempre el estado de Producción. Código hiper-estable. Los commits directos están prohibidos.
- **`develop`**: Rama principal de desarrollo continuo. Contiene el trabajo entregado por los últimos Sprints.
- **`feature/*`**: Ramas efímeras creadas a partir de `develop` para abordar un Caso de Uso, TASK o funcionalidad (Ej. `feature/UC-001-register-capture`).
- **`hotfix/*`**: Ramas de emergencia creadas desde `main` para parches críticos en producción, que luego se fusionan tanto en `main` como en `develop`.

## 2. Convención de Commits (Conventional Commits)
Todo mensaje de commit debe seguir la estructura semántica universal:
`<tipo>(<scope>): <descripción>`

**Tipos permitidos:**
- `feat`: Nuevas características o implementaciones mayores (Ej. Casos de Uso, nuevos Endpoints).
- `fix`: Resolución de bugs o errores arquitectónicos.
- `chore`: Tareas de mantenimiento, actualización de dependencias, scripts.
- `docs`: Modificación o agregados a la documentación y archivos `.md`.
- `refactor`: Reescritura de código que no altera su funcionalidad externa (Ej. mejoras de rendimiento o legibilidad).
- `test`: Creación o corrección de pruebas unitarias/integración.

*Ejemplo válido:* `feat(persistence): implement Prisma repositories for core domain`

## 3. Versionado Semántico (SemVer)
El proyecto descarta versiones arbitrarias adoptando SemVer estándar (`vX.Y.Z`):
- **X (MAJOR):** Incrementa cuando hay cambios arquitectónicos incompatibles (Ej. paso a Producción `v1.0.0`).
- **Y (MINOR):** Incrementa al finalizar un Sprint mayor o un Epic funcional completo, asegurando estabilidad (Ej. `v0.4.0` para Sprint 3 completado).
- **Z (PATCH):** Incrementa tras correcciones de bugs aislados o hotfixes entre Sprints.

## 4. Política de Tags (Etiquetas)
Cada vez que un Sprint se declare "Cerrado Oficialmente" (tras la emisión de su respectivo `SPRINT_XX_CLOSEOUT.md`), se generará obligatoriamente un Tag Git anotado en la rama `develop` marcando la versión correspondiente.
- Ejemplo: `git tag -a v0.4.0 -m "Sprint 3: Persistence Layer Complete"`

## 5. Sprints, Epics e Issues
Para garantizar trazabilidad bidireccional entre el control de código y el gestor de proyectos:
- Un **Sprint** actuará estructuralmente como un **Epic**.
- Las **TASK-XXX** o **UC-XXX** actuarán como **Issues** atómicos.
- Los commits o PRs que finalicen una tarea deberán utilizar la sintaxis de cierre (Ej. `Refs: Sprint-3`, `Closes #42`).

## 6. Política de Push y Releases
- Los pushes a las ramas `feature/*` deben ser atómicos y frecuentes para evitar pérdida de trabajo local.
- Los pushes hacia `develop` ocurrirán tras el ensamblaje funcional de una tarea o vertical completa.
- La creación de **Releases** en GitHub/GitLab estará automatizada (en el futuro) cuando se empuje un nuevo Tag (`git push --tags`), empaquetando el código estable documentado y listo para el contenedor de orquestación.
