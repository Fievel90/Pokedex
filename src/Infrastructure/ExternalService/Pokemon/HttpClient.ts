import { ClientInterface } from '@Application/Shared/Pokemon/ClientInterface';
import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { Result } from '@Domain/Types/Result';
import { HttpError } from '@Domain/Errors/HttpError';
import { PokemonSpecies } from '@Infrastructure/ExternalService/Pokemon/types';
import { ValidationError } from '@Domain/Errors/ValidationError';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';
import config from '@Infrastructure/Environments/config';

export class HttpClient implements ClientInterface {
    private readonly baseUrl = config.pokemonClient.baseUrl;

    constructor(private readonly logger: LoggerInterface) { }

    async getPokemon(name: string): Promise<Result<Error, Pokemon>> {
        this.logger.info(`Fetching pokemon`, { name });

        if (!name) {
            this.logger.error(`Name is required`, {
                name,
            });

            return {
                success: false,
                error: new ValidationError('Name is required'),
            };
        }

        let response: Response;
        try {
            response = await fetch(`${this.baseUrl}/${name.toLowerCase()}`);
        } catch (error) {
            this.logger.error(`Failed to fetch pokemon`, {
                name,
                body: error,
            });

            return {
                success: false,
                error: new HttpError(500, `Failed to fetch pokemon '${name}'`),
            };
        }

        if (!response.ok) {
            this.logger.error(`Failed to fetch pokemon`, {
                name,
                status: response.status,
                body: await response.text(),
            });

            return {
                success: false,
                error: new HttpError(response.status, `Failed to fetch pokemon '${name}'`),
            };
        }

        const data = await response.json();

        const result = PokemonSpecies.safeParse(data);
        if (!result.success) {
            this.logger.error(`Failed to parse pokemon`, {
                name,
                body: data,
                error: result.error.message,
            });

            return {
                success: false,
                error: new ValidationError(result.error.message),
            };
        } else {
            this.logger.info(`Pokemon fetched successfully`, { name });
            this.logger.debug(`Pokemon fetched successfully: body`, { name, body: data });

            return {
                success: true,
                data: this.mapToPokemon(result.data),
            };
        }
    }

    private mapToPokemon(data: PokemonSpecies): Pokemon {
        const descriptionEntry = data.flavor_text_entries.find(
            (entry) => entry.language.name === 'en'
        );
        const description = descriptionEntry
            ? descriptionEntry.flavor_text.replace(/[\n\f\r]/g, ' ')
            : '';

        return new Pokemon(
            data.name,
            description,
            data.habitat ? data.habitat.name : 'unknown',
            data.is_legendary
        );
    }
}
