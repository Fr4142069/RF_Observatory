import { CaptureController } from '../controllers/CaptureController';
import { EvidenceController } from '../controllers/EvidenceController';
import { ApplicationFactory } from './applicationFactory';

export class ControllerFactory {
  static createCaptureController(): CaptureController {
    const useCase = ApplicationFactory.createRegisterCaptureUseCase();
    return new CaptureController(useCase);
  }

  static createEvidenceController(): EvidenceController {
    const useCase = ApplicationFactory.createAttachEvidenceUseCase();
    return new EvidenceController(useCase);
  }

  static createCompareFingerprintsController(): any {
    const useCase = ApplicationFactory.createCompareFingerprintsUseCase();
    const { CompareFingerprintsController } = require('../controllers/CompareFingerprintsController');
    return new CompareFingerprintsController(useCase);
  }

  static createProtocolController(): any {
    const registerUseCase = ApplicationFactory.createRegisterKnownProtocolUseCase();
    const publishUseCase = ApplicationFactory.createPublishKnownProtocolUseCase();
    const { ProtocolController } = require('../controllers/ProtocolController');
    return new ProtocolController(registerUseCase, publishUseCase);
  }

  static createSearchController(): any {
    const useCase = ApplicationFactory.createSearchObservatoryUseCase();
    const { SearchController } = require('../controllers/SearchController');
    return new SearchController(useCase);
  }
}
