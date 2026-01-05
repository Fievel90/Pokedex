/**
 * Interface for logging operations
 */
export interface LoggerInterface {
    /**
     * Logs an informational message
     * @param message The message to log
     * @param context Optional context data
     */
    info(message: string, context?: Record<string, unknown>): void;

    /**
     * Logs a debug message
     * @param message The message to log
     * @param context Optional context data
     */
    debug(message: string, context?: Record<string, unknown>): void;

    /**
     * Logs a warning message
     * @param message The message to log
     * @param context Optional context data
     */
    warn(message: string, context?: Record<string, unknown>): void;

    /**
     * Logs an error message
     * @param message The message to log
     * @param context Optional context data
     */
    error(message: string, context?: Record<string, unknown>): void;
}
