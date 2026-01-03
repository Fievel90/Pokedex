import { HttpClient } from './HttpClient';
import { Pokemon } from '../../../Domain/ValueObjects/Pokemon';
import { HttpError } from '../../../Domain/Errors/HttpError';
import { ValidationError } from '../../../Domain/Errors/ValidationError';
import { LoggerInterface } from '../../../Application/Shared/Monitoring/LoggerInterface';

// Mock LoggerInterface
const mockLogger: jest.Mocked<LoggerInterface> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('HttpClient', () => {
    let service: HttpClient;

    beforeEach(() => {
        service = new HttpClient(mockLogger);
        mockFetch.mockClear();
    });

    it('should return a Pokemon with correct details when API returns data', async () => {
        const mockResponse = {
            id: 25,
            name: 'pikachu',
            flavor_text_entries: [
                {
                    language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9' },
                    flavor_text: 'When several of\nthese POKeMON\ngather, their\nelectricity could\nbuild and cause\nlightning storms.'
                }
            ],
            habitat: { name: 'forest', url: 'https://pokeapi.co/api/v2/habitat/2' },
            is_legendary: false
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await service.getPokemon('pikachu');

        expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/pikachu');
        expect(result.success).toBe(true);
        expect(result.data).toBeInstanceOf(Pokemon);
        expect(result.data.name).toBe('pikachu');
        expect(result.data.description).toBe('When several of these POKeMON gather, their electricity could build and cause lightning storms.');
        expect(result.data.habitat).toBe('forest');
        expect(result.data.isLegendary).toBe(false);
    });

    it('should return a validation error if Pokemon does not have the expected shape', async () => {
        const mockResponse = {
            id: 25,
            name: 'pikachu',
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await service.getPokemon('pikachu');

        expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/pikachu');
        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    });

    it('should return a validation error if Pokemon name is empty', async () => {
        const result = await service.getPokemon('');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    });

    it('should return an http error if Pokemon is not found', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 404,
            text: async () => 'Pokemon not found'
        });

        const result = await service.getPokemon('unknown');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(HttpError);
    });
});
