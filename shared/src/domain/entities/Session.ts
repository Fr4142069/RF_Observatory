import { TimeWindow } from '../value-objects/TimeWindow';
import { Capture } from './Capture';

/**
 * Agrupa lógicamente un conjunto de capturas relacionadas.
 * Representa un evento en el tiempo donde un usuario o laboratorio graba múltiples transmisiones.
 */
export interface Session {
  readonly id: string;
  readonly author: string;
  readonly timeWindow: TimeWindow;
  readonly environmentContext?: string;
  
  /**
   * Relación: Una Session contiene múltiples Captures.
   * Session actúa como la Raíz del Agregado.
   */
  readonly captures: Capture[];
}
