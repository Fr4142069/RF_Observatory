import { ServerBootstrap } from '../src/bootstrap/serverBootstrap';
import { Server } from 'http';

const PORT = 3030;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

async function fetchApi(path: string, options?: RequestInit) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

async function runTests() {
  const app = ServerBootstrap.init();
  let server: Server;
  
  await new Promise<void>((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`\n🚀 Test server running on port ${PORT}`);
      resolve();
    });
  });

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    console.log('\n--- POSITIVE SCENARIOS ---');

    // 1. Registrar Captura
    let res = await fetchApi('/captures', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session-123',
        frequency: 433000000,
        sampleRate: 2000000,
        bandwidth: 200000,
        rawSignalData: 'base64:abcd123',
        hardwareId: 'hackrf-1',
        antennaId: 'ant-1',
        gain: 40,
        modulation: 'OOK',
        coordinates: { latitude: 0, longitude: 0, altitude: 0 }
      })
    });
    assert(res.status === 201 && res.body.success === true, 'Escenario 1: Registrar Captura (201 Created)');

    // 2. Registrar Evidencia
    res = await fetchApi('/evidence', {
      method: 'POST',
      body: JSON.stringify({
        targetId: 'target-123',
        targetType: 'CAPTURE',
        evidenceType: 'PHOTO',
        title: 'Prueba de señal',
        author: 'admin',
        referenceUri: 'http://example.com/evidence.jpg'
      })
    });
    assert(res.status === 201 && res.body.success === true, 'Escenario 2: Registrar Evidencia (201 Created)');

    // 3. Comparar Fingerprints
    res = await fetchApi('/fingerprints/compare', {
      method: 'POST',
      body: JSON.stringify({
        sourceFingerprintId: 'source-123',
        targetFingerprintId: 'target-456'
      })
    });
    assert(res.status === 200 && res.body.success === true && res.body.data.matches[0].similarityLevel === 0.943, 'Escenario 3: Comparar Fingerprints (200 OK y verifica similarity)');

    // 4. Registrar Protocolo Conocido
    res = await fetchApi('/protocols', {
      method: 'POST',
      body: JSON.stringify({
        name: 'OOK Generic',
        status: 'DRAFT',
        frequencyHertz: 433920000
      })
    });
    assert(res.status === 201 && res.body.success === true, 'Escenario 4: Registrar Protocolo Conocido (201 Created)');

    // 5. Publicar Protocolo
    res = await fetchApi('/protocols/uuid-proto-1/publish', {
      method: 'POST',
      body: JSON.stringify({
        approvedBy: 'Admin'
      })
    });
    assert(res.status === 200 && res.body.success === true, 'Escenario 5: Publicar Protocolo (200 OK)');

    // 6. Búsqueda
    res = await fetchApi('/search', {
      method: 'POST',
      body: JSON.stringify({
        keyword: 'OOK',
        types: ['PROTOCOL']
      })
    });
    assert(res.status === 200 && res.body.success === true && res.body.data.results !== undefined, 'Escenario 6: Buscar Protocolo Publicado (200 OK)');


    console.log('\n--- NEGATIVE SCENARIOS ---');

    // N1. Endpoint inexistente
    res = await fetchApi('/endpoint-no-existe', { method: 'GET' });
    assert(res.status === 404, 'Negativo 1: Endpoint inexistente (404 Not Found)');

    // N2. Validación fallida
    res = await fetchApi('/captures', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session-123'
        // Faltan campos clave como modulation, frequency, etc.
      })
    });
    assert(res.status === 422 || res.status === 400 || res.status === 500, 'Negativo 2: Validación fallida manejada globalmente (422/400/500)');

    // N3. JSON Invalido (Syntax Error)
    const url = `${BASE_URL}/captures`;
    const invalidJsonResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalid_json: '
    });
    assert(invalidJsonResponse.status === 400, 'Negativo 3: JSON Inválido manejado globalmente (400 Bad Request)');

  } catch (error) {
    console.error('Error durante la ejecución E2E:', error);
    failed++;
  } finally {
    server!.close();
    console.log(`\n--- RESULTADOS ---`);
    console.log(`✅ Pasaron: ${passed}`);
    console.log(`❌ Fallaron: ${failed}`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
