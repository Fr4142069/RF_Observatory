import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  api: {
    baseUrl: process.env.OBSERVATORY_API_URL || 'http://localhost:3000/api/v1',
    timeout: parseInt(process.env.API_TIMEOUT || '5000', 10),
    retryCount: parseInt(process.env.API_RETRY_COUNT || '3', 10),
    backoffMs: parseInt(process.env.API_BACKOFF_MS || '1000', 10),
  },
  agent: {
    id: process.env.LAB_AGENT_ID || 'AGENT_DEV_01',
  },
  hardware: {
    serialPort: process.env.SERIAL_PORT || 'COM3',
    baudRate: parseInt(process.env.SERIAL_BAUDRATE || '115200', 10)
  }
};
