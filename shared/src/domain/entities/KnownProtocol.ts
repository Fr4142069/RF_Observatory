import { Modulation } from '../value-objects/Modulation';
import { Frequency } from '../value-objects/Frequency';

export type ProtocolStatus = 'DRAFT' | 'UNDER_REVIEW' | 'VALIDATED' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';

/**
 * Representa un estándar o protocolo de comunicación de RF documentado e identificado.
 * Actúa como la Raíz del Agregado Protocol del catálogo del sistema.
 * DA-024: Representa conocimiento validado, no una captura ni un fingerprint.
 */
export class KnownProtocol {
  constructor(
    public readonly id: string,
    public name: string,
    public status: ProtocolStatus,
    public readonly createdAt: Date,
    public alias: string | null = null,
    public manufacturer: string | null = null,
    public typicalFrequency: Frequency | null = null,
    public modulation: Modulation | null = null,
    public encodingType: string | null = null,
    public technicalDescription: string | null = null,
    public version: string | null = null,
    public documentationUrl: string | null = null,
    public externalReferences: string[] = [],
    public technicalNotes: string | null = null,
    public readonly updatedAt: Date = new Date()
  ) {}

  public markAsPublished(): void {
    if (this.status === 'PUBLISHED') {
      throw new Error('El protocolo ya se encuentra publicado.');
    }
    this.status = 'PUBLISHED';
  }
}
