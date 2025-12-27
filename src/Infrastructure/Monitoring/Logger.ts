import { LoggerInterface } from "@Application/Shared/Monitoring/LoggerInterface";

export class Logger implements LoggerInterface {
    private readonly levelsMap = {
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
    };


    constructor(private readonly level: keyof typeof this.levelsMap = 'info') { }

    debug(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.debug) {
            console.debug(message, context);
        }
    }

    info(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.info) {
            console.log(message, context);
        }
    }

    warn(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.warn) {
            console.warn(message, context);
        }
    }

    error(message: string, context: Record<string, unknown> = {}) {
        if (this.levelsMap[this.level] <= this.levelsMap.error) {
            console.error(message, context);
        }
    }
}
