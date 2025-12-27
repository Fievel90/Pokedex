import { Pokemon } from '@Domain/ValueObjects/Pokemon';
import { Result } from '@Domain/Types/Result';
import { HttpError } from '@Domain/Errors/HttpError';

export interface ClientInterface {
    getPokemon(name: string): Promise<Result<HttpError, Pokemon>>;
}
