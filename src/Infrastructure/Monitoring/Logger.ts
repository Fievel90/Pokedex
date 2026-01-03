import { LoggerInterface } from "@Application/Shared/Monitoring/LoggerInterface";
import { TracingStore } from "@Infrastructure/Http/Middlewares/TracingMiddleware";
import { AsyncLocalStorage } from "async_hooks";

export type LoggerLevels = 'debug' | 'info' | 'warn' | 'error';

export const isLoggerLevel = (level: string): level is LoggerLevels => {
    return ['debug', 'info', 'warn', 'error'].includes(level);
}

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

    debug(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.debug) {
            console.debug(`[DEBUG] ${message}`, this.addTracingContext(context));
        }
    }

    info(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.info) {
            console.log(`[INFO] ${message}`, this.addTracingContext(context));
        }
    }

    warn(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.warn) {
            console.warn(`[WARN] ${message}`, this.addTracingContext(context));
        }
    }

    error(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.error) {
            console.error(`[ERROR] ${message}`, this.addTracingContext(context));
        }
    }

    private addTracingContext(context: Record<string, unknown>) {
        const tracingStore = this.asyncLocalStorage.getStore();

        return {
            ...context,
            correlationId: tracingStore?.correlationId,
            transactionId: tracingStore?.transactionId,
        };
    }
}
