import { Router } from 'express';
import { CompareFingerprintsController } from '../controllers/CompareFingerprintsController';

export const createFingerprintRouter = (compareController: CompareFingerprintsController): Router => {
  const router = Router();

  // POST /api/v1/fingerprints/compare (UC-005)
  // Nota: DA-045 establece que búsquedas o consultas complejas usan POST
  router.post('/compare', compareController.compare);

  return router;
};
