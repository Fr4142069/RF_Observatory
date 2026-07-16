import { PrismaClient } from '@prisma/client';

// Importación de las implementaciones concretas de la infraestructura
import { SessionPrismaRepository } from '../persistence/prisma/repositories/SessionPrismaRepository';
import { CapturePrismaRepository } from '../persistence/prisma/repositories/CapturePrismaRepository';
import { FingerprintPrismaRepository } from '../persistence/prisma/repositories/FingerprintPrismaRepository';
import { KnownProtocolPrismaRepository } from '../persistence/prisma/repositories/KnownProtocolPrismaRepository';
import { UnknownProtocolPrismaRepository } from '../persistence/prisma/repositories/UnknownProtocolPrismaRepository';
import { ClassificationPrismaRepository } from '../persistence/prisma/repositories/ClassificationPrismaRepository';
import { EvidencePrismaRepository } from '../persistence/prisma/repositories/EvidencePrismaRepository';
import { DecoderResultPrismaRepository } from '../persistence/prisma/repositories/DecoderResultPrismaRepository';
import { QualityReportPrismaRepository } from '../persistence/prisma/repositories/QualityReportPrismaRepository';

/**
 * @module CompositionRoot
 * @description
 * Único punto centralizado del sistema autorizado para ensamblar las dependencias concretas.
 * Según la decisión arquitectónica DA-007, toda creación de `new PrismaClient()` o instanciación de
 * repositorios concretos debe ocurrir exclusivamente aquí.
 * 
 * @lifecycle
 * PrismaClient se instancia UNA SOLA VEZ para toda la aplicación (Singleton implícito por export).
 * Los repositorios se instancian utilizando Inyección de Dependencias vía Constructor.
 */

// 1. Instancia única y global (para el ciclo de vida de la app) del cliente físico de base de datos.
const prismaClient = new PrismaClient();

// 2. Instanciación de adaptadores físicos inyectando la dependencia requerida.
const sessionRepository = new SessionPrismaRepository(prismaClient);
const captureRepository = new CapturePrismaRepository(prismaClient);
const fingerprintRepository = new FingerprintPrismaRepository(prismaClient);
const knownProtocolRepository = new KnownProtocolPrismaRepository(prismaClient);
const unknownProtocolRepository = new UnknownProtocolPrismaRepository(prismaClient);
const classificationRepository = new ClassificationPrismaRepository(prismaClient);
const evidenceRepository = new EvidencePrismaRepository(prismaClient);
const decoderResultRepository = new DecoderResultPrismaRepository(prismaClient);
const qualityReportRepository = new QualityReportPrismaRepository(prismaClient);

/**
 * @export dependencies
 * @description
 * Objeto consolidado que agrupa todas las dependencias ensambladas de la capa de persistencia.
 * En el Sprint 4 (Application Layer), los Casos de Uso (UseCases) importarán las interfaces abstractas,
 * pero en tiempo de ejecución (runtime) recibirán los objetos de este catálogo.
 */
export const dependencies = {
  // Cliente crudo expuesto solo si fuese necesario para transacciones globales en Unit of Work, 
  // aunque se prefiere usar exclusivamente los repositorios.
  db: prismaClient, 
  
  repositories: {
    session: sessionRepository,
    capture: captureRepository,
    fingerprint: fingerprintRepository,
    knownProtocol: knownProtocolRepository,
    unknownProtocol: unknownProtocolRepository,
    classification: classificationRepository,
    evidence: evidenceRepository,
    decoderResult: decoderResultRepository,
    qualityReport: qualityReportRepository,
  },
};
