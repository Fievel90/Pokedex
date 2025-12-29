import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { Result } from '@Domain/Types/Result';

export interface ClientInterface {
    getPokemon(name: string): Promise<Result<Error, Pokemon>>;
}
