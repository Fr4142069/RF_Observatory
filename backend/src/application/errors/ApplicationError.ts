export class ApplicationError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class ValidationException extends ApplicationError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message);
    this.name = 'ValidationException';
  }
}
