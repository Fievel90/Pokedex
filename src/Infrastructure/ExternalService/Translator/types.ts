import * as z from "zod";

const SuccessSchema = z.object({
    total: z.number(),
});

const ContentsSchema = z.object({
    translated: z.string(),
    text: z.string(),
    translation: z.string(),
});

/**
 * Zod schema for validating translation response data
 */
export const TranslationResponseSchema = z.object({
    success: SuccessSchema,
    contents: ContentsSchema,
});

/**
 * Type definition for translation response data, inferred from the Zod schema
 */
export type TranslationResponse = z.infer<typeof TranslationResponseSchema>;
