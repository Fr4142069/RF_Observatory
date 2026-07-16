# 34_PersistenceValidation

## Estrategia de Validación
La validación de persistencia (TASK-002) tiene como objetivo demostrar empíricamente que los repositorios de Prisma cumplen de manera estricta los contratos definidos por el Dominio en `backend/src/domain/repositories/`.

Se diseñó un script de prueba de integración (`scripts/validate-persistence.ts`) que ejecuta las siguientes operaciones sobre la base de datos:
1. **Create:** Inserción de entidades válidas (Capture, Evidence, Fingerprint, KnownProtocol).
2. **FindById:** Recuperación y aserción de las entidades previamente insertadas.
3. **Manejo de Errores:** Simulación de una violación de llave foránea para verificar que el `PrismaErrorMapper` intercepta el código de error `P2002/P2025` y lo traduce al objeto estándar `ApplicationError` del Dominio, evitando "fugas de tipos de Prisma".

## Ejecución (Estado Actual)
**BLOQUEADO POR INFRAESTRUCTURA (DA-055)**

*   **Entorno:** Windows (Sin instalación nativa de PostgreSQL ni disponibilidad de Docker CLI local).
*   **Decisión DA-055:** "Las pruebas de integración y persistencia deberán ejecutarse utilizando la misma tecnología que será empleada en producción." 
*   **Consecuencia:** Se descartó explícitamente el uso de `SQLite` como "parche temporal" para eludir el error `P1001` de Prisma. La validación se pospone hasta que el entorno cuente con una instancia accesible de PostgreSQL.

## Resultados, Hallazgos y Riesgos
*(Esta sección será completada una vez que PostgreSQL esté operativo y el script de validación haya concluido).*

### Casos Preparados en el Script:
- `CapturePrismaRepository`: Mapeo de `Capture` Domain Entity a Prisma Model, validación de la dependencia foránea obligatoria con `Session`.
- `EvidencePrismaRepository`: Creación y recuperación exitosa (Mapeo de ValueObjects planos).
- `FingerprintPrismaRepository`: Correcta seriación/deseriación del array `pulseDurationsMicroseconds`.
- `PrismaErrorMapper`: Aserción positiva de la interceptación de excepciones de Base de Datos y propagación hacia `ApplicationError`.

---
*Fin de reporte preliminar (Pausado por validación de entorno).*
