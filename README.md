# RF Observatory

**RF Observatory** es la plataforma web centralizada e independiente diseñada para convertirse en la base de conocimiento mundial del ecosistema SmartAccess para protocolos de radiofrecuencia (RF).

> **⚠️ AVISO IMPORTANTE:** Este proyecto **NO** es un clonador de controles remotos. Su objetivo es puramente analítico, de investigación y clasificación. No desarrolla firmware ni controla hardware.

## 🎯 Misión
Nuestra misión es recopilar, almacenar, clasificar, estudiar y documentar capturas RF provenientes de laboratorios, usuarios y futuros dispositivos compatibles.

El objetivo principal es:
- Capturar transmisiones RF
- Clasificarlas
- Construir una base de conocimiento
- Validar protocolos comunitariamente
- Ayudar al RF Laboratory en el descubrimiento de patrones

## 🏗️ Relación con RF-LAB
**Este proyecto es completamente independiente del firmware RF-LAB.**
No existe dependencia directa de código, y ninguno de los sistemas conoce las clases internas del otro. La única relación es mediante una API REST estandarizada.

```text
  RF Laboratory (ESP32)
        │
        ▼
    REST API
        ▲
        │
  RF Observatory
```

## 🔄 Alcance y Flujo de Trabajo
El ecosistema del Observatory procesa los datos siguiendo este pipeline:

`Entrada (Captura RF) ↓ API ↓ Base de datos ↓ Fingerprint ↓ Clasificación ↓ Validación comunitaria ↓ Base mundial de protocolos RF`

## 📚 Arquitectura
Aplicamos **Clean Architecture, SOLID y Domain Driven Design (DDD)**.
- **Backend**: Node.js, Express, TypeScript. Desacoplado del frontend.
- **Frontend**: React, Vite, Tailwind CSS.
- **Base de Datos**: PostgreSQL.
- **Infraestructura**: Dockerizado desde la primera versión.
- **Dominio Central**: Solo incluye `Capture`, `Session`, `Fingerprint`, `KnownProtocol`, `UnknownProtocol`, `Classification`, `Evidence`, `DecoderResult` y `QualityReport`.

---

## 🧠 Contexto del Proyecto (Gemini Added Memories)
Este proyecto fue inicializado siguiendo el PROTOCOLO DE CREACIÓN DE PROYECTOS (ZERO PÉRDIDA DE CONTEXTO):
- **Chat Administrador Principal**: [https://gemini.google.com/gem/9312ad494035/273f28e2b0cf8666](https://gemini.google.com/gem/9312ad494035/273f28e2b0cf8666)
- **Agente CLI**: Inicializado por Agente_2 (RF Observatory).
- **NotebookLM**: Se referencia el cuaderno del proyecto general.
- **Plantilla Maestra**: Utiliza la Plantilla Maestra de 11 Secciones para documentación técnica (ver carpeta `docs/`).
