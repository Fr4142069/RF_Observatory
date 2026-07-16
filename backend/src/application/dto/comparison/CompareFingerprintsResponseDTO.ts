export interface ComparisonResultDTO {
  readonly id: string;
  readonly targetFingerprintId: string;
  readonly similarityLevel: string;
  readonly confidenceTier: string;
  readonly status: string;
}

export interface ComparisonSummaryDTO {
  readonly sourceFingerprintId: string;
  readonly evaluatedAt: Date;
  readonly totalCandidatesEvaluated: number;
  readonly matches: ComparisonResultDTO[];
}
