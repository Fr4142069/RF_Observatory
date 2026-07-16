export class ComparisonResult {
  constructor(
    public readonly id: string,
    public readonly sourceFingerprintId: string,
    public readonly targetFingerprintId: string,
    public readonly similarityLevel: 'EXACT' | 'FAMILY' | 'COMPATIBLE' | 'RELATED' | 'POSSIBLE' | 'UNKNOWN',
    public readonly confidenceTier: 'TIER_1' | 'TIER_2' | 'TIER_3',
    public readonly engineUsed: string,
    public readonly executedAt: Date,
    public readonly status: 'AUTO_RESOLVED' | 'PENDING_REVIEW'
  ) {}
}
