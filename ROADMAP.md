# ROADMAP Estratégico por Eras

El avance del Ecosistema RF_Observatory ya no se mide en hitos de software tradicionales o Sprints puramente técnicos. Se planifica en grandes "Eras", donde cada Era habilita una nueva dimensión de capacidad operativa.

---

### Era I — Fundación ✅
**Objetivo:** Establecer la base teórica y estructural de la plataforma.
* **Componentes:** Arquitectura Hexagonal, Dominio, Persistencia, Capa de Aplicación, API REST inicial.
* **Estado:** Completada.

---

### Era II — Integración del Laboratorio 🚧
**Objetivo:** Conectar el mundo físico analógico con la abstracción digital.
* **Componentes:** RF_Lab_Agent, Pipeline físico Serial/HTTP, persistencia de evidencias crudas (LCP).
* **Restricción de Gobierno:** Ninguna nueva gran capacidad entra al roadmap hasta completar la Demostración Operativa DO-001.
* **Estado:** En Ejecución. A un paso de la DO-001 (Primera Demostración Operativa E2E).

---

### Sprint 7 — Observabilidad y Operación (El Puente)
**Objetivo:** Asegurar que el éxito de la DO-001 sea estable, monitoreable y sostenido en el tiempo.
* **Componentes:** Métricas end-to-end, Trazabilidad de cada captura, Panel de Salud del Sistema (Health Dashboard), Monitor de Gateways, Alertas por caída de laboratorios, Cola de reintentos robusta y Estadísticas de adquisición.
* **Razón:** Antes de darle "Inteligencia" (Era III) al sistema, debemos asegurarnos de que la infraestructura física y de red es confiable para operar 24/7 de forma autónoma.

---

### Era III — Inteligencia 🧠
**Objetivo:** Enseñar al Observatorio a comprender lo que escucha.
* **Componentes:** Generación matemática de Fingerprints avanzados, Algoritmos de similitud de señales, Clasificación automática sin heurística de borde, Validación estadística.
* **Estado:** Pendiente de inicio post-DO-001.

---

### Era IV — Conocimiento 📚
**Objetivo:** Transmutar datos aislados en un grafo universal de información.
* **Componentes:** Registro normativo de protocolos (Known Protocols), Múltiples Evidencias por protocolo (Fotos, SDR, RF), Knowledge Graph para inferencia de fabricante/país, Versionado histórico de conocimiento.
* **Estado:** Planificación Estratégica.

---

### Era V — Ecosistema 🌐
**Objetivo:** Abrir el motor de conocimiento al resto del mundo (SaaS).
* **Componentes:** Integración directa con SmartAccess, SDK público para Node/Python, APIs para terceros investigadores, Sistema de plugins de adquisición (ej. Wireshark RF), Dashboards especializados de Inteligencia de Señales.
* **Estado:** Horizonte Final.
