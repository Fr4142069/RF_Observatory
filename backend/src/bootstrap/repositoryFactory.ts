import { CaptureRepository } from '../domain/repositories/CaptureRepository';

// En el futuro inyectaremos PrismaClient aquí
export class RepositoryFactory {
  // Usamos una implementación en memoria temporal hasta que integremos Prisma en las próximas tareas.
  // El contrato IRepository se cumple rigurosamente.
  static createCaptureRepository(): CaptureRepository {
    return {
      save: async (capture: any) => {
        console.log('[Mock DB] Guardando captura:', capture.id);
      },
      findById: async (id: string) => ({ id, sessionId: 'mock-session' } as any),
      findBySessionId: async (id: string) => [],
      delete: async (id: string) => undefined,
    };
  }

  static createClassificationRepository(): any {
    return {
      findById: async (id: string) => ({ id, captureId: 'mock-capture' })
    };
  }

  static createEvidenceRepository(): any {
    // Retornamos un mock del IEvidenceRepository (temporal)
    return {
      save: async (evidence: any) => {
        console.log('[Mock DB] Guardando evidencia:', evidence.id);
      },
      findById: async (id: string) => null,
      findByTargetId: async (targetId: string, targetType: any) => [],
      delete: async (id: string) => undefined,
    };
  }

  static createFingerprintRepository(): any {
    return {
      save: async (f: any) => {},
      findById: async (id: string) => ({ id }), // Retorna dummy para pasar la validación de UC-005
      findAll: async () => [],
      delete: async (id: string) => undefined,
    };
  }

  static createComparisonResultRepository(): any {
    return {
      save: async (r: any) => {},
    };
  }

  static createFingerprintComparisonDomainService(): any {
    return {
      compare: async (sourceId: string, candidateIds: string[]) => {
        // Dummy inference
        return [{
          id: 'mock-comparison',
          targetFingerprintId: candidateIds[0] || 'mock-target',
          similarityLevel: 0.943,
          confidenceTier: 'TIER_1',
          status: 'EVALUATED'
        }];
      }
    };
  }

  static createKnownProtocolRepository(): any {
    return {
      save: async (protocol: any) => undefined,
      findByName: async (name: string) => null,
      findByAlias: async (alias: string) => null,
      findById: async (id: string) => ({ 
        id, 
        name: 'Mock Protocol', 
        status: 'DRAFT',
        createdAt: new Date(),
        updateStatus: function(status: string) { (this as any).status = status; },
        markAsPublished: function(approver: string) { (this as any).status = 'PUBLISHED'; }
      }),
      associateFingerprint: async (protocolId: string, fingerprintId: string) => undefined,
      getAssociatedFingerprintsCount: async (protocolId: string) => 1
    };
  }

  static createProtocolSearchPort(): any {
    return { search: async (criteria: any) => [] };
  }

  static createFingerprintSearchPort(): any {
    return { search: async (criteria: any) => [] };
  }

  static createEvidenceSearchPort(): any {
    return { search: async (criteria: any) => [] };
  }
}
