import request from 'supertest';
import app from '../src/app';

describe('E2E', () => {
    jest.setTimeout(30000);

    it('GET / should return Hello World', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });

    describe('GET /pokemon/:name', () => {
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
    });

    describe('GET /pokemon/translated/:name', () => {
        it('should return shakespeare pokemon translated data when habitat is not cave or is not legendary (pikachu)', async () => {
            const originalResponse = await request(app).get('/pokemon/pikachu');
            const translatedResponse = await request(app).get('/pokemon/translated/pikachu');

            expect(translatedResponse.status).toBe(200);
            expect(translatedResponse.body).not.toStrictEqual(originalResponse.body);
        });

        it('should return yoda pokemon translated data when is a cave habitat (zubat)', async () => {
            const originalResponse = await request(app).get('/pokemon/zubat');
            const translatedResponse = await request(app).get('/pokemon/translated/zubat');

            expect(translatedResponse.status).toBe(200);
            expect(translatedResponse.body).toEqual({
                name: 'zubat',
                description: expect.any(String),
                habitat: 'cave',
                isLegendary: false,
            });
            expect(translatedResponse.body).not.toStrictEqual(originalResponse.body);
        });

        it('should return yoda pokemon translated data when is legendary (lugia)', async () => {
            const originalResponse = await request(app).get('/pokemon/lugia');
            const translatedResponse = await request(app).get('/pokemon/translated/lugia');

            expect(translatedResponse.status).toBe(200);
            expect(translatedResponse.body).toEqual({
                name: 'lugia',
                description: expect.any(String),
                habitat: 'rare',
                isLegendary: true,
            });
            expect(translatedResponse.body).not.toStrictEqual(originalResponse.body);
        });

        it('should return 404 when pokemon not found', async () => {
            const response = await request(app).get('/pokemon/translated/this_pokemon_does_not_exist_123');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: expect.stringContaining('Failed to fetch pokemon'),
            });
        });
    });
});
