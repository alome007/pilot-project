import * as express from "express";

export interface StatusError extends Error {
    status?: number;
}
export const notFoundHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const error = new Error(
        `${req.method} ${req.originalUrl} not found`
    ) as StatusError;
    error["status"] = 404;
    next(error);
};

export const globalErrorHandler = (
    error: StatusError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    res.status(error['status'] || 400);
    res.json({ message: error.message.replace("Error:", "").trim(), code: error['status'] || 500 });
};
