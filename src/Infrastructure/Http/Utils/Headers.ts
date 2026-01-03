import { Request } from 'express';

export const extractHeader = (req: Request, headerName: string): string | undefined => {
    if (!req.headers[headerName]) {
        return undefined;
    }

    if (Array.isArray(req.headers[headerName])) {
        return req.headers[headerName][0];
    }

    return req.headers[headerName];
};
