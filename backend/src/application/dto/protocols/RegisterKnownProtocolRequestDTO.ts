export interface RegisterKnownProtocolRequestDTO {
  readonly name: string;
  readonly alias?: string;
  readonly manufacturer?: string;
  readonly frequencyHertz?: number;
  readonly modulationType?: string;
  readonly encodingType?: string;
  readonly technicalDescription?: string;
  readonly status: 'DRAFT' | 'UNDER_REVIEW' | 'VALIDATED' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';
  readonly version?: string;
  readonly documentationUrl?: string;
  readonly externalReferences?: string[];
  readonly technicalNotes?: string;
  readonly initialFingerprintIds?: string[];
}
