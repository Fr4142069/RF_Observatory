import { ServerBootstrap } from '../src/bootstrap/serverBootstrap';
import http from 'http';

// Esta función simula peticiones HTTP al servidor
async function request(method: string, path: string, body?: any) {
  return new Promise<any>((resolve, reject) => {
    const data = body ? JSON.stringify(body) : undefined;
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, data: responseBody, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runAudit() {
  console.log('=== Iniciando Auditoría Funcional (TASK-007B) ===');
  const app = ServerBootstrap.init();
  const server = app.listen(3000, async () => {
    try {
      let passed = 0;
      let failed = 0;

      const assertStatus = (name: string, expected: number, actual: number) => {
        if (expected === actual) {
          console.log(`[PASS] ${name} -> ${actual}`);
          passed++;
        } else {
          console.error(`[FAIL] ${name} -> Expected ${expected}, got ${actual}`);
          failed++;
        }
      };

      const assertFormat = (name: string, obj: any, type: 'SUCCESS' | 'ERROR') => {
        const hasRequestId = !!obj.requestId;
        const hasTimestamp = !!obj.timestamp;
        let isCorrectType = false;

        if (type === 'SUCCESS') {
          isCorrectType = obj.success === true && obj.data !== undefined && obj.meta !== undefined;
        } else {
          isCorrectType = obj.code !== undefined && obj.title !== undefined && obj.detail !== undefined && obj.status !== undefined;
        }

        if (hasRequestId && hasTimestamp && isCorrectType) {
          console.log(`[PASS] ${name} Format OK`);
          passed++;
        } else {
          console.error(`[FAIL] ${name} Format Invalid:`, obj);
          failed++;
        }
      };

      // Caso 1: POST válido
      const res1 = await request('POST', '/api/v1/captures', {
        sessionId: "SESSION_1",
        frequency: 433.92,
        modulation: "ASK",
        bandwidth: 10,
        sampleRate: 2000000,
        rawSignalData: "dummy_data"
      });
      assertStatus('Caso 1: POST válido (Status)', 201, res1.status);
      assertFormat('Caso 1: POST válido (Format)', res1.data, 'SUCCESS');

      // Caso 2 & 3: JSON inválido / Falta campo (El validator arroja ApplicationError que debe ser 400 o 422)
      // Dado que el Validator actualmente en nuestro mockup lanza un ApplicationError
      const res2 = await request('POST', '/api/v1/captures', {
        sessionId: "SESSION_2" // Faltan campos requeridos por el Command
      });
      // El validador lanzará un error que el GlobalErrorHandler mapeará. 
      // Por defecto nuestro ErrorHandler pone status = err.statusCode || 500
      // Esperamos que el validator lo haya tirado con algún status code HTTP manejado, si no será 500 mapeado.
      // Verifiquemos simplemente que sea un formato de error.
      assertStatus('Caso 2 y 3: Falta campo (Status)', 422, res2.status);
      assertFormat('Caso 2 y 3: Falta campo (Format)', res2.data, 'ERROR');

      // Caso 5: Endpoint inexistente
      const res5 = await request('GET', '/api/v1/nonexistent');
      assertStatus('Caso 5: Endpoint inexistente (Status)', 404, res5.status);
      assertFormat('Caso 5: Endpoint inexistente (Format)', res5.data, 'ERROR');
      if (res5.data.code === 'ENDPOINT_NOT_FOUND') {
         console.log('[PASS] Caso 5 Code -> ENDPOINT_NOT_FOUND');
         passed++;
      } else {
         console.error('[FAIL] Caso 5 Code');
         failed++;
      }

      console.log(`\n=== Resultados: ${passed} PASS, ${failed} FAIL ===`);
      server.close(() => process.exit(failed > 0 ? 1 : 0));
    } catch (e) {
      console.error('Error durante la auditoría:', e);
      server.close(() => process.exit(1));
    }
  });
}

runAudit();
