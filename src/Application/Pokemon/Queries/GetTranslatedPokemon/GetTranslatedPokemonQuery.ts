import { Pokemon } from '@Domain/ValueObjects/Pokemon';

/**
 * Query object identifying a request to retrieve a Pokemon with a translated description
 */
export class GetTranslatedPokemonQuery {
    /**
     * @param pokemon The Pokemon object containing details to be translated
     */
    constructor(
        public readonly pokemon: Pokemon
    ) { }
}
