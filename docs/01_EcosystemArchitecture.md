# Arquitectura del Ecosistema v1.0

## 1. El Mapa Completo
RF_Observatory ha dejado de ser solo un backend para convertirse en la "Plataforma de Ingeniería Inversa asistida por Evidencia" definitiva.

```text
                    ┌──────────────────────────────┐
                    │        Web Frontend          │
                    └──────────────┬───────────────┘
                                   │
                            REST / OpenAPI
                                   │
                                   ▼
                  ┌─────────────────────────────────┐
                  │        RF_Observatory           │
                  │---------------------------------│
                  │  Application Layer              │
                  │  Knowledge Engine               │
                  │  Fingerprint Engine             │
                  │  Protocol Registry              │
                  │  Search Engine                  │
                  └──────────────┬─────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  ▼                             ▼
             PostgreSQL                  Object Storage
                  │                             │
                  └──────────────┬──────────────┘
                                 │
                     Scientific Knowledge Base

=================================================================

                 Acquisition Layer (Physical World)

        ESP32
        SDR
        Raspberry Pi
        Logic Analyzer
        RF Receiver
        Future Devices

                  │
                  ▼

            RF_Lab_Agent (Gateway)

                  │

          Laboratory Capture Protocol (LCP)

                  │

                  ▼

          RF_Observatory API
```

## 2. Visión v2.0: The Knowledge Graph
El valor real del Observatorio a futuro no radicará en las capturas planas, sino en sus **Relaciones**. 
En lugar de una base de datos tabular, el sistema mutará hacia un "Knowledge Graph" (Grafo de Conocimiento).

**Ejemplo de Trazabilidad (DA-062):**
El conocimiento siempre será trazable hasta la evidencia cruda inalterada.
```text
[ Remote Control ]
       │
       ▼
   ( Capture ) ───────────────┐
       │                      │
       ▼                      ▼
  ( Evidence )         ( PCB Photograph )
       │                      │
       ▼                      │
( Fingerprint 8 )             │
       │                      │
       ▼                      ▼
 ( Protocol ) ◄─────── ( Manufacturer )
       │
       ▼
[ NICE FLOR-S ]
```

Si el algoritmo de inferencia matemática ("Fingerprint Engine") cambia en la v3.0, simplemente se re-calculan todos los nodos del grafo partiendo nuevamente de la `Evidence` inmutable, garantizando la reproducibilidad científica absoluta de cada conclusión.
