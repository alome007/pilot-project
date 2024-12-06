import { CallableContext } from 'firebase-functions/v1';
import { HttpsError } from 'firebase-functions/v2/https';

export function validateAuth (context: CallableContext) {
  if (!context.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }
}
