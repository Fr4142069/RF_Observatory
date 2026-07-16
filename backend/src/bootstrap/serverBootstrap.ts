import express, { Express } from 'express';
import { RequestIdMiddleware } from '../middlewares/RequestIdMiddleware';
import { GlobalErrorHandler } from '../middlewares/GlobalErrorHandler';
import { NotFoundMiddleware } from '../middlewares/NotFoundMiddleware';
import { ControllerFactory } from './controllerFactory';
import { createCaptureRouter } from '../routes/capture.routes';
import { createEvidenceRouter } from '../routes/evidence.routes';

export class ServerBootstrap {
  static init(): Express {
    const app = express();

    // 1. Middlewares iniciales
    app.use(express.json());
    app.use(RequestIdMiddleware);

    // 2. Construcción del Dependency Graph (El Composition Root ocurre aquí)
    const captureController = ControllerFactory.createCaptureController();
    const evidenceController = ControllerFactory.createEvidenceController();
    const compareController = ControllerFactory.createCompareFingerprintsController();
    const protocolController = ControllerFactory.createProtocolController();
    const searchController = ControllerFactory.createSearchController();

    // 3. Montaje de Rutas
    app.use('/api/v1/captures', createCaptureRouter(captureController));
    app.use('/api/v1/evidence', createEvidenceRouter(evidenceController));
    
    const { createFingerprintRouter } = require('../routes/fingerprint.routes');
    app.use('/api/v1/fingerprints', createFingerprintRouter(compareController));

    const { createProtocolRouter } = require('../routes/protocol.routes');
    app.use('/api/v1/protocols', createProtocolRouter(protocolController));

    const { createSearchRouter } = require('../routes/search.routes');
    app.use('/api/v1/search', createSearchRouter(searchController));

    // 4. Fallback de Rutas no encontradas (Debe ir después de las rutas válidas)
    app.use(NotFoundMiddleware);

    // 5. Interceptor Global de Errores (Debe ser el último middleware inyectado)
    app.use(GlobalErrorHandler);

    return app;
  }
}
