export interface CompareFingerprintsRequestDTO {
  readonly sourceFingerprintId: string;
  readonly targetFingerprintId?: string; // Si no se provee, compara contra la DB
}
