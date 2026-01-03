import { GetPokemonQueryHandler } from './GetPokemonQueryHandler';
import { ClientInterface } from '../../../Shared/Pokemon/ClientInterface';
import { GetPokemonQuery } from './GetPokemonQuery';
import { Pokemon } from '../../../../Domain/ValueObjects/Pokemon';
import { HttpError } from '../../../../Domain/Errors/HttpError';
import { LoggerInterface } from '../../../Shared/Monitoring/LoggerInterface';

// Mock LoggerInterface
const mockLogger: jest.Mocked<LoggerInterface> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

// Mock ClientInterface
const mockClient: jest.Mocked<ClientInterface> = {
    getPokemon: jest.fn(),
};

describe('GetPokemonQueryHandler', () => {
    let handler: GetPokemonQueryHandler;

    beforeEach(() => {
        handler = new GetPokemonQueryHandler(mockLogger, mockClient);
    });

    it('should return pokemon when client returns success', async () => {
        const pokemon = new Pokemon('pikachu', 'desc', 'forest', false);
        mockClient.getPokemon.mockResolvedValue({ success: true, data: pokemon });

        const query = new GetPokemonQuery('pikachu');
        const result = await handler.execute(query);

        expect(mockClient.getPokemon).toHaveBeenCalledWith('pikachu');
        expect(result).toEqual({ success: true, data: pokemon });
    });

    it('should return error when client returns failure', async () => {
        const error = new HttpError(404, 'Not found');
        mockClient.getPokemon.mockResolvedValue({ success: false, error });

        const query = new GetPokemonQuery('pikachu');
        const result = await handler.execute(query);

        expect(mockClient.getPokemon).toHaveBeenCalledWith('pikachu');
        expect(result).toEqual({ success: false, error });
    });
});
