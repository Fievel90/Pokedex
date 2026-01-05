import { LoggerInterface } from "@Application/Shared/Monitoring/LoggerInterface";
import { TracingStore } from "@Infrastructure/Http/Middlewares/TracingMiddleware";
import { AsyncLocalStorage } from "async_hooks";

export type LoggerLevels = 'debug' | 'info' | 'warn' | 'error';

export const isLoggerLevel = (level: string): level is LoggerLevels => {
    return ['debug', 'info', 'warn', 'error'].includes(level);
}

/**
 * Implementation of the LoggerInterface
 */
export class Logger implements LoggerInterface {
    private readonly levelsMap: Record<LoggerLevels, number> = {
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
    };


    constructor(
        private readonly level: LoggerLevels = 'info',
        private readonly asyncLocalStorage: AsyncLocalStorage<TracingStore>
    ) { }

    /**
     * Logs a debug message
     * @param message The message to log
     * @param context Optional context data
     */
    debug(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.debug) {
            console.debug(`[DEBUG] ${message}`, this.addTracingContext(context));
        }
    }

    /**
     * Logs an informational message
     * @param message The message to log
     * @param context Optional context data
     */
    info(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.info) {
            console.log(`[INFO] ${message}`, this.addTracingContext(context));
        }
    }

    /**
     * Logs a warning message
     * @param message The message to log
     * @param context Optional context data
     */
    warn(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.warn) {
            console.warn(`[WARN] ${message}`, this.addTracingContext(context));
        }
    }

    /**
     * Logs an error message
     * @param message The message to log
     * @param context Optional context data
     */
    error(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.error) {
            console.error(`[ERROR] ${message}`, this.addTracingContext(context));
        }
    }

    /**
     * Adds tracing context to the log entry
     * @param context The existing context
     * @returns The context with tracing information added
     */
    private addTracingContext(context: Record<string, unknown>) {
        const tracingStore = this.asyncLocalStorage.getStore();

        return {
            ...context,
            correlationId: tracingStore?.correlationId,
            transactionId: tracingStore?.transactionId,
        };
    }
}
