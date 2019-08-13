import { CustomHttpError } from './CustomHttpError';

export class AuthenticationRequiredError extends CustomHttpError {
  constructor() {
    super(
      401,
      'Authentication required',
      'You must be authenticated to access this URL',
    );
  }
}
