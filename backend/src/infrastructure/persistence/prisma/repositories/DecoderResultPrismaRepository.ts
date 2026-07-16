import { PrismaClient } from '@prisma/client';
import { DecoderResultRepository } from '../../../../domain/repositories/DecoderResultRepository';
import { DecoderResult } from '../../../../domain/entities/DecoderResult';

/**
 * @class DecoderResultPrismaRepository
 * @description
 * Materializa la persistencia de resultados de decodificación usando Prisma.
 * @implements {DecoderResultRepository}
 */
export class DecoderResultPrismaRepository implements DecoderResultRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByCaptureId(captureId: string): Promise<DecoderResult | null> {
    const result = await this.prisma.decoderResult.findUnique({
      where: { captureId },
    });
    return result ? (result as unknown as DecoderResult) : null;
  }

  async save(result: DecoderResult): Promise<void> {
    const data = result as any;
    await this.prisma.decoderResult.upsert({
      where: { captureId: data.captureId },
      update: data,
      create: data,
    });
  }
}
