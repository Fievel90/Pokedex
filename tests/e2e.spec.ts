import request from 'supertest';
import app from '../src/app';

describe('E2E', () => {
    it('GET / should return Hello World', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });

    describe('GET /pokemon/:name', () => {
        // Increase timeout for external API calls
        jest.setTimeout(30000);

        it('should return pokemon data when found (pikachu)', async () => {
            const response = await request(app).get('/pokemon/pikachu');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                name: 'pikachu',
                description: expect.any(String),
                habitat: 'forest',
                isLegendary: false,
            });
        });

        it('should return legendary pokemon data when found (lugia)', async () => {
            const response = await request(app).get('/pokemon/lugia');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                name: 'lugia',
                description: expect.any(String),
                habitat: 'rare',
                isLegendary: true,
            });
        });

        it('should return 404 when pokemon not found', async () => {
            const response = await request(app).get('/pokemon/this_pokemon_does_not_exist_123');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: expect.stringContaining('Failed to fetch pokemon'),
            });
        });

        // Note: We can't easily test 500 without mocking the external service failure in a way that HttpError isn't caught as 404, 
        // or by forcing a different error. 
        // For E2E tests against the real PokeAPI (via our HttpClient), we rely on real responses.
        // If we wanted to mock the external service for E2E, we'd need to mock 'fetch' globally or inject a mock client into the app.
        // Given the current setup uses the real HttpClient by default in src/app.ts, these are technically integration/E2E tests hitting the real API.
    });
});
