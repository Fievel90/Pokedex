import * as z from "zod";

const NamedAPIResource = z.object({
    name: z.string(),
    url: z.string(),
});

const FlavorText = z.object({
    flavor_text: z.string(),
    language: NamedAPIResource,
});

export const PokemonSpecies = z.object({
    id: z.number(),
    name: z.string(),
    is_legendary: z.boolean(),
    habitat: NamedAPIResource.optional(),
    flavor_text_entries: z.array(FlavorText),
});

export type PokemonSpecies = z.infer<typeof PokemonSpecies>;
