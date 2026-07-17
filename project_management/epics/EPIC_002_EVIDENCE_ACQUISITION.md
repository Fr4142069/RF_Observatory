# EPIC-002: Evidence Acquisition

## Objetivo Estratégico
Evolucionar la capacidad de ingesta del ecosistema, transitando del concepto restrictivo de "Captura RF de pulsos" al paradigma holístico de **Adquisición de Evidencia**.
Esta Epic busca dotar al Observatorio de la capacidad de amalgamar múltiples fuentes empíricas (imágenes, espectro, binarios, audios) para respaldar la caracterización de un protocolo o fingerprint.

## Capacidad a Demostrar
- Un investigador puede subir al Observatorio no solo el tren de pulsos (LCP), sino también adjuntar una fotografía del PCB (Placa de Circuito Impreso) del mando, una captura de pantalla del análisis SDR y un volcado hexadecimal de la memoria del chip.
- Toda esta evidencia se agrupa bajo un mismo identificador de investigación o sesión, permitiendo futuras clasificaciones multidisciplinares.

## Tareas Propuestas (Para Sprints Futuros)
- [ ] Ampliación de la API REST para soportar uploads multipart/binary.
- [ ] Definición del Modelo Canónico (CDM) para el tipo `Evidence`.
- [ ] Modificación de la UI (Frontend Dashboard) para visualizar adjuntos.
- [ ] Integración del Lab Agent para despachar archivos estáticos.

## Restricción Táctica Actual
**⚠️ ATENCIÓN:** Esta Epic está planificada para el futuro (Sprint 7 en adelante). Durante el Sprint 6 actual, el objetivo innegociable se mantiene sobre la **DO-001 (Primera Captura Física)** utilizando exclusivamente pulsos RF básicos, a fin de validar la base de la plataforma de punta a punta antes de incrementar el alcance del dominio.
