import { Router } from 'express';
import { ProtocolController } from '../controllers/ProtocolController';

export const createProtocolRouter = (protocolController: ProtocolController): Router => {
  const router = Router();

  // POST /api/v1/protocols (UC-006 Register Known Protocol)
  router.post('/', protocolController.registerProtocol);

  // POST /api/v1/protocols/{protocolId}/publish (UC-007 Publish Known Protocol)
  router.post('/:protocolId/publish', protocolController.publishProtocol);

  return router;
};
