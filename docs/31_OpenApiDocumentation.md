# Documentación OpenAPI / Swagger

**Proyecto:** RF_Observatory  
**Estado:** Activo  

## 1. Organización y Filosofía de la API
Como define la Decisión Arquitectónica **DA-051**, la API REST del Observatorio no expone un CRUD genérico, sino verbos y acciones de negocio (RPC over HTTP). Por este motivo, la organización y tagueo de Swagger se estructuran alrededor de flujos lógicos y no meramente tablas de base de datos.

Los *tags* (agrupadores) principales son:
1. **Captures:** Flujos de entrada pasivos.
2. **Evidence:** Adición de metadatos adjuntos a otras entidades empíricas.
3. **Fingerprints:** Orquestación de inferencia y algoritmos comparativos.
4. **Protocols:** Ciclo de vida y gobernanza del conocimiento.
5. **Search:** Motor transversal de consulta científica.

## 2. Versionado
Actualmente todo el despliegue opera bajo `/api/v1`. El contrato oficial estipula que `v1` nunca cambiará retrospectivamente. Todo Payload y Respuesta, ya sea `Success` o `Error`, están fuertemente tipados utilizando el envoltorio oficial (`ResponseFactory` y `ErrorFactory`).

## 3. Generación y Mantenimiento de OpenAPI
El archivo fuente unificado se encuentra en `backend/openapi.yaml`.  
Se eligió OpenAPI 3.0 para estandarizar contratos y tipos.
*   El esquema base (`schemas`) aloja el Contrato Universal de Errores acordado en TASK-003, y el de Éxitos de TASK-004.
*   Todo endpoint mapea `422` como error semántico (falla en `Validator`), y `500` como pánico no capturado.

## 4. Cómo Publicar Swagger UI
Para dotar de una interfaz gráfica a esta documentación existen dos caminos soportados por el ecosistema de RF_Observatory:
1. **Vía Express Middleware (Recomendado):** Añadir el paquete `swagger-ui-express` y montarlo (ej: en `/api/docs`) que sirve el archivo `openapi.yaml` directamente en el `ServerBootstrap`.
2. **Vía Externa:** Importando el `openapi.yaml` a clientes como Postman, Insomnia, o montando un contenedor `swaggerapi/swagger-ui` de Docker que lea el YAML.

**Importante:** La documentación debe reflejar rigurosamente la implementación. No documenta intenciones, documenta el código real.
