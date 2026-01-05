/**
 * Value object representing a Pokemon
 */
export class Pokemon {
    /**
     * @param name The name of the Pokemon
     * @param description The description of the Pokemon
     * @param habitat The habitat of the Pokemon
     * @param isLegendary Whether the Pokemon is legendary
     */
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly habitat: string,
        public readonly isLegendary: boolean
    ) { }
}
