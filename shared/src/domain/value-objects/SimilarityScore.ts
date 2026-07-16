/**
 * Puntuación de similitud dentro de una clasificación.
 * Garantiza conceptualmente que el valor esté acotado entre 0 y 100 (porcentaje).
 * (La validación física sucederá en las fábricas/DTOs del sistema).
 */
export interface SimilarityScore {
  readonly percentage: number;
}
