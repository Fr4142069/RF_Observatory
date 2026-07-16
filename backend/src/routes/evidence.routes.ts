import { Router } from 'express';
import { EvidenceController } from '../controllers/EvidenceController';

export const createEvidenceRouter = (evidenceController: EvidenceController): Router => {
  const router = Router();

  // POST /api/v1/evidence (UC-002 Register Evidence)
  router.post('/', evidenceController.registerEvidence);

  return router;
};
