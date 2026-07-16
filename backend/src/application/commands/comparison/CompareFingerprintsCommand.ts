import { CompareFingerprintsRequestDTO } from '../../dto/comparison/CompareFingerprintsRequestDTO';

export class CompareFingerprintsCommand {
  public readonly sourceFingerprintId: string;
  public readonly targetFingerprintId?: string;

  constructor(dto: CompareFingerprintsRequestDTO) {
    this.sourceFingerprintId = dto.sourceFingerprintId;
    this.targetFingerprintId = dto.targetFingerprintId;
  }
}
