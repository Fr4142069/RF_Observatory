# Módulo de Base de Datos (Database)

## Propósito
Este módulo consolida toda la estructura documental, scripts y migraciones necesarias para el diseño e implementación del motor de persistencia del proyecto **RF_Observatory**. Su objetivo es mantener el control de versiones sobre la estructura de los datos de manera aislada y robusta.

## Relación con el Modelo de Dominio y el Backend
Este directorio albergará la materialización física del `02_DomainModel.md`. El Backend consumirá la base de datos resultante para orquestar la lógica de negocio, pero será este módulo `database/` quien gobierne normativamente cómo se construyen las tablas, tipos de datos y cómo evolucionan a lo largo del tiempo.

## Relación con PostgreSQL
**RF_Observatory** utilizará de forma exclusiva PostgreSQL como motor relacional primario. Los scripts, esquemas y archivos de volcado almacenados aquí estarán estrictamente orientados y optimizados para el dialecto de PostgreSQL.

## Estrategia General de Persistencia
La base de datos seguirá una estrategia de control estricto:
- Las estructuras lógicas (diagramas ER y SQL base) se diseñarán en `schemas/`.
- Los cambios y evolución histórica se versionarán en `migrations/`.
- La data inicial (Ej. diccionarios teóricos precargados de Protocolos Conocidos) se inyectará desde `seeds/`.
- Las contingencias y volcados (dumps) residirán en `backup/`.
- El mantenimiento automatizado se apoyará en `scripts/`.

## Estado actual (Sprint 1)
*ATENCIÓN:* Durante el presente Sprint de Inicialización Técnica, **NO existe todavía una Base de Datos implementada ni configurada**. No se han escrito scripts SQL, no hay esquemas creados y no existe contenedor Docker operando. Este módulo se encuentra preparado única y exclusivamente a nivel estructural y documental. Su diseño, creación y materialización relacional evolucionará exclusivamente cuando se ejecute el **Sprint 3 (Persistencia)**.
