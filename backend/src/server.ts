import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint temporal utilizado únicamente durante la fase de infraestructura.
// ATENCIÓN: Este endpoint será eliminado antes del Sprint dedicado a la API.
// NO forma parte de la arquitectura permanente del sistema.
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'RF_Observatory Backend is running (Sprint 1)' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
