import { Pokemon } from '@Domain/ValueObjects/Pokemon';

export class GetTranslatedPokemonQuery {
    constructor(
        public readonly pokemon: Pokemon
    ) { }
}
