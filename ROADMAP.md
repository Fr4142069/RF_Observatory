# ROADMAP Estratégico (Basado en Capacidades)

El enfoque del proyecto ya no es "construir componentes de software", sino **demostrar capacidades observables** en el laboratorio físico. La arquitectura ya cimentó las bases; ahora el objetivo es dotar al sistema de utilidad empírica respondiendo a la misión: *Capturar, organizar, analizar y convertir señales RF reales en conocimiento reutilizable y verificable.*

## Hito 1: Primera Demostración Pública (Vertical Slice E2E)
**Capacidad:** Registrar una captura real y visualizar el resultado.
* **Flujo:** Pulsar botón (Mando RF) → Confirmación OLED → Recepción en `RF_Lab_Agent` → API responde HTTP 201 → Persistencia en PostgreSQL → Búsqueda exitosa.
* **Estado:** En ejecución (EXP-001 pausado por hardware).

## Hito 2: Primera Clasificación Automática
**Capacidad:** Encontrar automáticamente protocolos similares sin intervención humana (Cero IA/ML, pura heurística algorítmica).
* **Flujo:** Nueva Captura en DB → Generación de Fingerprint → Algoritmo de Comparación contra Base de Conocimiento → Resultado Observable ("94% similar a NICE FLOR-S").
* **Estado:** Pendiente.

## Hito 3: El Laboratorio Autónomo
**Capacidad:** Un ecosistema integral donde la captura física decanta en conocimiento público de forma autónoma.
* **Flujo:** ESP32 detecta señal desconocida → Gateway reporta al Observatorio → Motor clasifica la señal → Sistema de Evidencia la aprueba y publica → Dashboard expone la nueva métrica al mundo.
* **Condición:** Supervisión humana requerida solo para auditoría, no para el pipeline transaccional.
* **Estado:** Pendiente.

---
*Cualquier tarea futura que no tribute directamente a la consecución de uno de estos hitos o que añada complejidad innecesaria (magia) será descartada por la Dirección Técnica.*
