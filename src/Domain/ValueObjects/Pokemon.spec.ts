import { Pokemon } from './Pokemon';

describe('Pokemon', () => {
    it('should create a valid Pokemon instance', () => {
        const pokemon = new Pokemon('Pikachu', 'Electric Mouse Pokemon', 'Forest', false);

        expect(pokemon.name).toBe('Pikachu');
        expect(pokemon.description).toBe('Electric Mouse Pokemon');
        expect(pokemon.habitat).toBe('Forest');
        expect(pokemon.isLegendary).toBe(false);
    });
});
