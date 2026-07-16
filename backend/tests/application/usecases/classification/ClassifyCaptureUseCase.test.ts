import { ClassifyCaptureUseCase } from '../../../../../src/application/usecases/classification/ClassifyCaptureUseCase';
import { ClassifyCaptureCommand } from '../../../../../src/application/commands/classification/ClassifyCaptureCommand';
import { CaptureRepository } from '../../../../../src/domain/repositories/CaptureRepository';
import { ClassificationRepository } from '../../../../../src/domain/repositories/ClassificationRepository';
import { ApplicationError, ValidationException } from '../../../../../src/application/errors/ApplicationError';

// Mocks
class MockCaptureRepository implements CaptureRepository {
  async save(capture: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-capture-id') return { id };
    return null;
  }
  async findBySessionId(sessionId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

class MockClassificationRepository implements ClassificationRepository {
  public classifications: any[] = [];
  async save(classification: any): Promise<void> { this.classifications.push(classification); }
  async findById(id: string): Promise<any> { return null; }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async findConfirmedByProtocolId(protocolId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

describe('ClassifyCaptureUseCase', () => {
  let useCase: ClassifyCaptureUseCase;
  let mockCaptureRepo: MockCaptureRepository;
  let mockClassificationRepo: MockClassificationRepository;

  beforeEach(() => {
    mockCaptureRepo = new MockCaptureRepository();
    mockClassificationRepo = new MockClassificationRepository();
    useCase = new ClassifyCaptureUseCase(mockCaptureRepo, mockClassificationRepo);
  });

  it('debería coordinar la clasificación y devolver un ResponseDTO', async () => {
    const command = new ClassifyCaptureCommand({ captureId: 'valid-capture-id' });
    const response = await useCase.execute(command);

    expect(response.status).toBe('PENDING');
    expect(response.captureId).toBe('valid-capture-id');
    expect(mockClassificationRepo.classifications.length).toBe(1);
    expect(mockClassificationRepo.classifications[0].captureId).toBe('valid-capture-id');
  });

  it('debería lanzar ApplicationError si la captura no existe', async () => {
    const command = new ClassifyCaptureCommand({ captureId: 'invalid-id' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });

  it('debería lanzar ValidationException si no se provee captureId', async () => {
    const command = new ClassifyCaptureCommand({ captureId: '' });
    await expect(useCase.execute(command)).rejects.toThrow(ValidationException);
  });
});
