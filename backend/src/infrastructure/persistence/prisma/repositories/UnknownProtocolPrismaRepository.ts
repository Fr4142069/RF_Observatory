import { PrismaClient } from '@prisma/client';
import { UnknownProtocolRepository } from '../../../../domain/repositories/UnknownProtocolRepository';
import { UnknownProtocol } from '../../../../domain/entities/UnknownProtocol';

/**
 * @class UnknownProtocolPrismaRepository
 * @description
 * Materializa el contrato `UnknownProtocolRepository` mediante Prisma.
 * @implements {UnknownProtocolRepository}
 */
export class UnknownProtocolPrismaRepository implements UnknownProtocolRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<UnknownProtocol | null> {
    const protocol = await this.prisma.unknownProtocol.findUnique({ where: { id } });
    return protocol ? (protocol as unknown as UnknownProtocol) : null;
  }

  async save(protocol: UnknownProtocol): Promise<void> {
    const data = protocol as any;
    await this.prisma.unknownProtocol.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.unknownProtocol.delete({ where: { id } });
  }
}
