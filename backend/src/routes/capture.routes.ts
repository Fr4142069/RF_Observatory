import { Router } from 'express';
import { CaptureController } from '../controllers/CaptureController';

export const createCaptureRouter = (captureController: CaptureController): Router => {
  const router = Router();

  // POST /api/v1/captures
  router.post('/', captureController.registerCapture);

  // Aquí se añadirían más rutas en el futuro (GET, DELETE, etc.)
  
  return router;
};
