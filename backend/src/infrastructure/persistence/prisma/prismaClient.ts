import { PrismaClient, Prisma } from '@prisma/client';
import { ApplicationError } from '../../../../application/errors/ApplicationError';

export const createPrismaClient = () => {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          try {
            return await query(args);
          } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                throw new ApplicationError('UNIQUE_CONSTRAINT_VIOLATION', 'Ya existe un registro con esos valores únicos.');
              }
              if (error.code === 'P2025') {
                throw new ApplicationError('RECORD_NOT_FOUND', 'El registro solicitado no existe en la base de datos.');
              }
              throw new ApplicationError('DATABASE_OPERATION_FAILED', `Error en base de datos: ${error.message}`);
            }
            if (error instanceof Prisma.PrismaClientValidationError) {
              throw new ApplicationError('DATABASE_VALIDATION_FAILED', 'Datos inválidos proporcionados a la base de datos.');
            }
            if (error instanceof Prisma.PrismaClientInitializationError) {
              throw new ApplicationError('DATABASE_CONNECTION_FAILED', 'No se pudo conectar a la base de datos.');
            }
            throw error;
          }
        },
      },
    },
  });
};

export type DatabaseClient = ReturnType<typeof createPrismaClient>;
