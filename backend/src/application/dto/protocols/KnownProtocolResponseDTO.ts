export interface KnownProtocolResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly alias: string | null;
  readonly manufacturer: string | null;
  readonly frequencyHertz: number | null;
  readonly modulationType: string | null;
  readonly status: string;
  readonly registeredAt: Date;
  readonly associatedFingerprintsCount: number;
}
