import { PrismaClient } from '@prisma/client';
import { ClassificationRepository } from '../../../../domain/repositories/ClassificationRepository';
import { Classification } from '../../../../domain/entities/Classification';

/**
 * @class ClassificationPrismaRepository
 * @description
 * Implementa `ClassificationRepository`. Encapsula la complejidad del mapeo físico 
 * (doble clave foránea en Prisma `knownProtocolId`/`unknownProtocolId`) y devuelve al Dominio 
 * una entidad `Classification` limpia.
 * 
 * @implements {ClassificationRepository}
 */
export class ClassificationPrismaRepository implements ClassificationRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByCaptureId(captureId: string): Promise<Classification | null> {
    const classification = await this.prisma.classification.findUnique({
      where: { captureId },
    });
    return classification ? (classification as unknown as Classification) : null;
  }

  async save(classification: Classification): Promise<void> {
    const data = classification as any;
    
    // Aquí es donde el Repository absorbe el "Desajuste de Impedancia".
    // El Dominio pasa 'protocolId' e 'isKnown'. Prisma requiere mapearlo a sus campos físicos.
    const prismaPayload: any = {
      id: data.id,
      captureId: data.captureId,
      confidenceScore: data.confidenceScore,
      method: data.method,
      knownProtocolId: data.isKnown ? data.protocolId : null,
      unknownProtocolId: !data.isKnown ? data.protocolId : null,
      status: data.status || 'UNKNOWN',
      scorePercentage: data.scorePercentage || 0,
      origin: data.origin || 'SYSTEM',
    };

    await this.prisma.classification.upsert({
      where: { captureId: data.captureId },
      update: prismaPayload,
      create: prismaPayload,
    });
  }

  async deleteByCaptureId(captureId: string): Promise<void> {
    await this.prisma.classification.delete({
      where: { captureId },
    });
  }
}
