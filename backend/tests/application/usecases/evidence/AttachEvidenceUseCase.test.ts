import { AttachEvidenceUseCase, EvidenceRepository } from '../../../../../src/application/usecases/evidence/AttachEvidenceUseCase';
import { AttachEvidenceCommand } from '../../../../../src/application/commands/evidence/AttachEvidenceCommand';
import { CaptureRepository } from '../../../../../src/domain/repositories/CaptureRepository';
import { ClassificationRepository } from '../../../../../src/domain/repositories/ClassificationRepository';
import { FingerprintRepository } from '../../../../../src/domain/repositories/FingerprintRepository';
import { ApplicationError, ValidationException } from '../../../../../src/application/errors/ApplicationError';

// Mocks
class MockCaptureRepo implements CaptureRepository {
  async save(capture: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-capture') return { id };
    return null;
  }
  async findBySessionId(sessionId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

class MockClassRepo implements ClassificationRepository {
  async save(classification: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-class') return { id, captureId: 'capture-from-class' };
    return null;
  }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async findConfirmedByProtocolId(protocolId: string): Promise<any[]> { return []; }
  async delete(id: string): Promise<void> {}
}

class MockFpRepo implements FingerprintRepository {
  async save(fingerprint: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'valid-fp') return { id, captureId: 'capture-from-fp' };
    return null;
  }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async delete(id: string): Promise<void> {}
}

class MockEvidenceRepo implements EvidenceRepository {
  public evidences: any[] = [];
  async save(evidence: any): Promise<void> { this.evidences.push(evidence); }
}

describe('AttachEvidenceUseCase', () => {
  let useCase: AttachEvidenceUseCase;
  let mockCapRepo: MockCaptureRepo;
  let mockClassRepo: MockClassRepo;
  let mockFpRepo: MockFpRepo;
  let mockEvRepo: MockEvidenceRepo;

  beforeEach(() => {
    mockCapRepo = new MockCaptureRepo();
    mockClassRepo = new MockClassRepo();
    mockFpRepo = new MockFpRepo();
    mockEvRepo = new MockEvidenceRepo();
    useCase = new AttachEvidenceUseCase(mockCapRepo, mockClassRepo, mockFpRepo, mockEvRepo);
  });

  it('debería asociar evidencia a una Captura', async () => {
    const command = new AttachEvidenceCommand({
      targetId: 'valid-capture',
      targetType: 'CAPTURE',
      evidenceType: 'PDF',
      title: 'Datasheet',
      author: 'Investigador A',
      referenceUri: 's3://bucket/doc.pdf'
    });
    
    const response = await useCase.execute(command);
    expect(response.captureId).toBe('valid-capture');
    expect(mockEvRepo.evidences.length).toBe(1);
    expect(mockEvRepo.evidences[0].captureId).toBe('valid-capture');
  });

  it('debería asociar evidencia resolviendo desde un Fingerprint', async () => {
    const command = new AttachEvidenceCommand({
      targetId: 'valid-fp',
      targetType: 'FINGERPRINT',
      evidenceType: 'OSCILOGRAMA',
      title: 'Señal limpia',
      author: 'Investigador B',
      referenceUri: 's3://bucket/osc.png'
    });
    
    const response = await useCase.execute(command);
    expect(response.captureId).toBe('capture-from-fp');
    expect(mockEvRepo.evidences[0].captureId).toBe('capture-from-fp');
  });

  it('debería fallar si el target no existe', async () => {
    const command = new AttachEvidenceCommand({
      targetId: 'invalid-fp',
      targetType: 'FINGERPRINT',
      evidenceType: 'TEXT',
      title: 'Nota',
      author: 'A',
      textContent: 'Info'
    });
    
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });
});
