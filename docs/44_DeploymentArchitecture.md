# Arquitectura de Despliegue en la Nube (Deployment Architecture)
**Destino:** `iotsys.cloud` (Droplet / Infraestructura Central)
**Módulo:** `RF_Observatory` y conexión con `RF_Laboratory`

## 1. Auditoría del Entorno Actual (`iotsys-portal`)
Tras auditar el portal `iotsys.cloud`, he extraído la topología de la infraestructura actual:
- **Orquestación:** Basado 100% en Docker y `docker-compose`.
- **Red Aislada:** Todos los microservicios conviven en una red interna cifrada (`smartaccess_smartaccess-network`).
- **API Gateway (Nginx):** El portal web utiliza Nginx no solo para servir React/Vite, sino como un Reverse Proxy que enruta el tráfico público (`/api/v1/factory/auth`, `/api/v1/`) hacia los contenedores internos (`procura-engine:4000`, `smartaccess-backend:3000`).

## 2. Estrategia de Despliegue para RF_Observatory
Para mantener la elegancia y seguridad del entorno `iotsys.cloud`, `RF_Observatory` no debe exponerse de forma directa y rudimentaria, sino integrarse como un ciudadano de primera clase en el ecosistema.

### Topología Propuesta

```mermaid
graph TD
    subgraph "Laboratorio Físico (Tu escritorio)"
        ESP32[ESP32 + RX433/315] -->|UART| Agent[RF_Lab_Agent]
    end

    subgraph "iotsys.cloud (Servidor Producción / Droplet)"
        Nginx[Nginx API Gateway / Portal]
        
        Nginx -->|/api/v1/| SA[smartaccess-backend:3000]
        Nginx -->|/api/v1/rf/| RFO[rf-observatory-backend:5000]
        
        SA <-->|Red Interna Docker| RFO
        
        RFO --> DB[(PostgreSQL)]
    end

    Agent -->|POST HTTPS (LCP Payload)| Nginx
```

### Componente 1: El Backend del Observatorio en la Nube
El `RF_Observatory` se empaquetará en un contenedor Docker (`Dockerfile`) y se inyectará en el Droplet de producción.
- **Red:** Se conectará a `smartaccess_smartaccess-network`.
- **Puerto Interno:** Escuchará en el puerto `5000` (o similar, para no chocar con el `3000` de SmartAccess).
- **Base de Datos:** Se levantará un contenedor PostgreSQL (o se añadirá una base de datos lógica al clúster existente).

### Componente 2: Modificación del Nginx (iotsys-portal)
Editaremos el `nginx.conf` del portal central para abrir una puerta segura desde el exterior hacia el observatorio.
```nginx
    # Proxy para el API de RF_Observatory
    location /api/v1/rf/ {
        set $upstream_rf rf-observatory-backend:5000;
        proxy_pass http://$upstream_rf;
        # ... (headers de seguridad)
    }
```

### Componente 3: El Laboratorio Físico (RF_Laboratory)
**El laboratorio NO se instala en la nube.** El laboratorio es físico. 
El `RF_Lab_Agent` (el gateway en Node.js que acabamos de programar) se ejecuta localmente en la PC de tu laboratorio conectada por USB al ESP32. 
Simplemente configuraremos su archivo `.env` apuntando a la nube:
`OBSERVATORY_URL=https://iotsys.cloud/api/v1/rf/captures`

## 3. Ventaja Táctica de esta Arquitectura
1. **Latencia Cero para SmartAccess:** Al estar ambos backends (`smartaccess-backend` y `rf-observatory-backend`) en la misma red interna de Docker (`smartaccess-network`), SmartAccess podrá consultar los Fingerprints internamente usando el nombre del contenedor (ej. `http://rf-observatory-backend:5000/fingerprints`), sin salir a internet, logrando respuestas en menos de 2 milisegundos.
2. **Seguridad Absoluta:** La base de datos del Observatorio no queda expuesta a Internet. Todo entra por el proxy seguro del portal.
3. **Escalabilidad Comercial:** Cumple exactamente el MVP. El laboratorio físico envía la captura real a la nube, la nube la procesa, y SmartAccess la consume al instante para abrir la puerta.
