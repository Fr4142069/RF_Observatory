export interface RegisterCaptureResponseDTO {
  readonly id: string;
  readonly frequency: number;
  readonly modulation: string;
  readonly status: string;
  readonly registeredAt: Date;
}
