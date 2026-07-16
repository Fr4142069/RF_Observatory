import { PrismaClient } from '@prisma/client';
import { FingerprintRepository } from '../../../../domain/repositories/FingerprintRepository';
import { Fingerprint } from '../../../../domain/entities/Fingerprint';

/**
 * @class FingerprintPrismaRepository
 * @description
 * Implementa la interfaz `FingerprintRepository` abstrayendo la manipulación
 * de los arreglos masivos de microsegundos hacia Prisma/PostgreSQL.
 * 
 * @implements {FingerprintRepository}
 */
export class FingerprintPrismaRepository implements FingerprintRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async save(fingerprint: Fingerprint): Promise<void> {
    const data = fingerprint as any;
    await this.prisma.fingerprint.upsert({
      where: { id: data.id },
      update: {
        pulseDurationsMicroseconds: data.pulseDurationsMicroseconds,
        pulseCount: data.pulseCount
      },
      create: data,
    });
  }

  async findByCaptureId(captureId: string): Promise<Fingerprint | null> {
    const fingerprint = await this.prisma.fingerprint.findUnique({
      where: { captureId },
    });
    return fingerprint ? (fingerprint as unknown as Fingerprint) : null;
  }
}
