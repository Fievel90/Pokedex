import { ClientInterface } from '@Application/Shared/Pokemon/ClientInterface';
import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { Result } from '@Domain/Types/Result';
import { HttpError } from '@Domain/Errors/HttpError';
import { PokemonSpecies } from '@Infrastructure/ExternalService/Pokemon/types';
import { ValidationError } from '@Domain/Errors/ValidationError';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';

export class HttpClient implements ClientInterface {
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon-species';

    constructor(private readonly logger: LoggerInterface) { }

    async getPokemon(name: string): Promise<Result<HttpError, Pokemon>> {
        this.logger.info(`Fetching pokemon`, { name });

        const response = await fetch(`${this.baseUrl}/${name.toLowerCase()}`);

        if (!response.ok) {
            this.logger.error(`Failed to fetch pokemon`, {
                name,
                status: response.status,
                body: await response.text(),
            });

            if (response.status === 404) {
                return {
                    success: false,
                    error: new HttpError(`Pokemon '${name}' not found`),
                };
            }

            return {
                success: false,
                error: new HttpError(`Failed to fetch pokemon '${name}'`),
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
            this.logger.info(`Pokemon fetched successfully`, {
                name,
                body: data,
            });

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
