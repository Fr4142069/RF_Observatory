import { SearchObservatoryUseCase, ProtocolSearchPort, FingerprintSearchPort, EvidenceSearchPort } from '../../../../../src/application/usecases/search/SearchObservatoryUseCase';
import { SearchObservatoryCommand } from '../../../../../src/application/commands/search/SearchObservatoryCommand';
import { SearchResultDTO } from '../../../../../src/application/dto/search/SearchResultDTO';
import { ApplicationError, ValidationException } from '../../../../../src/application/errors/ApplicationError';

// Mocks
class MockProtocolSearchPort implements ProtocolSearchPort {
  async search(criteria: any): Promise<SearchResultDTO[]> {
    if (criteria.freeText === 'NICE' || criteria.protocolId === 'p-1') {
      return [{ id: 'p-1', type: 'KNOWN_PROTOCOL', title: 'NICE FLOR-S', summary: 'Protocolo', attributes: {} }];
    }
    return [];
  }
}

class MockFingerprintSearchPort implements FingerprintSearchPort {
  async search(criteria: any): Promise<SearchResultDTO[]> {
    if (criteria.freeText === 'NICE' || criteria.fingerprintId === 'f-1') {
      return [{ id: 'f-1', type: 'FINGERPRINT', title: 'FP-1', summary: 'Huella', attributes: {} }];
    }
    return [];
  }
}

class MockEvidenceSearchPort implements EvidenceSearchPort {
  async search(criteria: any): Promise<SearchResultDTO[]> {
    return [];
  }
}

describe('SearchObservatoryUseCase', () => {
  let useCase: SearchObservatoryUseCase;
  
  beforeEach(() => {
    useCase = new SearchObservatoryUseCase(
      new MockProtocolSearchPort(),
      new MockFingerprintSearchPort(),
      new MockEvidenceSearchPort()
    );
  });

  it('debería retornar resultados combinados correctamente', async () => {
    const command = new SearchObservatoryCommand({ freeText: 'NICE' });
    const response = await useCase.execute(command);
    
    expect(response.totalResults).toBe(2);
    expect(response.results.find(r => r.type === 'KNOWN_PROTOCOL')).toBeDefined();
    expect(response.results.find(r => r.type === 'FINGERPRINT')).toBeDefined();
  });

  it('debería filtrar por protocolo especifico', async () => {
    const command = new SearchObservatoryCommand({ protocolId: 'p-1' });
    const response = await useCase.execute(command);
    
    expect(response.totalResults).toBe(1);
    expect(response.results[0].type).toBe('KNOWN_PROTOCOL');
  });

  it('debería fallar si los criterios están vacíos', async () => {
    const command = new SearchObservatoryCommand({});
    await expect(useCase.execute(command)).rejects.toThrow(ValidationException);
  });

  it('debería fallar si los rangos de frecuencia son inválidos', async () => {
    const command = new SearchObservatoryCommand({ frequencyRangeHertz: { min: 500, max: 100 } });
    await expect(useCase.execute(command)).rejects.toThrow(ValidationException);
  });

  it('debería retornar arreglo vacío si no hay coincidencias', async () => {
    const command = new SearchObservatoryCommand({ freeText: 'UNKNOWN_STRING' });
    const response = await useCase.execute(command);
    expect(response.totalResults).toBe(0);
  });
});
