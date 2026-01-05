import { NextFunction, Request, Response } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { extractHeader } from '@Infrastructure/Http/Utils/Headers';

/**
 * Interface for tracing context storage
 */
export interface TracingStore {
    correlationId: string;
    transactionId: string;
}

/**
 * AsyncLocalStorage instance for storing tracing context
 */
export const asyncLocalStorage = new AsyncLocalStorage<TracingStore>();

/**
 * Middleware for caching/generating tracing headers
 * @param req The Express request object
 * @param _ The Express response object (unused)
 * @param next The next middleware function
 */
export const TracingMiddleware = (req: Request, _: Response, next: NextFunction) => {
    const store: TracingStore = {
        correlationId: extractHeader(req, 'x-correlation-id') ?? 'default-correlation-id',
        transactionId: crypto.randomUUID(),
    };

    asyncLocalStorage.run(store, () => {
        next();
    });
}
