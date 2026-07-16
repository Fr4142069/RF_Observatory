import { CompareFingerprintsUseCase, FingerprintComparisonDomainService, ComparisonResultRepository } from '../../../../../src/application/usecases/comparison/CompareFingerprintsUseCase';
import { CompareFingerprintsCommand } from '../../../../../src/application/commands/comparison/CompareFingerprintsCommand';
import { FingerprintRepository } from '../../../../../src/domain/repositories/FingerprintRepository';
import { ApplicationError } from '../../../../../src/application/errors/ApplicationError';
import { ComparisonResult } from '../../../../../shared/src/domain/entities/ComparisonResult';

class MockFingerprintRepo implements FingerprintRepository {
  async save(fingerprint: any): Promise<void> {}
  async findById(id: string): Promise<any> {
    if (id === 'source-fp' || id === 'target-fp') return { id };
    return null;
  }
  async findByCaptureId(captureId: string): Promise<any> { return null; }
  async delete(id: string): Promise<void> {}
}

class MockComparisonResultRepo implements ComparisonResultRepository {
  public savedResults: ComparisonResult[] = [];
  async save(result: ComparisonResult): Promise<void> {
    this.savedResults.push(result);
  }
}

class MockComparisonDomainService implements FingerprintComparisonDomainService {
  async compare(sourceId: string, candidateIds: string[]): Promise<ComparisonResult[]> {
    if (candidateIds.includes('target-fp')) {
      return [new ComparisonResult('res-1', sourceId, 'target-fp', 'EXACT', 'TIER_1', 'mock-engine', new Date(), 'AUTO_RESOLVED')];
    }
    return [new ComparisonResult('res-2', sourceId, 'other-fp', 'FAMILY', 'TIER_2', 'mock-engine', new Date(), 'PENDING_REVIEW')];
  }
}

describe('CompareFingerprintsUseCase', () => {
  let useCase: CompareFingerprintsUseCase;
  let mockFpRepo: MockFingerprintRepo;
  let mockResultRepo: MockComparisonResultRepo;
  let mockDomainService: MockComparisonDomainService;

  beforeEach(() => {
    mockFpRepo = new MockFingerprintRepo();
    mockResultRepo = new MockComparisonResultRepo();
    mockDomainService = new MockComparisonDomainService();
    useCase = new CompareFingerprintsUseCase(mockFpRepo, mockResultRepo, mockDomainService);
  });

  it('debería coordinar la comparación 1:1 y persistir el resultado', async () => {
    const command = new CompareFingerprintsCommand({ sourceFingerprintId: 'source-fp', targetFingerprintId: 'target-fp' });
    const response = await useCase.execute(command);
    
    expect(response.sourceFingerprintId).toBe('source-fp');
    expect(response.totalCandidatesEvaluated).toBe(1);
    expect(response.matches[0].similarityLevel).toBe('EXACT');
    
    // Validar Auditoría (Persistencia)
    expect(mockResultRepo.savedResults.length).toBe(1);
    expect(mockResultRepo.savedResults[0].targetFingerprintId).toBe('target-fp');
  });

  it('debería coordinar la comparación 1:N', async () => {
    const command = new CompareFingerprintsCommand({ sourceFingerprintId: 'source-fp' });
    const response = await useCase.execute(command);
    
    expect(response.sourceFingerprintId).toBe('source-fp');
    expect(response.totalCandidatesEvaluated).toBe(0); // Mock
    expect(response.matches.length).toBe(1);
    expect(mockResultRepo.savedResults.length).toBe(1);
  });

  it('debería fallar si el source no existe', async () => {
    const command = new CompareFingerprintsCommand({ sourceFingerprintId: 'invalid-source' });
    await expect(useCase.execute(command)).rejects.toThrow(ApplicationError);
  });
});
