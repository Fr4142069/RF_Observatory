import { RegisterCaptureUseCase } from '../../../../../src/application/usecases/capture/RegisterCaptureUseCase';
import { RegisterCaptureCommand } from '../../../../../src/application/commands/capture/RegisterCaptureCommand';
import { CaptureRepository } from '../../../../../src/domain/repositories/CaptureRepository';
import { ValidationException } from '../../../../../src/application/errors/ApplicationError';

// Mock de CaptureRepository
class MockCaptureRepository implements CaptureRepository {
  public captures: any[] = [];

  async save(capture: any): Promise<void> {
    this.captures.push(capture);
  }

  async findById(id: string): Promise<any> { return null; }
  async findBySessionId(sessionId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

describe('RegisterCaptureUseCase', () => {
  let useCase: RegisterCaptureUseCase;
  let mockRepo: MockCaptureRepository;

  beforeEach(() => {
    mockRepo = new MockCaptureRepository();
    useCase = new RegisterCaptureUseCase(mockRepo);
  });

  it('debería registrar una captura correctamente con datos válidos', async () => {
    const command = new RegisterCaptureCommand({
      sessionId: 'sess-123',
      frequency: 433.92,
      modulation: 'ASK',
      bandwidth: 125,
      sampleRate: 2000,
      rawSignalData: 'base64://...',
    });

    const response = await useCase.execute(command);

    expect(response.status).toBe('REGISTERED');
    expect(response.frequency).toBe(433.92);
    expect(mockRepo.captures.length).toBe(1);
    expect(mockRepo.captures[0].sessionId).toBe('sess-123');
  });

  it('debería lanzar un error de validación si falta el sessionId', async () => {
    const command = new RegisterCaptureCommand({
      sessionId: '',
      frequency: 433.92,
      modulation: 'ASK',
      bandwidth: 125,
      sampleRate: 2000,
      rawSignalData: 'base64://...',
    });

    await expect(useCase.execute(command)).rejects.toThrow(ValidationException);
  });
});
