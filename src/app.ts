import express from 'express';
import { Logger } from '@Infrastructure/Monitoring/Logger';
import { Monitor } from '@Infrastructure/Monitoring/Monitor';
import { HttpClient } from '@Infrastructure/ExternalService/Pokemon/HttpClient';
import { GetPokemonQueryHandler } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQueryHandler';
import { PokemonController } from '@Infrastructure/Http/Controllers/PokemonController';
import config from '@Infrastructure/Environments/config';

const app = express();

// Dependency Injection Setup (Simple Manual DI for now)
const logger = new Logger(config.logger.level);
const pokemonClient = new HttpClient(logger);
const getPokemonQueryHandler = new GetPokemonQueryHandler(logger, pokemonClient);
const pokemonController = new PokemonController(logger, getPokemonQueryHandler);

app.get('/', (_, res) => {
    new Monitor().trackEvent('Hello World!');
    res.send('Hello World!');
});

app.get('/pokemon/:name', (req, res) => {
    return pokemonController.execute(req, res);
});

export default app
