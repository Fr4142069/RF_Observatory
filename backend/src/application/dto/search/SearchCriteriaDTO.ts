export interface SearchCriteriaDTO {
  readonly freeText?: string;
  readonly fingerprintId?: string;
  readonly protocolId?: string;
  readonly manufacturer?: string;
  readonly alias?: string;
  readonly exactFrequencyHertz?: number;
  readonly frequencyRangeHertz?: { min: number; max: number };
  readonly modulationType?: string;
  readonly encodingType?: string;
  readonly status?: string;
  readonly confidenceTier?: string;
  readonly dateRange?: { start: Date; end: Date };
  readonly version?: string;
  readonly tags?: string[];
  readonly evidenceType?: string;
  readonly sessionId?: string;
  
  // Paginación y ordenamiento estándar
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: string;
  readonly sortDirection?: 'ASC' | 'DESC';
}
