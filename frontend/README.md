# RF_Observatory - Frontend

## Propósito del Módulo
Este módulo conforma la interfaz de usuario gráfica de **RF_Observatory**, diseñada para permitir a los investigadores explorar catálogos de radiofrecuencia, revisar evidencias, visualizar *Fingerprints* y auditar los resultados emitidos por el motor de clasificación.

## Relación con RF_Observatory y Backend
El Frontend es un consumidor estricto de la API REST provista por el Backend. No realiza lógica pesada de decodificación RF ni mantiene estado persistente propio; su función principal es orquestar la experiencia visual sobre el Modelo de Dominio. 

## Arquitectura de Despliegue (Docker)
El Frontend **NO nace como una aplicación local independiente**. 
- El entorno oficial de ejecución permanente será una **infraestructura Docker sobre el servidor Linux (iotsys.cloud)**.
- El sistema operativo Windows se utiliza de manera exclusiva para editar código y sincronizar cambios mediante Git.

## Scripts disponibles
*Nota: Los comandos listados a continuación son exclusivamente herramientas internas de desarrollo y compilación de Vite. NO representan la estrategia oficial de despliegue ni la forma en que el sistema operará en producción.*
- `npm run dev`: Inicia el servidor local de desarrollo (hot-reload).
- `npm run build`: Compila la aplicación estática para producción.
- `npm run lint`: Ejecuta el análisis de código con ESLint.
