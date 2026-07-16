import { Router } from 'express';
import { SearchController } from '../controllers/SearchController';

export const createSearchRouter = (searchController: SearchController): Router => {
  const router = Router();

  // POST /api/v1/search (UC-008 Scientific Search)
  // Cumple DA-045 y DA-051: Las consultas complejas (búsquedas) usan POST
  router.post('/', searchController.search);

  return router;
};
