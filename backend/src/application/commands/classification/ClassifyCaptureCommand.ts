import { ClassifyCaptureRequestDTO } from '../../dto/classification/ClassifyCaptureRequestDTO';

export class ClassifyCaptureCommand {
  public readonly captureId: string;

  constructor(dto: ClassifyCaptureRequestDTO) {
    this.captureId = dto.captureId;
  }
}
