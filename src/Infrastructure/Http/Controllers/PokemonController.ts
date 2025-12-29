import { Request, Response } from 'express';
import { GetPokemonQuery } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQuery';
import { GetPokemonQueryHandler } from '@Application/Pokemon/Queries/GetPokemon/GetPokemonQueryHandler';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';
import { HttpError } from '@Domain/Errors/HttpError';
import { ValidationError } from '@Domain/Errors/ValidationError';

export class PokemonController {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly handler: GetPokemonQueryHandler
    ) { }

    async execute(req: Request, res: Response): Promise<void> {
        const { name } = req.params;

        if (!name) {
            this.logger.error('Pokemon name is missing');
            res.status(400).json({ error: 'Pokemon name is required' });
            return;
        }

        this.logger.info(`Handling get pokemon request`, { name });

        const query = new GetPokemonQuery(name);
        const result = await this.handler.execute(query);

        if (result.success) {
            this.logger.info(`Pokemon found`, { name });
            res.status(200).json(result.data);
        } else {
            this.logger.error(`Pokemon processing failed`, { name, error: result.error.message });

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
