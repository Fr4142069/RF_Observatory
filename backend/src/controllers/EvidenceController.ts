import { Request, Response, NextFunction } from 'express';
import { AttachEvidenceUseCase } from '../application/usecases/evidence/AttachEvidenceUseCase';
import { AttachEvidenceRequestDTO } from '../application/dto/evidence/AttachEvidenceRequestDTO';
import { AttachEvidenceCommand } from '../application/commands/evidence/AttachEvidenceCommand';
import { ResponseFactory } from '../responses/ResponseFactory';

export class EvidenceController {
  constructor(private readonly attachEvidenceUseCase: AttachEvidenceUseCase) {}

  public registerEvidence = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Extraer payload y convertir a DTO (UC-002 / Register/Attach Evidence)
      const dto: AttachEvidenceRequestDTO = {
        targetId: req.body.targetId,
        targetType: req.body.targetType,
        evidenceType: req.body.evidenceType,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        referenceUri: req.body.referenceUri,
        textContent: req.body.textContent,
      };

      // 2. Convertir a Command (Esto invoca validadores implícitamente de la Application Layer)
      const command = new AttachEvidenceCommand(dto);

      // 3. Ejecutar Caso de Uso (UC-002)
      const result = await this.attachEvidenceUseCase.execute(command);

      // 4. Formatear salida utilizando el Estándar REST y devolver 201 Created
      const response = ResponseFactory.success(req, result, {
        executionTime: 0
      });

      res.status(201).json(response);
    } catch (error) {
      // Delegar manejo de errores estandarizado
      next(error);
    }
  };
}
