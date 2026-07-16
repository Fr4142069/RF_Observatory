import { RegisterKnownProtocolUseCase, KnownProtocolRepository, FingerprintRepository } from '../../../../../src/application/usecases/protocols/RegisterKnownProtocolUseCase';
import { RegisterKnownProtocolCommand } from '../../../../../src/application/commands/protocols/RegisterKnownProtocolCommand';
import { KnownProtocol } from '../../../../../shared/src/domain/entities/KnownProtocol';
import { ApplicationError } from '../../../../../src/application/errors/ApplicationError';

class MockKnownProtocolRepo implements KnownProtocolRepository {
  public savedProtocols: KnownProtocol[] = [];
  public associations: { protocolId: string, fingerprintId: string }[] = [];

  async findByName(name: string): Promise<KnownProtocol | null> {
    return this.savedProtocols.find(p => p.name === name) || null;
  }
  async findByAlias(alias: string): Promise<KnownProtocol | null> {
    return this.savedProtocols.find(p => p.alias === alias) || null;
  }
  async save(protocol: KnownProtocol): Promise<void> {
    this.savedProtocols.push(protocol);
  }
  async associateFingerprint(protocolId: string, fingerprintId: string): Promise<void> {
    this.associations.push({ protocolId, fingerprintId });
  }
}

class MockFingerprintRepo implements FingerprintRepository {
  async findById(id: string): Promise<any> {
    if (id === 'valid-fp-1' || id === 'valid-fp-2') return { id };
    return null;
  }
}

describe('RegisterKnownProtocolUseCase', () => {
  let useCase: RegisterKnownProtocolUseCase;
  let mockProtocolRepo: MockKnownProtocolRepo;
  let mockFpRepo: MockFingerprintRepo;

  beforeEach(() => {
    mockProtocolRepo = new MockKnownProtocolRepo();
    mockFpRepo = new MockFingerprintRepo();
    useCase = new RegisterKnownProtocolUseCase(mockProtocolRepo, mockFpRepo);
  });

  it('debería registrar un protocolo correctamente y asociar fingerprints', async () => {
    const command = new RegisterKnownProtocolCommand({
      name: 'NICE FLOR-S',
      alias: 'Flor-S',
      status: 'ACTIVE',
      frequencyHertz: 433920000,
      initialFingerprintIds: ['valid-fp-1']
    });

    const result = await useCase.execute(command);

    expect(result.name).toBe('NICE FLOR-S');
    expect(result.alias).toBe('Flor-S');
    expect(result.frequencyHertz).toBe(433920000);
    expect(result.associatedFingerprintsCount).toBe(1);
    expect(mockProtocolRepo.savedProtocols.length).toBe(1);
    expect(mockProtocolRepo.associations.length).toBe(1);
  });

  it('debería fallar por nombre duplicado', async () => {
    mockProtocolRepo.savedProtocols.push(new KnownProtocol('id1', 'NICE', 'ACTIVE', new Date()));

    const command = new RegisterKnownProtocolCommand({ name: 'NICE', status: 'ACTIVE' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería fallar por fingerprint inexistente', async () => {
    const command = new RegisterKnownProtocolCommand({
      name: 'NEW PROTO',
      status: 'DRAFT',
      initialFingerprintIds: ['invalid-fp']
    });

    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });
});
