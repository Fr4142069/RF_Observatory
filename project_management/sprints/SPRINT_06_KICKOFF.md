# SPRINT 6: Infrastructure Integration & Real Clients

**Proyecto:** RF_Observatory  
**Fase:** Integración de Infraestructura y Clientes Reales  
**Estado:** INICIO OFICIAL  
**Fecha de Kickoff:** 16 de Julio de 2026

## 1. Objetivo Principal
Validar que la arquitectura diseñada durante los cinco primeros Sprints (Domain, Application, y HTTP Delivery) funciona con **clientes reales** y **servicios de infraestructura reales**. El hito principal es conectar el laboratorio físico (ESP32/Hardware) con el Observatorio.

## 2. Objetivos Específicos
1. **Persistencia Real:** Conectar definitivamente PostgreSQL mediante Prisma.
2. **Repositorios Reales:** Sustituir las implementaciones temporales en memoria (`RepositoryFactory`) por repositorios reales (`PrismaRepository`).
3. **Cliente Real:** Consumir la API desde al menos un cliente externo (ESP32, Raspberry Pi, Frontend, CLI).
4. **Observabilidad:** Incorporar instrumentación básica (logging, health checks, métricas) requerida para la operación de un sistema distribuido.
5. **Seguridad:** Preparar la plataforma para autenticación futura (gestión de roles, credenciales).

## 3. Limitaciones Conscientes (Lo que NO se hará)
No se añadirá inteligencia compleja (Machine Learning, heurísticas automáticas complejas, o IA Generativa). Estas capacidades requieren datos operativos masivos que el sistema aún no ha recopilado. Primero se operará con datos reales; después se automatizará.

## 4. Reglas Arquitectónicas
- Las decisiones arquitectónicas (DA) aprobadas durante los Sprints 1–5 permanecen inmutables.
- No se rediseñará la arquitectura (Clean Architecture, SOLID, DIP).
- No se modificará el Dominio, a menos que se demuestre un error crítico.
- Toda nueva funcionalidad deberá conectarse a través de la infraestructura ya existente (`ResponseFactory`, `GlobalErrorHandler`, Composition Root).

## 5. Criterio de Éxito
Al finalizar el Sprint, un cliente real (ej. un microcontrolador o herramienta de laboratorio) interactuará correctamente con la API REST, y los datos fluirán a través del pipeline arquitectónico hasta quedar persistidos físicamente en PostgreSQL.
