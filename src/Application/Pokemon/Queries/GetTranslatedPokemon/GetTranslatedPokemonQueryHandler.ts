import { GetTranslatedPokemonQuery } from './GetTranslatedPokemonQuery';
import { Result } from '@Domain/Types/Result';
import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';
import { ClientInterface } from '@Application/Shared/Translator/ClientInterface';

/**
 * Handler for the GetTranslatedPokemonQuery
 */
export class GetTranslatedPokemonQueryHandler {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly client: ClientInterface
    ) { }

    /**
     * Executes the query to retrieve a Pokemon with a translated description
     * @param query The query containing the Pokemon to translate
     * @returns A promise resolving to a Result containing either the translated Pokemon or an Error
     */
    async execute(query: GetTranslatedPokemonQuery): Promise<Result<Error, Pokemon>> {
        this.logger.info(`Translating pokemon description`, { name: query.pokemon.name });

        const translationType = this.getTranslationType(query.pokemon);

        const translationResult = await this.client.getTranslation(translationType, query.pokemon.description);

        if (!translationResult.success) {
            this.logger.error(`Failed to translate description, returning original pokemon`, {
                name: query.pokemon.name,
                error: translationResult.error.message,
            });

            return {
                success: true,
                data: query.pokemon,
            };
        }

        return {
            success: true,
            data: new Pokemon(
                query.pokemon.name,
                translationResult.data,
                query.pokemon.habitat,
                query.pokemon.isLegendary,
            )
        };
    }

    /**
     * Determines the translation type based on Pokemon characteristics
     * @param pokemon The Pokemon to determine translation for
     * @returns The translation type ('yoda' or 'shakespeare')
     */
    private getTranslationType(pokemon: Pokemon): string {
        return pokemon.habitat === 'cave' || pokemon.isLegendary
            ? 'yoda'
            : 'shakespeare';
    }
}
