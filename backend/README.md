# RF_Observatory - Backend

## Inicialización Técnica (Sprint 1)

Este es el proyecto Backend para RF_Observatory, inicializado con Node.js, Express y TypeScript.

### Arquitectura de Despliegue
- El Backend será ejecutado dentro de una **infraestructura Docker**.
- El entorno oficial de despliegue es el **servidor Linux (iotsys.cloud)**.
- El sistema operativo Windows se utiliza de manera exclusiva para editar código, usar Git y sincronizar cambios, y **no es el entorno oficial de ejecución**.

### Scripts disponibles
*Nota: Los comandos listados a continuación son exclusivamente herramientas internas de desarrollo y compilación. NO representan la forma oficial de despliegue ni ejecución del sistema.*
- `npm run dev`: Inicia el servidor de desarrollo local (herramienta interna).
- `npm run build`: Compila el código TypeScript a JavaScript en `dist/` (herramienta interna).
- `npm start`: Inicia el servidor compilado (herramienta interna).
- `npm run lint`: Ejecuta ESLint para analizar el código.

### Estructura de carpetas
- `src/config/`: Configuraciones.
- `src/controllers/`: Controladores de los endpoints.
- `src/services/`: Lógica de negocio.
- `src/repositories/`: Acceso a la base de datos.
- `src/domain/`: Reglas de dominio del proyecto.
- `src/routes/`: Declaración de rutas de la API.
- `src/middleware/`: Middlewares de Express.
- `src/utils/`: Utilidades genéricas.
- `src/types/`: Tipos específicos de TypeScript para el backend.
- `tests/`: Pruebas unitarias y de integración.

### Persistencia y Base de Datos (Sprint 3)
El proyecto utiliza **PostgreSQL** y **Prisma**. El Modelo del Dominio es la única fuente de verdad; Prisma actúa como traductor de persistencia (Clean Architecture). 

**Configuración del entorno:**
1. Copiar `.env.example` a `.env`.
2. Configurar la variable `DATABASE_URL` (Ej: `postgresql://user:pass@localhost:5432/rf_observatory`). **Nunca subir credenciales reales al repositorio.**

**Manejo del Esquema Prisma (`prisma/schema.prisma`):**
- **Formateo:** `npx prisma format` (Alinea y limpia el código).
- **Validación:** `npx prisma validate` (Verifica sintaxis pura sin conectar a la DB).

**Ejecución de futuras migraciones (Regla DI-001):**
*Todas las migraciones deben ser reproducibles desde cero.*
- Crear nueva migración: `npx prisma migrate dev --name <nombre_descriptivo>` (Requiere que PostgreSQL esté levantado).
- Jamás alterar la base de datos de forma manual; cualquier cambio debe ser registrado en una migración versionada.
