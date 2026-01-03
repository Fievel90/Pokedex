import { GetTranslatedPokemonQueryHandler } from './GetTranslatedPokemonQueryHandler';
import { GetTranslatedPokemonQuery } from './GetTranslatedPokemonQuery';
import { Pokemon } from '../../../../Domain/ValueObjects/Pokemon';
import { LoggerInterface } from '../../../Shared/Monitoring/LoggerInterface';
import { ClientInterface } from '../../../Shared/Translator/ClientInterface';

// Mock LoggerInterface
const mockLogger: jest.Mocked<LoggerInterface> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

// Mock ClientInterface
const mockClient: jest.Mocked<ClientInterface> = {
    getTranslation: jest.fn(),
};

describe('GetTranslatedPokemonQueryHandler', () => {
    let handler: GetTranslatedPokemonQueryHandler;

    beforeEach(() => {
        handler = new GetTranslatedPokemonQueryHandler(mockLogger, mockClient);
        mockClient.getTranslation.mockClear();
    });

    it('should return pokemon with translated description using yoda if habitat is cave', async () => {
        const pokemon = new Pokemon('zubat', 'A bat pokemon', 'cave', false);
        const query = new GetTranslatedPokemonQuery(pokemon);

        mockClient.getTranslation.mockResolvedValue({
            success: true,
            data: 'Translated yoda description for cave habitat'
        });

        const result = await handler.execute(query);

        expect(mockClient.getTranslation).toHaveBeenCalledWith('yoda', 'A bat pokemon');
        expect(result.success).toBe(true);
        expect(result.data.description).toBe('Translated yoda description for cave habitat');
        expect(result.data.name).toBe('zubat');
    });

    it('should return pokemon with translated description using yoda if isLegendary is true', async () => {
        const pokemon = new Pokemon('mewtwo', 'A legendary pokemon', 'rare', true);
        const query = new GetTranslatedPokemonQuery(pokemon);

        mockClient.getTranslation.mockResolvedValue({
            success: true,
            data: 'Translated yoda description for legendary pokemon'
        });

        const result = await handler.execute(query);

        expect(mockClient.getTranslation).toHaveBeenCalledWith('yoda', 'A legendary pokemon');
        expect(result.success).toBe(true);
        expect(result.data.description).toBe('Translated yoda description for legendary pokemon');
        expect(result.data.name).toBe('mewtwo');
    });

    it('should return pokemon with translated description using shakespeare otherwise', async () => {
        const pokemon = new Pokemon('pikachu', 'A mouse pokemon', 'forest', false);
        const query = new GetTranslatedPokemonQuery(pokemon);

        mockClient.getTranslation.mockResolvedValue({
            success: true,
            data: 'Translated shakespeare description'
        });

        const result = await handler.execute(query);

        expect(mockClient.getTranslation).toHaveBeenCalledWith('shakespeare', 'A mouse pokemon');
        expect(result.success).toBe(true);
        expect(result.data.description).toBe('Translated shakespeare description');
        expect(result.data.name).toBe('pikachu');
    });

    it('should return original pokemon description when translation fails', async () => {
        const pokemon = new Pokemon('pikachu', 'A mouse pokemon', 'forest', false);
        const query = new GetTranslatedPokemonQuery(pokemon);

        mockClient.getTranslation.mockResolvedValue({
            success: false,
            error: 'Translation failed'
        });

        const result = await handler.execute(query);

        expect(mockClient.getTranslation).toHaveBeenCalledWith('shakespeare', 'A mouse pokemon');
        expect(result.success).toBe(true);
        expect(result.data.description).toBe('A mouse pokemon');
        expect(result.data.name).toBe('pikachu');
    });
});
