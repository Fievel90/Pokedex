import { HttpClient } from './HttpClient';
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

    it('should return translated text when API returns valid data', async () => {
        const mockResponse = {
            success: { total: 1 },
            contents: {
                translated: "Lost a planet, master obiwan has.",
                text: "Master Obiwan has lost a planet.",
                translation: "yoda"
            }
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await service.getTranslation('yoda', 'Master Obiwan has lost a planet.');

        expect(mockFetch).toHaveBeenCalledWith('https://api.funtranslations.com/translate/yoda.json', expect.objectContaining({
            method: 'POST',
        }));
        expect(result.success).toBe(true);
        expect(result.data).toBe("Lost a planet, master obiwan has.");
    });

    it('should return a validation error if response is invalid', async () => {
        const mockResponse = {
            success: { total: 1 },
            contents: {
                // missing translated field
                text: "Master Obiwan has lost a planet.",
                translation: "yoda"
            }
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await service.getTranslation('yoda', 'test');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    });

    it('should return a validation error if text is empty', async () => {
        const result = await service.getTranslation('yoda', '');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    });

    it('should return an http error if API fails', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 429,
            text: async () => 'Rate Limit Exceeded'
        });

        const result = await service.getTranslation('yoda', 'test');

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(HttpError);
    });
});
