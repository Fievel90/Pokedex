import { NextFunction, Request, Response } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { extractHeader } from '@Infrastructure/Http/Utils/Headers';

export interface TracingStore {
    correlationId: string;
    transactionId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<TracingStore>();

export const TracingMiddleware = (req: Request, _: Response, next: NextFunction) => {
    const store: TracingStore = {
        correlationId: extractHeader(req, 'x-correlation-id') ?? 'default-correlation-id',
        transactionId: crypto.randomUUID(),
    };

    asyncLocalStorage.run(store, () => {
        next();
    });
}
