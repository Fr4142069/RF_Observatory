import { SearchObservatoryCommand } from '../../commands/search/SearchObservatoryCommand';
import { SearchSummaryDTO } from '../../dto/search/SearchSummaryDTO';
import { SearchResultDTO } from '../../dto/search/SearchResultDTO';
import { SearchObservatoryValidator } from '../../validators/search/SearchObservatoryValidator';
import { ApplicationError } from '../../errors/ApplicationError';

// Definición de Puertos de Búsqueda Heterogénea
export interface ProtocolSearchPort {
  search(criteria: any): Promise<SearchResultDTO[]>;
}

export interface FingerprintSearchPort {
  search(criteria: any): Promise<SearchResultDTO[]>;
}

export interface EvidenceSearchPort {
  search(criteria: any): Promise<SearchResultDTO[]>;
}

export class SearchObservatoryUseCase {
  constructor(
    private readonly protocolSearchPort: ProtocolSearchPort,
    private readonly fingerprintSearchPort: FingerprintSearchPort,
    private readonly evidenceSearchPort: EvidenceSearchPort
  ) {}

  public async execute(command: SearchObservatoryCommand): Promise<SearchSummaryDTO> {
    const startTime = Date.now();
    SearchObservatoryValidator.validate(command);

    try {
      // 1. Consultar a los distintos dominios del conocimiento (Consultas Concurrentes)
      const [protocols, fingerprints, evidences] = await Promise.all([
        this.protocolSearchPort.search(command.criteria),
        this.fingerprintSearchPort.search(command.criteria),
        this.evidenceSearchPort.search(command.criteria)
      ]);

      // 2. Combinar resultados
      let combinedResults: SearchResultDTO[] = [...protocols, ...fingerprints, ...evidences];

      // 3. Eliminar duplicados (Basado en el ID único)
      const uniqueResultsMap = new Map<string, SearchResultDTO>();
      for (const result of combinedResults) {
        if (!uniqueResultsMap.has(result.id)) {
          uniqueResultsMap.set(result.id, result);
        }
      }
      combinedResults = Array.from(uniqueResultsMap.values());

      // 4. Ordenar resultados
      // Si sortBy está definido, ordenamos por ese atributo (simulado en este nivel básico).
      // Si no, podríamos tener un "matchRelevanceScore" devuelto por los puertos y ordenar por él.
      if (command.criteria.sortBy) {
        const sortBy = command.criteria.sortBy;
        const direction = command.criteria.sortDirection === 'ASC' ? 1 : -1;
        combinedResults.sort((a, b) => {
          const valA = a.attributes[sortBy] || '';
          const valB = b.attributes[sortBy] || '';
          if (valA > valB) return 1 * direction;
          if (valA < valB) return -1 * direction;
          return 0;
        });
      }

      // 5. Paginar resultados (Offset / Limit)
      const offset = command.criteria.offset || 0;
      const limit = command.criteria.limit || combinedResults.length;
      const paginatedResults = combinedResults.slice(offset, offset + limit);

      const endTime = Date.now();

      // 6. Construir Resumen
      return {
        executedAt: new Date(),
        criteriaApplied: command.criteria,
        totalResults: combinedResults.length,
        results: paginatedResults,
        executionTimeMs: endTime - startTime
      };
    } catch (error: any) {
      throw new ApplicationError('SEARCH_FAILED', `La consulta al Observatorio falló: ${error.message}`);
    }
  }
}
