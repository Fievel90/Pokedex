import { GetPokemonQueryHandler } from './GetPokemonQueryHandler';
import { ClientInterface } from '../../../Shared/Pokemon/ClientInterface';
import { GetPokemonQuery } from './GetPokemonQuery';
import { Pokemon } from '../../../../Domain/ValueObjects/Pokemon';
import { HttpError } from '../../../../Domain/Errors/HttpError';
import { Logger } from '../../../../Infrastructure/Monitoring/Logger';

describe('GetPokemonQueryHandler', () => {
    let clientMock: jest.Mocked<ClientInterface>;
    let handler: GetPokemonQueryHandler;

    beforeEach(() => {
        clientMock = {
            getPokemon: jest.fn(),
        };
        handler = new GetPokemonQueryHandler(new Logger(), clientMock);
    });

    it('should return pokemon when client returns success', async () => {
        const pokemon = new Pokemon('pikachu', 'desc', 'forest', false);
        clientMock.getPokemon.mockResolvedValue({ success: true, data: pokemon });

        const query = new GetPokemonQuery('pikachu');
        const result = await handler.execute(query);

        expect(clientMock.getPokemon).toHaveBeenCalledWith('pikachu');
        expect(result).toEqual({ success: true, data: pokemon });
    });

    it('should return error when client returns failure', async () => {
        const error = new HttpError(404, 'Not found');
        clientMock.getPokemon.mockResolvedValue({ success: false, error });

        const query = new GetPokemonQuery('pikachu');
        const result = await handler.execute(query);

        expect(clientMock.getPokemon).toHaveBeenCalledWith('pikachu');
        expect(result).toEqual({ success: false, error });
    });
});
