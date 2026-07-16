# RF_Observatory - Módulo Shared

## Propósito del Módulo
Este módulo es el punto único de verdad para los tipos, interfaces, DTOs (Data Transfer Objects) y constantes comunes entre el **Backend** y el **Frontend** de RF_Observatory. Su objetivo es evitar la duplicación de código y asegurar consistencia contractual entre ambos entornos de manera agnóstica.

## Relación con Backend y Frontend
Tanto el Backend como el Frontend importarán este módulo como dependencia para sus procesos. Toda modificación estructural en el ecosistema (por ejemplo, el Modelo de Dominio) se debe reflejar primeramente aquí para asegurar que las validaciones y tipados fluyan de extremo a extremo sin inconsistencias.

## Reglas de utilización
- **Independencia funcional:** Este módulo es puramente conceptual y estructural. **NO** debe contener lógica de negocio ejecutable, servicios transaccionales, dependencias de bibliotecas de Node.js nativas ni dependencias del DOM del navegador web. 
- **Consistencia:** Todo tipo exportado desde aquí debe ser aplicable tanto en el servidor como en los componentes de React.

## Estado actual (Sprint 1)
*Nota importante:* Durante este Sprint de Inicialización Técnica, este módulo **NO contiene elementos, tipos, DTOs ni interfaces del dominio RF**. Únicamente se encuentra instanciada su estructura base, reglas de compilación y análisis de código (linters).
