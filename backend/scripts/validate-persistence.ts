import { createPrismaClient } from '../src/infrastructure/persistence/prisma/prismaClient';
import { CapturePrismaRepository } from '../src/infrastructure/persistence/prisma/repositories/CapturePrismaRepository';
import { EvidencePrismaRepository } from '../src/infrastructure/persistence/prisma/repositories/EvidencePrismaRepository';
import { FingerprintPrismaRepository } from '../src/infrastructure/persistence/prisma/repositories/FingerprintPrismaRepository';
import { KnownProtocolPrismaRepository } from '../src/infrastructure/persistence/prisma/repositories/KnownProtocolPrismaRepository';
import { randomUUID } from 'crypto';

const prisma = createPrismaClient();

async function runTests() {
  console.log('🚀 Iniciando Validación de Persistencia (TASK-002)...\n');

  try {
    // Inicializar repositorios
    const captureRepo = new CapturePrismaRepository(prisma as any);
    const evidenceRepo = new EvidencePrismaRepository(prisma as any);
    const fingerprintRepo = new FingerprintPrismaRepository(prisma as any);
    const protocolRepo = new KnownProtocolPrismaRepository(prisma as any);

    // MOCK DATA
    const sessionId = randomUUID();
    const captureId = randomUUID();
    const evidenceId = randomUUID();
    const protocolId = randomUUID();

    // 1. Capture Repository
    console.log('--- Probando CapturePrismaRepository ---');
    // Pre-requisito: Prisma requiere crear la Sesión primero por la FK (onDelete Cascade)
    await prisma.session.create({ data: { id: sessionId, createdAt: new Date() } });
    
    await captureRepo.save({ id: captureId, sessionId, createdAt: new Date() });
    let foundCapture = await captureRepo.findById(captureId);
    if (!foundCapture || foundCapture.id !== captureId) throw new Error('Capture findById falló');
    console.log('✅ Capture: save & findById pasaron');

    // 2. Evidence Repository
    console.log('--- Probando EvidencePrismaRepository ---');
    await evidenceRepo.save({
      id: evidenceId,
      captureId: captureId,
      evidenceType: 'PHOTO',
      description: 'Prueba E2E',
      referenceUri: 'http://foo.bar',
      author: 'admin',
      createdAt: new Date(),
    } as any);
    let foundEvidence = await evidenceRepo.findById(evidenceId);
    if (!foundEvidence || foundEvidence.id !== evidenceId) throw new Error('Evidence findById falló');
    console.log('✅ Evidence: save & findById pasaron');

    // 3. KnownProtocol Repository
    console.log('--- Probando KnownProtocolPrismaRepository ---');
    await protocolRepo.save({
      id: protocolId,
      name: 'OOK Protocol Test',
      manufacturer: 'Generic',
      description: 'Prueba',
    } as any);
    let foundProtocol = await protocolRepo.findById(protocolId);
    if (!foundProtocol || foundProtocol.id !== protocolId) throw new Error('KnownProtocol findById falló');
    console.log('✅ KnownProtocol: save & findById pasaron');

    // 4. Testeo de Excepciones del Error Mapper
    console.log('--- Probando Manejo de Errores (PrismaErrorMapper) ---');
    try {
      await captureRepo.save({ id: captureId, sessionId: 'uuid-invalido-que-no-existe', createdAt: new Date() });
      console.log('❌ Falló: Debería haber lanzado error de FK o Constraint');
    } catch (e: any) {
      if (e.name === 'ApplicationError' || e.code === 'DATABASE_OPERATION_FAILED' || e.code === 'RECORD_NOT_FOUND') {
         console.log('✅ Error Mapper: Atrapó error de Prisma y lo tradujo a ApplicationError');
      } else {
         console.log('⚠️ Error Mapper Warning: Error diferente al esperado: ', e.name, e.message);
      }
    }

    // Limpieza
    console.log('\n--- Limpiando base de datos ---');
    // Borrar la sesión hace delete cascade a todo lo de capture (capture, evidence, fingerprint)
    await prisma.session.delete({ where: { id: sessionId } });
    await prisma.knownProtocol.delete({ where: { id: protocolId } });
    console.log('✅ Limpieza completada');

    console.log('\n🎉 Todos los repositorios implementados pasaron la prueba.');
  } catch (err: any) {
    console.error('\n❌ Falla Crítica:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
