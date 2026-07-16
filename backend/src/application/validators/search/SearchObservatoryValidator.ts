import { SearchObservatoryCommand } from '../../commands/search/SearchObservatoryCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class SearchObservatoryValidator {
  public static validate(command: SearchObservatoryCommand): void {
    const { criteria } = command;

    if (!criteria || Object.keys(criteria).length === 0) {
      throw new ValidationException('El SearchCriteria no puede estar vacío. Debe especificarse al menos un parámetro de consulta.');
    }

    if (criteria.exactFrequencyHertz !== undefined && criteria.exactFrequencyHertz <= 0) {
      throw new ValidationException('La frecuencia exacta debe ser un valor positivo en Hertz.');
    }

    if (criteria.frequencyRangeHertz) {
      if (criteria.frequencyRangeHertz.min < 0 || criteria.frequencyRangeHertz.max < 0) {
        throw new ValidationException('Los rangos de frecuencia deben ser valores positivos.');
      }
      if (criteria.frequencyRangeHertz.min >= criteria.frequencyRangeHertz.max) {
        throw new ValidationException('En el rango de frecuencias, el valor mínimo debe ser estrictamente menor que el valor máximo.');
      }
    }

    if (criteria.dateRange) {
      if (criteria.dateRange.start >= criteria.dateRange.end) {
        throw new ValidationException('La fecha de inicio debe ser anterior a la fecha de fin en el dateRange.');
      }
    }
  }
}
