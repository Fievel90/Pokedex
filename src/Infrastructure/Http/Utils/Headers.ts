import { Request } from 'express';

/**
 * Extracts a header value from the request
 * @param req The Express request object
 * @param headerName The name of the header to extract
 * @returns The header value or undefined if not present
 */
export const extractHeader = (req: Request, headerName: string): string | undefined => {
    if (!req.headers[headerName]) {
        return undefined;
    }

    if (Array.isArray(req.headers[headerName])) {
        return req.headers[headerName][0];
    }

    return req.headers[headerName];
};
