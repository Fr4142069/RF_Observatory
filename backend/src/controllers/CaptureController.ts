import { Request, Response, NextFunction } from 'express';
import { RegisterCaptureUseCase } from '../application/usecases/capture/RegisterCaptureUseCase';
import { RegisterCaptureRequestDTO } from '../application/dto/capture/RegisterCaptureRequestDTO';
import { RegisterCaptureCommand } from '../application/commands/capture/RegisterCaptureCommand';
import { ResponseFactory } from '../responses/ResponseFactory';

export class CaptureController {
  constructor(private readonly registerCaptureUseCase: RegisterCaptureUseCase) {}

  public registerCapture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Extraer payload y convertir a DTO (Validación inicial de estructura si existiese un schema)
      const dto: RegisterCaptureRequestDTO = {
        sessionId: req.body.sessionId,
        frequency: req.body.frequency,
        modulation: req.body.modulation,
        bandwidth: req.body.bandwidth,
        sampleRate: req.body.sampleRate,
        rawSignalData: req.body.rawSignalData,
      };

      // 2. Convertir a Command (Esto invoca los Validators del Sprint 4)
      const command = new RegisterCaptureCommand(dto);

      // 3. Ejecutar Caso de Uso (La Application Layer hace su trabajo)
      const result = await this.registerCaptureUseCase.execute(command);

      // 4. Formatear salida con el Estándar REST y devolver 201 Created
      const response = ResponseFactory.success(req, result, {
        executionTime: 0 // Placeholder, aquí se podría inyectar un PerformanceObserver
      });

      res.status(201).json(response);
    } catch (error) {
      // Si falla la validación del Command o hay un ApplicationError, el GlobalErrorHandler lo maneja
      next(error);
    }
  };
}
