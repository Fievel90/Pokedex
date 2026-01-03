import { LoggerLevels, isLoggerLevel } from '@Infrastructure/Monitoring/Logger';
import dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
    port: number;
    nodeEnv: string;
}

interface AppConfig {
    name: string;
    version: string;
}

interface LoggerConfig {
    level: LoggerLevels;
}

interface PokemonClientConfig {
    baseUrl: string;
}

interface TranslatorClientConfig {
    baseUrl: string;
    apiKey: string;
}

interface Config {
    server: ServerConfig;
    app: AppConfig;
    logger: LoggerConfig;
    pokemonClient: PokemonClientConfig;
    translatorClient: TranslatorClientConfig;
}

const logLevel = process.env['LOGGER_LEVEL'] ?? 'info';

const config: Config = {
    server: {
        port: Number(process.env['PORT'] ?? 3000),
        nodeEnv: process.env['NODE_ENV'] ?? 'development',
    },
    app: {
        name: process.env['APP_NAME'] ?? 'Pokedex',
        version: process.env['APP_VERSION'] ?? '1.0.0',
    },
    logger: {
        level: isLoggerLevel(logLevel) ? logLevel : 'info',
    },
    pokemonClient: {
        baseUrl: process.env['POKEMON_API_BASE_URL'] ?? '',
    },
    translatorClient: {
        baseUrl: process.env['TRANSLATOR_API_BASE_URL'] ?? '',
        apiKey: process.env['TRANSLATOR_API_KEY'] ?? '',
    }
};

export default config;
