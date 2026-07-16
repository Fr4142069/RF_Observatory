/**
 * Define la naturaleza técnica de la evidencia aportada.
 * Garantiza un lenguaje ubicuo al catalogar los soportes empíricos de las señales.
 */
export type EvidenceType = 
  | 'ORIGINAL_RF_CAPTURE'
  | 'SARF_FILE'
  | 'SPECTRUM_GRAPH'
  | 'HISTOGRAM'
  | 'HARDWARE_PHOTO'
  | 'TECHNICAL_NOTE'
  | 'LOGIC_ANALYZER_RESULT'
  | 'LAB_MEASUREMENT'
  | 'EXPORTED_DATA'
  | 'OTHER';
