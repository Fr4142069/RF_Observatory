import { Timestamp } from '../value-objects/Timestamp';

import { Fingerprint } from './Fingerprint';

import { Classification } from './Classification';

import { Evidence } from './Evidence';
import { QualityReport } from './QualityReport';
import { DecoderResult } from './DecoderResult';

/**
 * Representa una transmisión de radiofrecuencia individual e inmutable.
 * Es la unidad fundamental de información que ingresa al sistema.
 */
export interface Capture {
  readonly id: string;
  
  /**
   * Relación: Pertenece obligatoriamente a una Session.
   */
  readonly sessionId: string;
  
  readonly receivedAt: Timestamp;
  
  // Relaciones (1:1 y 1:N) hacia componentes analíticos y resultados derivados
  readonly fingerprint?: Fingerprint;
  readonly evidences: Evidence[];
  readonly qualityReport?: QualityReport;
  readonly decoderResult?: DecoderResult;
  readonly classification?: Classification;
}
