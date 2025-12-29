import { ClientInterface } from '@Application/Shared/Pokemon/ClientInterface';
import { GetPokemonQuery } from './GetPokemonQuery';
import { Result } from '@Domain/Types/Result';
import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';

export class GetPokemonQueryHandler {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly client: ClientInterface
    ) { }

    async execute(query: GetPokemonQuery): Promise<Result<Error, Pokemon>> {
        this.logger.info(`Processing pokemon`, { name: query.name });

        return this.client.getPokemon(query.name);
    }
}
