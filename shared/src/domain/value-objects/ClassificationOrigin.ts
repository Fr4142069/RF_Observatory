/**
 * Define el origen del veredicto de clasificación, permitiendo auditar 
 * si provino de un experto humano o de un motor automático específico.
 * Protege al dominio de strings arbitrarios.
 */
export type ClassificationOrigin = 
  | 'MANUAL_EXPERT' 
  | 'HEURISTIC_ENGINE' 
  | 'STATISTICAL_MODEL' 
  | 'MACHINE_LEARNING' 
  | 'AI_MODEL';
