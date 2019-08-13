import { CustomHttpError } from './CustomHttpError';

export class AccessDeniedError extends CustomHttpError {
  constructor() {
    super(
      403,
      'Access denied',
      'You may not have the appropriate permissions to access the resource',
    );
  }
}
