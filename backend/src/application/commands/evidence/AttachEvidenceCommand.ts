import { AttachEvidenceRequestDTO, EvidenceTargetType } from '../../dto/evidence/AttachEvidenceRequestDTO';

export class AttachEvidenceCommand {
  public readonly targetId: string;
  public readonly targetType: EvidenceTargetType;
  public readonly evidenceType: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly author: string;
  public readonly referenceUri?: string;
  public readonly textContent?: string;

  constructor(dto: AttachEvidenceRequestDTO) {
    this.targetId = dto.targetId;
    this.targetType = dto.targetType;
    this.evidenceType = dto.evidenceType;
    this.title = dto.title;
    this.description = dto.description;
    this.author = dto.author;
    this.referenceUri = dto.referenceUri;
    this.textContent = dto.textContent;
  }
}
