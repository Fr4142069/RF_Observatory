# Roadmap del Proyecto (Strategic Roadmap)

## 1. Introducción
Este documento constituye el Roadmap estratégico oficial de **RF_Observatory**. Su propósito es delinear el plan completo de evolución del proyecto desde su estado de concepción (Bootstrap) hasta la estabilización de su primera versión (1.0). Este documento servirá como la guía maestra a partir de la cual se derivarán todas las iteraciones futuras, Sprints, GitHub Milestones y tableros Kanban, asegurando una progresión metodológica, predecible y controlada.

## 2. Estado actual
A la fecha de redacción de este documento, el estado del proyecto se define como:
- **Estado actual:** Bootstrap (Sprint 0).
- **Situación:** Arquitectura y especificaciones técnicas en pleno desarrollo.
- **Implementación:** Cero líneas de código escrito. Los repositorios están configurados pero el desarrollo técnico no ha iniciado.

## 3. Filosofía del desarrollo
El proyecto **RF_Observatory** evoluciona de manera estricta por **etapas secuenciales**. No se admite el desarrollo ad hoc ni la programación impulsiva.
Cada etapa está sujeta a los siguientes pasos mandatorios:
1. Ser **documentada** formalmente.
2. Ser **aprobada** por el arquitecto del proyecto.
3. Ser **implementada** por el equipo técnico.
4. Ser **validada** contra las especificaciones.

Bajo ninguna circunstancia se puede iniciar una etapa técnica sin haber completado formalmente la anterior.

## 4. Roadmap General
El ciclo de vida del desarrollo se divide en las siguientes diez fases secuenciales:

### Fase 0: Arquitectura
- **Objetivo:** Definir y congelar los planos conceptuales del sistema.
- **Resultado esperado:** Documentos de visión, modelo de dominio, flujos operativos, arquitectura del sistema y API completamente terminados.
- **Criterio de finalización:** Todos los documentos en la carpeta `docs/` están aprobados por el arquitecto.
- **Dependencias:** Ninguna.

### Fase 1: Infraestructura Base
- **Objetivo:** Inicializar el entorno tecnológico que alojará el sistema.
- **Resultado esperado:** Repositorios estructurados, configuración de linters, compiladores (TypeScript), entornos de contenedorización (Docker) e inicialización estática.
- **Criterio de finalización:** El entorno compila localmente en un contenedor vacío sin errores.
- **Dependencias:** Fase 0.

### Fase 2: Modelo de Dominio
- **Objetivo:** Traducir el documento de Dominio Conceptual a clases abstractas, tipos y DTOs en el código.
- **Resultado esperado:** Un módulo `shared/` puro, agnóstico, con las entidades del ecosistema definidas.
- **Criterio de finalización:** El modelo central del negocio existe en código y compila.
- **Dependencias:** Fase 1.

### Fase 3: Persistencia
- **Objetivo:** Materializar el Modelo de Datos en un motor de base de datos relacional.
- **Resultado esperado:** Tablas, migraciones y esquemas configurados que representen de manera normalizada el dominio.
- **Criterio de finalización:** Es posible guardar y leer entidades básicas usando repositorios.
- **Dependencias:** Fase 2.

### Fase 4: Backend
- **Objetivo:** Implementar la lógica del servidor, el enrutamiento y la API REST especificada.
- **Resultado esperado:** Endpoints funcionales para gestionar sesiones, capturas, y consultas, exponiendo JSON estructurado.
- **Criterio de finalización:** Todas las respuestas HTTP de la API cumplen con el documento `03_API.md`.
- **Dependencias:** Fase 2 y Fase 3.

### Fase 5: Frontend
- **Objetivo:** Construir la interfaz de usuario para que los investigadores y visitantes interactúen.
- **Resultado esperado:** Vistas, cuadros de mando y flujos de navegación que consuman la API REST.
- **Criterio de finalización:** Las Historias de Usuario principales referidas a visualización están materializadas en interfaces gráficas consumibles.
- **Dependencias:** Fase 4.

### Fase 6: Motor de Clasificación
- **Objetivo:** Implementar la lógica matemática y de negocio para asociar *Fingerprints* a protocolos conocidos.
- **Resultado esperado:** Algoritmos internos en el Backend capaces de emitir un veredicto o similitud basándose en la especificación de `06_RFClassification.md`.
- **Criterio de finalización:** El sistema puede clasificar automáticamente una captura de prueba.
- **Dependencias:** Fase 4.

### Fase 7: Integración
- **Objetivo:** Acoplar definitivamente el Frontend, el Backend, la Persistencia y el Motor de Clasificación.
- **Resultado esperado:** Un sistema completo funcionando extremo a extremo (End-to-End).
- **Criterio de finalización:** Un usuario puede subir una captura desde la interfaz y ver su clasificación y payload en pantalla.
- **Dependencias:** Fase 5 y Fase 6.

### Fase 8: Pruebas
- **Objetivo:** Validar la estabilidad, integridad y calidad del software integrado.
- **Resultado esperado:** Baterías de validación sobre los casos borde y flujos de negocio.
- **Criterio de finalización:** Ausencia de errores bloqueantes y completitud de las restricciones de dominio.
- **Dependencias:** Fase 7.

### Fase 9: Versión 1.0
- **Objetivo:** Estabilizar el ecosistema para su despliegue y uso real.
- **Resultado esperado:** Una plataforma madura lista para ser consumida por laboratorios (RF-LAB) y la comunidad de investigadores.
- **Criterio de finalización:** Tag oficial `v1.0.0` emitido, despliegue realizado y sistema en vivo.
- **Dependencias:** Fase 8.

## 5. Entregables
El progreso del proyecto se medirá mediante los siguientes entregables tangibles asociados a sus fases:
1. **Documentación:** Plano arquitectónico y funcional fundacional congelado (Fase 0).
2. **Modelo Compartido (`shared/`):** Tipos y abstracciones comunes (Fase 2).
3. **Base de Datos:** Esquemas lógicos y persistentes listos para producción (Fase 3).
4. **API:** Servidor backend procesando tráfico de entrada y salida (Fase 4).
5. **Frontend:** Cliente web gráfico funcional (Fase 5).
6. **Motor de clasificación:** Subsistema de negocio dedicado al análisis e identificación (Fase 6).
7. **Documentación final:** Manuales de despliegue y operación para la versión estable (Fase 9).

## 6. Criterios para avanzar
El sistema de calidad del proyecto prohíbe los atajos. No se permite:
- Pasar a la siguiente fase sin la **aprobación explícita** de los entregables de la fase en curso.
- Iniciar implementación técnica (código) sin que la **arquitectura esté completamente congelada**.
- Modificar la documentación estructural una vez congelada, sin someter el cambio a gestión.

## 7. Riesgos
El desarrollo se enfrenta a los siguientes riesgos de alto nivel que deben ser monitoreados:
- **Cambios de alcance:** La inclusión de *features* no planeados ("Feature Creep") que atenten contra la estabilidad de la v1.0.
- **Documentación incompleta:** Riesgo de divergencia si los desarrolladores asumen lógicas no especificadas en la Fase 0.
- **Dependencias externas:** Cuellos de botella provocados por actualizaciones inesperadas en librerías o plataformas base.
- **Disponibilidad de hardware:** Demoras en la recolección de capturas de prueba reales si los dispositivos físicos de captura no están operativos para los tests.

## 8. Gestión de cambios
Toda arquitectura es viva, pero su evolución debe ser rigurosa:
- **Toda modificación importante debe quedar documentada** en las especificaciones oficiales.
- **No se pueden modificar documentos aprobados sin autorización formal** (Architectural Decision Records).
- **Mantener trazabilidad:** Cualquier desvío de los flujos originales debe justificarse y rastrearse contra las Historias de Usuario iniciales.

## 9. Definición de terminado (Definition of Done)
Una fase no se considera terminada por el simple hecho de compilar. Una fase está verdaderamente concluida únicamente cuando:
1. **Documentación completa:** El código está respaldado.
2. **Revisión realizada:** Inspección técnica (Code Review) ejecutada.
3. **Aprobación del arquitecto:** El diseño se alinea con la visión del observatorio.
4. **Entregables generados:** Se han emitido los artefactos correspondientes (paquetes, contenedores, esquemas).

## 10. Visión de la versión 1.0
Al finalizar el Roadmap (Fase 9), RF_Observatory v1.0 será una plataforma centralizada y estable capaz de:
- Recibir, almacenar inmutablemente y catalogar archivos de capturas de radiofrecuencia (SARF/JSON).
- Emitir diagnósticos formales sobre la legibilidad de la señal (Quality Reports).
- Otorgar identidad (Clasificación) a señales conocidas.
- Proveer un espacio web donde investigadores puedan visualizar *Fingerprints* y auditar los resultados.
- Exponer una API REST robusta que actúe como base de conocimiento para sistemas externos, permitiendo desacoplamiento total.

## 11. Resumen
Este Roadmap es la brújula inamovible de RF_Observatory. Al segmentar un problema colosal como el análisis de protocolos de radiofrecuencia en fases incrementales de infraestructura, dominio, y lógica de negocio, se garantiza que la construcción del sistema no ceda ante el caos. Desde este documento nacen todas las acciones futuras de implementación técnica, asegurando que el observatorio nazca y evolucione sobre cimientos metodológicos indestructibles.
