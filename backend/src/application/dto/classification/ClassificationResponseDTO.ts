export interface ClassificationResponseDTO {
  readonly classificationId: string;
  readonly captureId: string;
  readonly status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  readonly protocolId: string;
  readonly protocolType: 'KNOWN' | 'UNKNOWN';
  readonly scorePercentage: number;
  readonly classifiedAt: Date;
}
