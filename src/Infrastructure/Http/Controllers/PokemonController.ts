import { Request, Response } from 'express';
import { GetPokemonQuery } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQuery';
import { GetPokemonQueryHandler } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQueryHandler';
import { GetTranslatedPokemonQueryHandler } from '@Application/Pokemon/Queries/GetTranslatedPokemon/GetTranslatedPokemonQueryHandler';
import { GetTranslatedPokemonQuery } from '@Application/Pokemon/Queries/GetTranslatedPokemon/GetTranslatedPokemonQuery';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';
import { HttpError } from '@Domain/Errors/HttpError';
import { ValidationError } from '@Domain/Errors/ValidationError';
import { Result } from '@Domain/Types/Result';

/**
 * Controller for handling Pokemon-related HTTP requests
 */
export class PokemonController {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly pokemonHandler: GetPokemonQueryHandler,
        private readonly translatedHandler: GetTranslatedPokemonQueryHandler
    ) { }

    /**
     * Handles requests to get a single Pokemon by name
     * @param req The Express request object, expected to contain the Pokemon name in params
     * @param res The Express response object
     */
    async getOne(req: Request, res: Response): Promise<void> {
        const { name } = req.params;

        if (!name) {
            this.logger.error('Pokemon name is missing');
            res.status(400).json({ error: 'Pokemon name is required' });
            return;
        }

        this.logger.info(`Handling get pokemon request`, { name });

        const query = new GetPokemonQuery(name);
        const result = await this.pokemonHandler.execute(query);

        this.handleResult(res, result, name);
    }

    /**
     * Handles requests to get a single Pokemon with translated description
     * @param req The Express request object, expected to contain the Pokemon name in params
     * @param res The Express response object
     */
    async getTranslated(req: Request, res: Response): Promise<void> {
        const { name } = req.params;

        if (!name) {
            this.logger.error('Pokemon name is missing');
            res.status(400).json({ error: 'Pokemon name is required' });
            return;
        }

        this.logger.info(`Handling get translated pokemon request`, { name });

        const query = new GetPokemonQuery(name);
        const pokemonResult = await this.pokemonHandler.execute(query);

        if (!pokemonResult.success) {
            this.handleResult(res, pokemonResult, name);
            return;
        }

        const translatedQuery = new GetTranslatedPokemonQuery(pokemonResult.data);
        const result = await this.translatedHandler.execute(translatedQuery);

        this.handleResult(res, result, name);
    }

    /**
     * Handles the result of a Pokemon query and sends the appropriate response
     * @param res The Express response object
     * @param result The result of the query
     * @param name The name of the Pokemon involved in the request
     */
    private handleResult(res: Response, result: Result<Error, unknown>, name: string): void {
        if (result.success) {
            this.logger.info(`Pokemon request successful`, { name });
            res.status(200).json(result.data);
        } else {
            this.logger.error(`Pokemon request failed`, { name, error: result.error.message });

            switch (true) {
                case result.error instanceof HttpError:
                    res.status(result.error.statusCode).json({ error: result.error.message });
                    break;
                case result.error instanceof ValidationError:
                    res.status(422).json({ error: result.error.message });
                    break;
                default:
                    res.status(500).json({ error: result.error.message });
                    break;
            }
        }
    }
}
