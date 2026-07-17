# 41_CanonicalDataModel (CDM)

## 1. Definición y Propósito
El **Canonical Data Model (CDM)** es el "lenguaje oficial y público" del ecosistema RF. Es la estructura de datos que se expone hacia el exterior a través de la API, OpenAPI o eventos públicos. 

El propósito del CDM es abstraer completamente a los consumidores (SmartAccess, investigadores, otros Gateways) de la complejidad interna del Observatorio (Clean Architecture, Entidades de Dominio, Esquemas Prisma).

## 2. Los Cuatro Niveles de Datos
La arquitectura reconoce cuatro niveles estrictos de traducción de datos (DA-061):
1. **Nivel 1 (LCP):** El protocolo crudo emitido por el hardware en el laboratorio (Ej: `pulseCount`, tiempos).
2. **Nivel 2 (CDM):** El contrato JSON de la API. Establece la terminología unificada con la que interactúan terceros con el Observatorio.
3. **Nivel 3 (Domain):** Entidades TypeScript (Domain Models) gobernadas por reglas de negocio, encapsulamiento y heurística pura.
4. **Nivel 4 (Persistence):** Modelos de Prisma (ORM) y relaciones en PostgreSQL.

## 3. El Paradigma de "Evidence"
En el CDM, el concepto restrictivo de "Capture" (Pulsos OOK) evoluciona hacia el concepto abarcativo de **Evidence**. 
Un **Protocolo Conocido** o una **Investigación** se respalda a través de múltiples evidencias asociadas:
- *Evidence Type: RF_PULSE* (Captura tradicional).
- *Evidence Type: SDR_SPECTRUM* (Análisis I/Q).
- *Evidence Type: OSCILLOGRAM* (Traza analógica).
- *Evidence Type: IMAGE* (Foto del PCB o control remoto).
- *Evidence Type: BINARY* (Dump de firmware EEPROM).

## 4. El "Diccionario" Canónico del Ecosistema
El ecosistema hablará estandarizadamente de:
- **Evidence:** Elemento crudo recuperado de la realidad empírica. Inmutable.
- **Fingerprint:** Matriz matemática o firma digital deducida de una o varias Evidencias.
- **Known Protocol:** Definición estandarizada de un protocolo de comunicaciones (ej. NICE FLOR-S, EV1527), agnóstica a marcas comerciales.
- **Classification:** Relación probabilística ("95% de similitud") establecida por el Observatorio entre una Evidencia/Fingerprint y un Protocolo Conocido.

## 5. Criterio de Evolución
Si mañana cambiamos PostgreSQL por MongoDB (Nivel 4) o si dividimos la entidad Domain de "Protocol" en dos (Nivel 3), **el CDM (Nivel 2) debe mantenerse intacto** para no romper la integración con ningún cliente (SmartAccess o Lab Agent).
