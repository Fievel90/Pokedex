/**
 * Query object identifying a request to retrieve Pokemon details
 */
export class GetPokemonQuery {
    /**
     * @param name The name of the Pokemon to retrieve
     */
    constructor(public readonly name: string) { }
}
