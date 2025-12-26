import { LoggerInterface } from "@Application/Shared/Monitoring/LoggerInterface";

export const Logger: LoggerInterface = {
    info: (message: string, context: Record<string, unknown> = {}) => {
        console.log(message, context);
    },
    debug: (message: string, context: Record<string, unknown> = {}) => {
        console.debug(message, context);
    },
    warn: (message: string, context: Record<string, unknown> = {}) => {
        console.warn(message, context);
    },
    error: (message: string, context: Record<string, unknown> = {}) => {
        console.error(message, context);
    },
};
