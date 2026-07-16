export interface FingerprintResponseDTO {
  readonly fingerprintId: string;
  readonly captureId: string;
  readonly frequencyValueHertz: number;
  readonly modulationType: string;
  readonly generatedAt: Date;
}
