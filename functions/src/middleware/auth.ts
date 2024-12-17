import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export async function validateBearerAuth (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpsError(
        'unauthenticated',
        'Missing or invalid authorization header'
      );
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
      next();
    } catch (error) {
      throw new HttpsError(
        'unauthenticated',
        `Invalid or expired token ERRor: ${error}`
      );
    }
  } catch (error) {
    res.status(401).json({
      error: {
        code: 'unauthenticated',
        message: error instanceof HttpsError ? error.message : 'Authentication failed'
      }
    });
  }
}