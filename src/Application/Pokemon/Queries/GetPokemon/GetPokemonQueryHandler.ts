import { ClientInterface } from '@Application/Shared/Pokemon/ClientInterface';
import { GetPokemonQuery } from './GetPokemonQuery';
import { Result } from '@Domain/Types/Result';
import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';

/**
 * Handler for the GetPokemonQuery
 */
export class GetPokemonQueryHandler {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly client: ClientInterface
    ) { }

    /**
     * Executes the query to retrieve Pokemon details
     * @param query The query containing the Pokemon name
     * @returns A promise resolving to a Result containing either the Pokemon details or an Error
     */
    async execute(query: GetPokemonQuery): Promise<Result<Error, Pokemon>> {
        this.logger.info(`Processing pokemon`, { name: query.name });

        return this.client.getPokemon(query.name);
    }
}
