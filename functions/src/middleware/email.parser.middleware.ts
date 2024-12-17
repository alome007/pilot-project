import { Request, Response, NextFunction } from 'express';
import { simpleParser } from 'mailparser';

export const rawBodyMiddleware = (sizeLimit: string = '10mb') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.is('multipart/*')) {
            return res.status(415).json({ error: 'Unsupported media type. Expected raw email data.' });
        }
        next();
    };
};