import { RegisterKnownProtocolRequestDTO } from '../../dto/protocols/RegisterKnownProtocolRequestDTO';

export class RegisterKnownProtocolCommand {
  public readonly name: string;
  public readonly alias?: string;
  public readonly manufacturer?: string;
  public readonly frequencyHertz?: number;
  public readonly modulationType?: string;
  public readonly encodingType?: string;
  public readonly technicalDescription?: string;
  public readonly status: 'DRAFT' | 'UNDER_REVIEW' | 'VALIDATED' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';
  public readonly version?: string;
  public readonly documentationUrl?: string;
  public readonly externalReferences?: string[];
  public readonly technicalNotes?: string;
  public readonly initialFingerprintIds: string[];

  constructor(dto: RegisterKnownProtocolRequestDTO) {
    this.name = dto.name;
    this.alias = dto.alias;
    this.manufacturer = dto.manufacturer;
    this.frequencyHertz = dto.frequencyHertz;
    this.modulationType = dto.modulationType;
    this.encodingType = dto.encodingType;
    this.technicalDescription = dto.technicalDescription;
    this.status = dto.status || 'DRAFT';
    this.version = dto.version;
    this.documentationUrl = dto.documentationUrl;
    this.externalReferences = dto.externalReferences || [];
    this.technicalNotes = dto.technicalNotes;
    this.initialFingerprintIds = dto.initialFingerprintIds || [];
  }
}
