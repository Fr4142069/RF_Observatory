export interface Frequency {
  /**
   * Representación absoluta de la frecuencia en Hercios (Hz).
   * Almacenar en Hz (enteros) previene los errores de precisión de coma flotante 
   * (ej. 433920000 Hz vs 433.92 MHz).
   */
  readonly valueInHertz: number;
}
