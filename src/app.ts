import express from 'express';
import { Logger } from '@Infrastructure/Monitoring/Logger';
import { Monitor } from '@Infrastructure/Monitoring/Monitor';
import { HttpClient as TranslatorHttpClient } from '@Infrastructure/ExternalService/Translator/HttpClient';
import { GetTranslatedPokemonQueryHandler } from '@Application/Pokemon/Queries/GetTranslatedPokemon/GetTranslatedPokemonQueryHandler';
import { HttpClient as PokemonHttpClient } from '@Infrastructure/ExternalService/Pokemon/HttpClient';
import { GetPokemonQueryHandler } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQueryHandler';
import { PokemonController } from '@Infrastructure/Http/Controllers/PokemonController';
import config from '@Infrastructure/Environments/config';
import { TracingMiddleware, asyncLocalStorage } from '@Infrastructure/Http/Middlewares/TracingMiddleware';

const app = express();

app.use(TracingMiddleware);

// Dependency Injection Setup (Simple Manual DI for now)
const logger = new Logger(config.logger.level, asyncLocalStorage);
const pokemonClient = new PokemonHttpClient(logger);
const translatorClient = new TranslatorHttpClient(logger);
const getPokemonQueryHandler = new GetPokemonQueryHandler(logger, pokemonClient);
const getTranslatedPokemonQueryHandler = new GetTranslatedPokemonQueryHandler(logger, translatorClient);
const pokemonController = new PokemonController(logger, getPokemonQueryHandler, getTranslatedPokemonQueryHandler);

app.get('/', (_, res) => {
    new Monitor().trackEvent('Hello World!');
    res.send('Hello World!');
});

/**
 * @openapi
 * /pokemon/{name}:
 *   get:
 *     description: Get a pokemon by name
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 */
app.get('/pokemon/:name', (req, res) => {
    return pokemonController.getOne(req, res);
});

/**
 * @openapi
 * /pokemon/translated/{name}:
 *   get:
 *     description: Get a pokemon by name with translated description
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 */
app.get('/pokemon/translated/:name', (req, res) => {
    return pokemonController.getTranslated(req, res);
});

/**
 * The Express application instance
 */
export default app
