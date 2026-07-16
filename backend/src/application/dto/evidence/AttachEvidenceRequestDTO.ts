export type EvidenceTargetType = 'CAPTURE' | 'CLASSIFICATION' | 'FINGERPRINT';

export interface AttachEvidenceRequestDTO {
  readonly targetId: string;
  readonly targetType: EvidenceTargetType;
  readonly evidenceType: string; // FOTO, VIDEO, MANUAL, OSCILOGRAMA, etc.
  readonly title: string;
  readonly description?: string;
  readonly author: string;
  readonly referenceUri?: string;
  readonly textContent?: string;
}
