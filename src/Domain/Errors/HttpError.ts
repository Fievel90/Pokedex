export class HttpError extends Error {
    override name = 'HttpError';

    constructor(public readonly statusCode: number, message: string, errorOptions?: ErrorOptions) {
        super(message, errorOptions);
    }
}
