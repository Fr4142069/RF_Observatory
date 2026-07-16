import { Request, Response, NextFunction } from 'express';
import { CompareFingerprintsUseCase } from '../application/usecases/comparison/CompareFingerprintsUseCase';
import { CompareFingerprintsRequestDTO } from '../application/dto/comparison/CompareFingerprintsRequestDTO';
import { CompareFingerprintsCommand } from '../application/commands/comparison/CompareFingerprintsCommand';
import { ResponseFactory } from '../responses/ResponseFactory';

export class CompareFingerprintsController {
  constructor(private readonly compareFingerprintsUseCase: CompareFingerprintsUseCase) {}

  public compare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Extraer payload y mapear a DTO (Criterios de comparación)
      const dto: CompareFingerprintsRequestDTO = {
        sourceFingerprintId: req.body.sourceFingerprintId,
        targetFingerprintId: req.body.targetFingerprintId,
      };

      // 2. Convertir a Command (Esto invoca validaciones estáticas)
      const command = new CompareFingerprintsCommand(dto);

      // 3. Ejecutar Caso de Uso (La inferencia científica ocurre aquí)
      const result = await this.compareFingerprintsUseCase.execute(command);

      // 4. Formatear salida utilizando el Estándar REST y devolver 200 OK
      const response = ResponseFactory.success(req, result, {
        executionTime: 0 // Placeholder
      });

      res.status(200).json(response);
    } catch (error) {
      // Las fallas de negocio o de sistema se delegan al ErrorHandler
      next(error);
    }
  };
}
