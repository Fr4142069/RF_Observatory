import { PrismaClient } from '@prisma/client';
import { KnownProtocolRepository } from '../../../../domain/repositories/KnownProtocolRepository';
import { KnownProtocol } from '../../../../domain/entities/KnownProtocol';

/**
 * @class KnownProtocolPrismaRepository
 * @description
 * Implementación física para el contrato del catálogo de protocolos conocidos.
 * 
 * @implements {KnownProtocolRepository}
 */
export class KnownProtocolPrismaRepository implements KnownProtocolRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<KnownProtocol | null> {
    const protocol = await this.prisma.knownProtocol.findUnique({ where: { id } });
    return protocol ? (protocol as unknown as KnownProtocol) : null;
  }

  async findByName(name: string): Promise<KnownProtocol | null> {
    const protocol = await this.prisma.knownProtocol.findUnique({ where: { name } });
    return protocol ? (protocol as unknown as KnownProtocol) : null;
  }

  async findAll(): Promise<KnownProtocol[]> {
    const protocols = await this.prisma.knownProtocol.findMany();
    return protocols as unknown as KnownProtocol[];
  }

  async save(protocol: KnownProtocol): Promise<void> {
    const data = protocol as any;
    await this.prisma.knownProtocol.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}
