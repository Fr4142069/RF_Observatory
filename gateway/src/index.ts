import * as dotenv from 'dotenv';
import { DummyAdapter } from './adapters/DummyAdapter';
import { ApiClient } from './core/ApiClient';
import { MessageBuffer } from './core/MessageBuffer';
import { GatewayEngine } from './core/GatewayEngine';

// Cargar variables de entorno
dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:3000/api/v1';

async function bootstrap() {
  console.log(`🚀 Inicializando RF Gateway (Apuntando a: ${API_URL})`);

  const adapter = new DummyAdapter(); // En el futuro: new SerialAdapter('/dev/ttyUSB0')
  const client = new ApiClient(API_URL);
  const buffer = new MessageBuffer();

  const engine = new GatewayEngine(adapter, client, buffer);
  
  await engine.start();
}

bootstrap().catch(err => {
  console.error('Error fatal al iniciar el Gateway:', err);
  process.exit(1);
});
