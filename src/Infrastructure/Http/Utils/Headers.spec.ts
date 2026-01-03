import { Request } from 'express';
import { extractHeader } from './Headers';

describe('Headers Utils', () => {
    describe('extractHeader', () => {
        it('should return undefined when the header is missing', () => {
            const req = {
                headers: {},
            } as unknown as Request;

            const result = extractHeader(req, 'x-request-id');

            expect(result).toBeUndefined();
        });

        it('should return the header value when it is a string', () => {
            const req = {
                headers: {
                    'x-request-id': '12345',
                },
            } as unknown as Request;

            const result = extractHeader(req, 'x-request-id');

            expect(result).toBe('12345');
        });

        it('should return the first element when the header is an array', () => {
            const req = {
                headers: {
                    'x-forwarded-for': ['127.0.0.1', '192.168.1.1'],
                },
            } as unknown as Request;

            const result = extractHeader(req, 'x-forwarded-for');

            expect(result).toBe('127.0.0.1');
        });
    });
});
