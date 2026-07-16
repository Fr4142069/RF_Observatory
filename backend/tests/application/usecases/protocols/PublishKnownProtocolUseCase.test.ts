import { PublishKnownProtocolUseCase, KnownProtocolRepository } from '../../../../../src/application/usecases/protocols/PublishKnownProtocolUseCase';
import { PublishKnownProtocolCommand } from '../../../../../src/application/commands/protocols/PublishKnownProtocolCommand';
import { KnownProtocol } from '../../../../../shared/src/domain/entities/KnownProtocol';
import { ApplicationError } from '../../../../../src/application/errors/ApplicationError';

class MockKnownProtocolRepo implements KnownProtocolRepository {
  public savedProtocols: KnownProtocol[] = [];
  
  constructor() {
    this.savedProtocols.push(new KnownProtocol('draft-1', 'Proto Draft', 'DRAFT', new Date()));
    this.savedProtocols.push(new KnownProtocol('pub-1', 'Proto Pub', 'PUBLISHED', new Date()));
    this.savedProtocols.push(new KnownProtocol('dep-1', 'Proto Dep', 'DEPRECATED', new Date()));
    this.savedProtocols.push(new KnownProtocol('draft-no-fp', 'Proto Empty', 'DRAFT', new Date()));
  }

  async findById(id: string): Promise<KnownProtocol | null> {
    return this.savedProtocols.find(p => p.id === id) || null;
  }
  
  async save(protocol: KnownProtocol): Promise<void> {
    const index = this.savedProtocols.findIndex(p => p.id === protocol.id);
    if (index >= 0) {
      this.savedProtocols[index] = protocol;
    }
  }
  
  async getAssociatedFingerprintsCount(protocolId: string): Promise<number> {
    if (protocolId === 'draft-no-fp') return 0;
    return 5;
  }
}

describe('PublishKnownProtocolUseCase', () => {
  let useCase: PublishKnownProtocolUseCase;
  let mockRepo: MockKnownProtocolRepo;

  beforeEach(() => {
    mockRepo = new MockKnownProtocolRepo();
    useCase = new PublishKnownProtocolUseCase(mockRepo);
  });

  it('debería certificar y publicar un protocolo correctamente', async () => {
    const command = new PublishKnownProtocolCommand({
      protocolId: 'draft-1',
      approvedBy: 'AdminUser'
    });

    const result = await useCase.execute(command);
    
    expect(result.protocolId).toBe('draft-1');
    expect(result.status).toBe('PUBLISHED');
    expect(result.approvedBy).toBe('AdminUser');
    
    const saved = await mockRepo.findById('draft-1');
    expect(saved?.status).toBe('PUBLISHED');
  });

  it('debería fallar si el protocolo no existe', async () => {
    const command = new PublishKnownProtocolCommand({ protocolId: 'invalid', approvedBy: 'User' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería fallar si ya está publicado', async () => {
    const command = new PublishKnownProtocolCommand({ protocolId: 'pub-1', approvedBy: 'User' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería fallar si está deprecado', async () => {
    const command = new PublishKnownProtocolCommand({ protocolId: 'dep-1', approvedBy: 'User' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería fallar si no tiene evidencias mínimas (fingerprints)', async () => {
    const command = new PublishKnownProtocolCommand({ protocolId: 'draft-no-fp', approvedBy: 'User' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });
});
