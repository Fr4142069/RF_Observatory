import { config } from './config';
import { SerialAdapter } from './capture/SerialAdapter';
import { ObservatoryClient } from './api/ObservatoryClient';
import { AgentEngine } from './bootstrap/AgentEngine';
import { AgentLogger } from './logging/AgentLogger';

async function bootstrap() {
  AgentLogger.info(`=== Inicializando RF Lab Agent [${config.agent.id}] ===`);

  const hardware = new SerialAdapter(config.hardware);
  const client = new ObservatoryClient();
  
  const engine = new AgentEngine(hardware, client);
  
  await engine.start();
}

bootstrap().catch(err => {
  AgentLogger.error('Fallo fatal en el bootstrap del Agente', err);
  process.exit(1);
});
