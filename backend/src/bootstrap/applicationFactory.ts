import { RegisterCaptureUseCase } from '../application/usecases/capture/RegisterCaptureUseCase';
import { AttachEvidenceUseCase } from '../application/usecases/evidence/AttachEvidenceUseCase';
import { RepositoryFactory } from './repositoryFactory';

export class ApplicationFactory {
  static createRegisterCaptureUseCase(): RegisterCaptureUseCase {
    const captureRepository = RepositoryFactory.createCaptureRepository();
    return new RegisterCaptureUseCase(captureRepository);
  }

  static createAttachEvidenceUseCase(): AttachEvidenceUseCase {
    const captureRepo = RepositoryFactory.createCaptureRepository();
    const classRepo = RepositoryFactory.createClassificationRepository();
    const fingerprintRepo = RepositoryFactory.createFingerprintRepository();
    const evidenceRepo = RepositoryFactory.createEvidenceRepository();
    return new AttachEvidenceUseCase(captureRepo, classRepo, fingerprintRepo, evidenceRepo);
  }

  static createCompareFingerprintsUseCase(): any {
    const fingerprintRepo = RepositoryFactory.createFingerprintRepository();
    const resultRepo = RepositoryFactory.createComparisonResultRepository();
    const domainService = RepositoryFactory.createFingerprintComparisonDomainService();
    // Requerimos el import de CompareFingerprintsUseCase. Como no he importado directamente arriba, haré el require o lo agregaré en el próximo bloque de import, pero mejor lo incluyo directamente aquí.
    const { CompareFingerprintsUseCase } = require('../application/usecases/comparison/CompareFingerprintsUseCase');
    return new CompareFingerprintsUseCase(fingerprintRepo, resultRepo, domainService);
  }

  static createRegisterKnownProtocolUseCase(): any {
    const protocolRepository = RepositoryFactory.createKnownProtocolRepository();
    const { RegisterKnownProtocolUseCase } = require('../application/usecases/protocols/RegisterKnownProtocolUseCase');
    return new RegisterKnownProtocolUseCase(protocolRepository);
  }

  static createPublishKnownProtocolUseCase(): any {
    const protocolRepository = RepositoryFactory.createKnownProtocolRepository();
    const { PublishKnownProtocolUseCase } = require('../application/usecases/protocols/PublishKnownProtocolUseCase');
    return new PublishKnownProtocolUseCase(protocolRepository);
  }

  static createSearchObservatoryUseCase(): any {
    const protocolPort = RepositoryFactory.createProtocolSearchPort();
    const fingerprintPort = RepositoryFactory.createFingerprintSearchPort();
    const evidencePort = RepositoryFactory.createEvidenceSearchPort();
    const { SearchObservatoryUseCase } = require('../application/usecases/search/SearchObservatoryUseCase');
    return new SearchObservatoryUseCase(protocolPort, fingerprintPort, evidencePort);
  }
}
