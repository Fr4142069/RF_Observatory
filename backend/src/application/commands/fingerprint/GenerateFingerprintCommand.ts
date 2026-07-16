import { GenerateFingerprintRequestDTO } from '../../dto/fingerprint/GenerateFingerprintRequestDTO';

export class GenerateFingerprintCommand {
  public readonly classificationId: string;

  constructor(dto: GenerateFingerprintRequestDTO) {
    this.classificationId = dto.classificationId;
  }
}
