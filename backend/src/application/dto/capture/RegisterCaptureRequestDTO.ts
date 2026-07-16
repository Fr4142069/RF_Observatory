export interface RegisterCaptureRequestDTO {
  readonly sessionId: string;
  readonly frequency: number;
  readonly modulation: string;
  readonly bandwidth: number;
  readonly sampleRate: number;
  readonly rawSignalData: string; // En una app real, esto podría ser un URI a S3 o similar
}
