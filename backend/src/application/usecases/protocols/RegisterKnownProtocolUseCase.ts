import { randomUUID } from 'crypto';
import { RegisterKnownProtocolCommand } from '../../commands/protocols/RegisterKnownProtocolCommand';
import { KnownProtocolResponseDTO } from '../../dto/protocols/KnownProtocolResponseDTO';
import { RegisterKnownProtocolValidator } from '../../validators/protocols/RegisterKnownProtocolValidator';
import { ApplicationError } from '../../errors/ApplicationError';
export class Frequency {
  constructor(public valueInHertz: number) {}
}
export class Modulation {
  constructor(public type: string) {}
}
export class KnownProtocol {
  constructor(
    public id: string,
    public name: string,
    public status: string,
    public createdAt: Date,
    public alias?: string,
    public manufacturer?: string,
    public typicalFrequency?: Frequency | null,
    public modulation?: Modulation | null,
    public encodingType?: string,
    public technicalDescription?: string,
    public version?: string,
    public documentationUrl?: string,
    public externalReferences?: string[],
    public technicalNotes?: string
  ) {}
}

export interface KnownProtocolRepository {
  findByName(name: string): Promise<KnownProtocol | null>;
  findByAlias(alias: string): Promise<KnownProtocol | null>;
  save(protocol: KnownProtocol): Promise<void>;
  associateFingerprint(protocolId: string, fingerprintId: string): Promise<void>;
}

export interface FingerprintRepository {
  findById(id: string): Promise<any | null>;
}

export class RegisterKnownProtocolUseCase {
  constructor(
    private readonly protocolRepository: KnownProtocolRepository,
    private readonly fingerprintRepository: FingerprintRepository
  ) {}

  public async execute(command: RegisterKnownProtocolCommand): Promise<KnownProtocolResponseDTO> {
    RegisterKnownProtocolValidator.validate(command);

    const nameExists = await this.protocolRepository.findByName(command.name);
    if (nameExists) {
      throw new ApplicationError('PROTOCOL_ALREADY_EXISTS', `El protocolo con nombre '${command.name}' ya existe.`);
    }

    if (command.alias) {
      const aliasExists = await this.protocolRepository.findByAlias(command.alias);
      if (aliasExists) {
        throw new ApplicationError('PROTOCOL_ALIAS_IN_USE', `El alias '${command.alias}' ya está en uso.`);
      }
    }

    if (command.initialFingerprintIds && command.initialFingerprintIds.length > 0) {
      for (const fpId of command.initialFingerprintIds) {
        const fp = await this.fingerprintRepository.findById(fpId);
        if (!fp) {
          throw new ApplicationError('FINGERPRINT_NOT_FOUND', `El fingerprint '${fpId}' no existe.`);
        }
      }
    }

    const freq = command.frequencyHertz ? new Frequency(command.frequencyHertz) : null;
    const mod = command.modulationType ? new Modulation(command.modulationType) : null;

    const newProtocol = new KnownProtocol(
      randomUUID(),
      command.name,
      command.status,
      new Date(),
      command.alias,
      command.manufacturer,
      freq,
      mod,
      command.encodingType,
      command.technicalDescription,
      command.version,
      command.documentationUrl,
      command.externalReferences,
      command.technicalNotes
    );

    await this.protocolRepository.save(newProtocol);

    if (command.initialFingerprintIds && command.initialFingerprintIds.length > 0) {
      for (const fpId of command.initialFingerprintIds) {
        await this.protocolRepository.associateFingerprint(newProtocol.id, fpId);
      }
    }

    return {
      id: newProtocol.id,
      name: newProtocol.name,
      alias: newProtocol.alias || null,
      manufacturer: newProtocol.manufacturer || null,
      frequencyHertz: newProtocol.typicalFrequency?.valueInHertz || null,
      modulationType: newProtocol.modulation?.type || null,
      status: newProtocol.status,
      registeredAt: newProtocol.createdAt,
      associatedFingerprintsCount: command.initialFingerprintIds ? command.initialFingerprintIds.length : 0
    };
  }
}
