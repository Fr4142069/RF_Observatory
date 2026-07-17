# EXP-001: First Live Capture

## 1. Información General
- **Epic:** EPIC-001 (Laboratory Integration)
- **Tipo de Experimento:** Vertical Slice E2E
- **Estado:** PREPARADO (Esperando hardware en laboratorio)

## 2. Hipótesis
Si un pulso RF físico es detectado por el módulo receptor del ESP32 y volcado como JSON por su puerto Serial, el `RF_Lab_Agent` debe ser capaz de atraparlo asíncronamente y derivarlo vía HTTP hacia la API del `RF_Observatory`, resultando en la creación exitosa del registro transaccional en la base de datos PostgreSQL, sin que intervenga ninguna capa de heurística, clasificación ni manipulación de dominio intermedio en el Agente.

## 3. Configuración del Experimento (Setup)
- **Hardware Origen:** ESP32 + Módulo RF 433MHz (Receptor).
- **Emisor Físico:** Control remoto de garaje o llavero RF genérico (ASK/OOK).
- **Laboratorio:** Windows PC conectado al ESP32 (vía USB/Serial).
- **Backend:** `RF_Observatory` ejecutándose localmente (`localhost:3000`).
- **Base de Datos:** PostgreSQL viva y estructurada (Prisma).

## 4. Metodología de Ejecución
1. Levantar contenedor o servicio nativo de PostgreSQL.
2. Ejecutar `npx prisma db push` para asegurar esquema vigente.
3. Iniciar el servidor central (`npm run start:dev` en `/backend`).
4. Iniciar el Agente de Laboratorio (`npx ts-node src/index.ts` en `/rf_lab_agent`).
5. Apretar físicamente un botón del mando transmisor.
6. Observar los logs en la consola del Agente (Latencia y requestId).
7. Observar los logs en el backend (Zod Validation & Controller).
8. Consultar la tabla `Capture` en PostgreSQL para asegurar la persistencia del payload íntegro.

## 5. Resultados
*(Esta sección será documentada una vez el ensayo de laboratorio sea efectuado empíricamente)*
- [ ] Tiempo de tránsito percibido: 
- [ ] requestId generado:
- [ ] Incidencias (si las hubo): 

## 6. Conclusiones y Próximos Pasos
*(A documentar post-experimento)*
