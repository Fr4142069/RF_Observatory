import { PrismaClient } from '@prisma/client';
import { SessionRepository } from '../../../../domain/repositories/SessionRepository';
import { Session } from '../../../../domain/entities/Session';

/**
 * @class SessionPrismaRepository
 * @description
 * Implementación de infraestructura para la interfaz `SessionRepository` utilizando Prisma.
 * Su única responsabilidad es traducir las solicitudes del Dominio a sentencias de Base de Datos.
 * 
 * @implements {SessionRepository}
 */
export class SessionPrismaRepository implements SessionRepository {
  private readonly prisma: PrismaClient;

  /**
   * @param prisma Inyección de dependencia de PrismaClient.
   */
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async save(session: Session): Promise<void> {
    const data = session as any;
    await this.prisma.session.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<Session | null> {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });
    if (!session) return null;
    return session as unknown as Session;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.session.delete({
      where: { id },
    });
  }
}
