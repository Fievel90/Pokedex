import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { Result } from '@Domain/Types/Result';

/**
 * Interface for retrieving Pokemon data from an external source
 */
export interface ClientInterface {
    /**
     * Retrieves Pokemon data by name
     * @param name The name of the Pokemon
     * @returns A promise resolving to a Result containing either the Pokemon data or an Error
     */
    getPokemon(name: string): Promise<Result<Error, Pokemon>>;
}
