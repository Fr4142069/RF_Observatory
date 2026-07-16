export interface EvidenceResponseDTO {
  readonly evidenceId: string;
  readonly captureId: string;
  readonly evidenceType: string;
  readonly status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  readonly attachedAt: Date;
}
