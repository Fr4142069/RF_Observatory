import { PrismaClient } from '@prisma/client';
import { QualityReportRepository } from '../../../../domain/repositories/QualityReportRepository';
import { QualityReport } from '../../../../domain/entities/QualityReport';

/**
 * @class QualityReportPrismaRepository
 * @description
 * Adaptador físico de la base de datos para la entidad de calidad `QualityReport`.
 * @implements {QualityReportRepository}
 */
export class QualityReportPrismaRepository implements QualityReportRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByCaptureId(captureId: string): Promise<QualityReport | null> {
    const report = await this.prisma.qualityReport.findUnique({
      where: { captureId },
    });
    return report ? (report as unknown as QualityReport) : null;
  }

  async save(report: QualityReport): Promise<void> {
    const data = report as any;
    await this.prisma.qualityReport.upsert({
      where: { captureId: data.captureId },
      update: data,
      create: data,
    });
  }
}
