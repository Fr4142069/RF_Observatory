import { PrismaClient } from '@prisma/client';
import { CaptureRepository } from '../../../../domain/repositories/CaptureRepository';
import { Capture } from '../../../../domain/entities/Capture';

/**
 * @class CapturePrismaRepository
 * @description
 * Materializa el contrato `CaptureRepository` operando sobre la tabla Capture de PostgreSQL.
 * Actúa estrictamente como adaptador de infraestructura.
 * 
 * @implements {CaptureRepository}
 */
export class CapturePrismaRepository implements CaptureRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async save(capture: Capture): Promise<void> {
    const data = capture as any;
    await this.prisma.capture.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Capture | null> {
    const capture = await this.prisma.capture.findUnique({
      where: { id },
    });
    return capture ? (capture as unknown as Capture) : null;
  }

  async findBySessionId(sessionId: string): Promise<Capture[]> {
    const captures = await this.prisma.capture.findMany({
      where: { sessionId },
    });
    return captures as unknown as Capture[];
  }

  async delete(id: string): Promise<void> {
    await this.prisma.capture.delete({
      where: { id },
    });
  }
}
