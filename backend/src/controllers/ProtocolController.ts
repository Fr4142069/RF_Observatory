import { Request, Response, NextFunction } from 'express';
import { RegisterKnownProtocolUseCase } from '../application/usecases/protocols/RegisterKnownProtocolUseCase';
import { PublishKnownProtocolUseCase } from '../application/usecases/protocols/PublishKnownProtocolUseCase';
import { RegisterKnownProtocolRequestDTO } from '../application/dto/protocols/RegisterKnownProtocolRequestDTO';
import { PublishKnownProtocolRequestDTO } from '../application/dto/protocols/PublishKnownProtocolRequestDTO';
import { RegisterKnownProtocolCommand } from '../application/commands/protocols/RegisterKnownProtocolCommand';
import { PublishKnownProtocolCommand } from '../application/commands/protocols/PublishKnownProtocolCommand';
import { ResponseFactory } from '../responses/ResponseFactory';

export class ProtocolController {
  constructor(
    private readonly registerUseCase: RegisterKnownProtocolUseCase,
    private readonly publishUseCase: PublishKnownProtocolUseCase
  ) {}

  public registerProtocol = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: RegisterKnownProtocolRequestDTO = {
        name: req.body.name,
        alias: req.body.alias,
        manufacturer: req.body.manufacturer,
        frequencyHertz: req.body.frequencyHertz,
        modulationType: req.body.modulationType,
        encodingType: req.body.encodingType,
        technicalDescription: req.body.technicalDescription,
        status: req.body.status,
        version: req.body.version,
        documentationUrl: req.body.documentationUrl,
        externalReferences: req.body.externalReferences,
        technicalNotes: req.body.technicalNotes,
        initialFingerprintIds: req.body.initialFingerprintIds,
      };

      const command = new RegisterKnownProtocolCommand(dto);
      const result = await this.registerUseCase.execute(command);

      res.status(201).json(ResponseFactory.success(req, result));
    } catch (error) {
      next(error);
    }
  };

  public publishProtocol = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // El ID del protocolo viene de la URL (path param)
      const protocolId = req.params.protocolId as string;
      
      const dto: PublishKnownProtocolRequestDTO = {
        protocolId: protocolId,
        approvedBy: req.body.approvedBy,
      };

      const command = new PublishKnownProtocolCommand(dto);
      const result = await this.publishUseCase.execute(command);

      res.status(200).json(ResponseFactory.success(req, result));
    } catch (error) {
      next(error);
    }
  };
}
