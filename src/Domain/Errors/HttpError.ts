/**
 * Error class representing an HTTP error
 */
export class HttpError extends Error {
    override name = 'HttpError';

    /**
     * @param statusCode The HTTP status code associated with the error
     * @param message The error message
     * @param errorOptions Optional error options
     */
    constructor(public readonly statusCode: number, message: string, errorOptions?: ErrorOptions) {
        super(message, errorOptions);
    }
}
