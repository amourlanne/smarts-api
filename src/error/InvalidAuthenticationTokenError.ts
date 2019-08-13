import { CustomHttpError } from './CustomHttpError';

export class InvalidAuthenticationTokenError extends CustomHttpError {
  constructor() {
    super(
      401,
      'Invalid authentication token',
      'Authentication token is invalid or expired. Please login and try again',
    );
  }
}
