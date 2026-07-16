# Visión del Proyecto (Project Vision)

## 1. Propósito del proyecto
RF_Observatory es una plataforma web centralizada y de arquitectura colaborativa diseñada para convertirse en la base de conocimiento mundial del ecosistema SmartAccess para protocolos de radiofrecuencia (RF). Su objetivo es recopilar, almacenar, clasificar, estudiar y documentar capturas RF provenientes de múltiples fuentes, estableciendo un repositorio universal e independiente de análisis de señales.

## 2. Problema que resuelve
Actualmente, el conocimiento sobre protocolos RF propietarios y estandarizados se encuentra disperso, sin clasificar y es difícil de consultar de manera sistemática. No existe un repositorio estandarizado que agrupe huellas digitales (fingerprints) de protocolos, lo que dificulta la investigación, la identificación de señales desconocidas y la validación de decodificadores. RF_Observatory resuelve esta fragmentación ofreciendo una base de datos centralizada, estandarizada y verificable para todo el ecosistema de radiofrecuencia.

## 3. Objetivos
**Objetivos generales:**
- Construir la mayor base de conocimiento colaborativa sobre protocolos de radiofrecuencia.
- Centralizar el análisis y clasificación de capturas RF (archivos SARF y JSON) para facilitar la investigación de seguridad y protocolos.

**Objetivos específicos:**
- Almacenar y catalogar firmas digitales (fingerprints) de protocolos conocidos y desconocidos.
- Exponer una API REST documentada que permita la ingesta de datos desde herramientas de terceros y hardware especializado.
- Proveer herramientas de validación comunitaria para clasificar protocolos con precisión.

## 4. Alcance
**Qué hace:**
- Recibe, valida y almacena capturas de señales RF.
- Clasifica protocolos basándose en huellas (fingerprints) y metadatos extraídos.
- Construye un repositorio consultable de protocolos conocidos y desconocidos.
- Facilita la validación comunitaria y experta de las transmisiones.
- Ofrece una API REST para integración con laboratorios e investigadores externos.

**Qué NO hace:**
- No ejecuta decodificadores en tiempo real.
- No controla hardware (ni antenas, ni transceptores).
- No administra usuarios finales del sistema SmartAccess ni control de puertas.
- No reemplaza herramientas de captura ni firmware especializado.

## 5. Relación con SmartAccess
RF_Observatory es un proyecto **completamente independiente** de los sistemas SmartAccess y RF-LAB.
- **No reemplaza a SmartAccess:** No gestiona accesos, credenciales, puertas, ni usuarios del sistema de seguridad.
- **No reemplaza a RF-LAB:** El RF-LAB sigue siendo el hardware y firmware encargado de interactuar físicamente con las señales (ingeniería inversa, análisis en tiempo real).
La única relación con ambos sistemas se dará, en un futuro, mediante una integración estandarizada vía API REST, manteniendo las arquitecturas desacopladas sin que ningún sistema conozca las clases internas del otro.

## 6. Usuarios objetivo
- **Investigadores:** Analistas de seguridad y protocolos que requieren un volumen alto de datos para estudiar patrones y vulnerabilidades.
- **Desarrolladores:** Programadores que necesitan especificaciones y fingerprints para crear o validar decodificadores.
- **Integradores:** Profesionales que conectan hardware de captura y requieren enviar señales para su clasificación.
- **Comunidad:** Entusiastas de la radiofrecuencia que contribuyen con capturas y validan clasificaciones de protocolos desconocidos.

## 7. Casos de uso principales
- **Capturar protocolos:** Recibir información en bruto o estructurada (SARF, JSON) proveniente de laboratorios o usuarios.
- **Clasificar protocolos:** Analizar automáticamente características de la captura para asociarla a protocolos conocidos o catalogarla como desconocida.
- **Consultar protocolos:** Buscar en la base de datos global características específicas de una señal o protocolo.
- **Compartir conocimiento:** Proveer información documentada a la comunidad y a otros sistemas mediante la API.
- **Analizar señales:** Facilitar un espacio organizado donde las evidencias y características de la señal puedan ser revisadas.

## 8. Principios del proyecto
- **Neutralidad tecnológica:** La plataforma es agnóstica respecto al hardware que generó la captura.
- **Datos verificables:** Todas las clasificaciones y protocolos deben estar respaldados por evidencia (capturas reales, reportes de calidad).
- **No almacenar información innecesaria:** Se guardan estrictamente modelos de dominio relacionados a la señal (Capture, Session, Fingerprint, Classification), garantizando privacidad y minimizando ruido.
- **Arquitectura modular:** Diseño basado en Clean Architecture y Domain Driven Design (DDD) para facilitar la evolución.
- **Escalabilidad:** Despliegue mediante Docker desde el día uno y desacoplamiento de frontend y backend para soportar crecimiento.

## 9. Fuera del alcance
El proyecto tiene directivas estrictas de límites arquitectónicos:
- **NO clonar controles:** El sistema no emite señales ni genera secuencias para clonación.
- **NO programar controles:** No existe funcionalidad para interactuar, programar o escribir sobre dispositivos de acceso.
- **NO sustituir RF-LAB:** Las capacidades de análisis en hardware quedan reservadas para el laboratorio físico.
- **NO sustituir SmartAccess:** Las reglas de negocio sobre quién puede abrir una puerta quedan fuera de este dominio.

## 10. Visión a largo plazo
RF_Observatory aspira a convertirse en el estándar de facto y el "centro de inteligencia" mundial para la validación y clasificación de protocolos de RF en el ecosistema SmartAccess. Evolucionará hacia un ecosistema automatizado donde las capturas generadas por laboratorios remotos e investigadores se validen y enriquezcan de forma continua mediante inteligencia colectiva, transformando señales desconocidas en estándares abiertos y documentados, sirviendo de oráculo de seguridad y eficiencia para la próxima generación de sistemas de radiofrecuencia.
