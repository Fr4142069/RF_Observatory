import { Request, Response, NextFunction } from 'express';
import { SearchObservatoryUseCase } from '../application/usecases/search/SearchObservatoryUseCase';
import { SearchCriteriaDTO } from '../application/dto/search/SearchCriteriaDTO';
import { SearchObservatoryCommand } from '../application/commands/search/SearchObservatoryCommand';
import { ResponseFactory } from '../responses/ResponseFactory';

export class SearchController {
  constructor(private readonly searchUseCase: SearchObservatoryUseCase) {}

  public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Extraer el payload JSON que contiene los criterios
      const dto: SearchCriteriaDTO = {
        keyword: req.body.keyword,
        types: req.body.types,
        frequencyRange: req.body.frequencyRange,
        dateRange: req.body.dateRange,
        limit: req.body.limit,
        offset: req.body.offset,
        sortBy: req.body.sortBy,
        sortDirection: req.body.sortDirection
      };

      // 2. Instanciar comando
      const command = new SearchObservatoryCommand(dto);

      // 3. Ejecutar Caso de Uso (Consulta al modelo del Observatorio, no a base de datos tabular directamente)
      const result = await this.searchUseCase.execute(command);

      // 4. Formatear y retornar
      res.status(200).json(ResponseFactory.success(req, result, {
        executionTime: result.executionTimeMs || 0
      }));
    } catch (error) {
      next(error);
    }
  };
}
