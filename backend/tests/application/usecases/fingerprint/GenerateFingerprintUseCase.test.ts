import { GenerateFingerprintUseCase } from '../../../../../src/application/usecases/fingerprint/GenerateFingerprintUseCase';
import { GenerateFingerprintCommand } from '../../../../../src/application/commands/fingerprint/GenerateFingerprintCommand';
import { ClassificationRepository } from '../../../../../src/domain/repositories/ClassificationRepository';
import { CaptureRepository } from '../../../../../src/domain/repositories/CaptureRepository';
import { FingerprintRepository } from '../../../../../src/domain/repositories/FingerprintRepository';
import { ApplicationError, ValidationException } from '../../../../../src/application/errors/ApplicationError';

// Mocks
class MockClassificationRepo implements ClassificationRepository {
  async save(classification: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-class-id') return { id, captureId: 'valid-capture-id' };
    return null;
  }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async findConfirmedByProtocolId(protocolId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

class MockCaptureRepo implements CaptureRepository {
  async save(capture: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-capture-id') return { id };
    return null;
  }
  async findBySessionId(sessionId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

class MockFingerprintRepo implements FingerprintRepository {
  public fingerprints: any[] = [];
  async save(fingerprint: any): Promise<void> { this.fingerprints.push(fingerprint); }
  async findById(id: string): Promise<any> { return null; }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async delete(id: string): Promise<void> {}
}

describe('GenerateFingerprintUseCase', () => {
  let useCase: GenerateFingerprintUseCase;
  let mockClassRepo: MockClassificationRepo;
  let mockCapRepo: MockCaptureRepo;
  let mockFpRepo: MockFingerprintRepo;

  beforeEach(() => {
    mockClassRepo = new MockClassificationRepo();
    mockCapRepo = new MockCaptureRepo();
    mockFpRepo = new MockFingerprintRepo();
    useCase = new GenerateFingerprintUseCase(mockClassRepo, mockCapRepo, mockFpRepo);
  });

  it('debería coordinar la generación del fingerprint', async () => {
    const command = new GenerateFingerprintCommand({ classificationId: 'valid-class-id' });
    const response = await useCase.execute(command);

    expect(response.captureId).toBe('valid-capture-id');
    expect(response.frequencyValueHertz).toBeDefined();
    expect(mockFpRepo.fingerprints.length).toBe(1);
    expect(mockFpRepo.fingerprints[0].captureId).toBe('valid-capture-id');
  });

  it('debería lanzar error si la clasificación no existe', async () => {
    const command = new GenerateFingerprintCommand({ classificationId: 'invalid' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería lanzar ValidationException si no hay classificationId', async () => {
    const command = new GenerateFingerprintCommand({ classificationId: '' });
    await expect(useCase.execute(command)).rejects.toThrow(ValidationException);
  });
});
