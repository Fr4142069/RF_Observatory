import { RegisterCaptureRequestDTO } from '../../dto/capture/RegisterCaptureRequestDTO';

export class RegisterCaptureCommand {
  public readonly sessionId: string;
  public readonly frequency: number;
  public readonly modulation: string;
  public readonly bandwidth: number;
  public readonly sampleRate: number;
  public readonly rawSignalData: string;

  constructor(dto: RegisterCaptureRequestDTO) {
    this.sessionId = dto.sessionId;
    this.frequency = dto.frequency;
    this.modulation = dto.modulation;
    this.bandwidth = dto.bandwidth;
    this.sampleRate = dto.sampleRate;
    this.rawSignalData = dto.rawSignalData;
  }
}
