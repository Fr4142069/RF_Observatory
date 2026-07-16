/**
 * Agrupa las mediciones objetivas sobre la salud e integridad de una señal.
 * Ninguno de estos valores se calcula en el dominio; solo se almacenan.
 */
export interface SignalMetrics {
  readonly signalToNoiseRatioDb?: number;
  readonly lostPulsesCount?: number;
  readonly temporalStabilityPercentage?: number;
}
