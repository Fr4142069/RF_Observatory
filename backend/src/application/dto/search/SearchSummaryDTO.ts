import { SearchResultDTO } from './SearchResultDTO';
import { SearchCriteriaDTO } from './SearchCriteriaDTO';

export interface SearchSummaryDTO {
  readonly executedAt: Date;
  readonly criteriaApplied: SearchCriteriaDTO;
  readonly totalResults: number;
  readonly results: SearchResultDTO[];
  readonly executionTimeMs: number;
}
