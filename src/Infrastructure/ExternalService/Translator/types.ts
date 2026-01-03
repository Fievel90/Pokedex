import * as z from "zod";

const SuccessSchema = z.object({
    total: z.number(),
});

const ContentsSchema = z.object({
    translated: z.string(),
    text: z.string(),
    translation: z.string(),
});

export const TranslationResponseSchema = z.object({
    success: SuccessSchema,
    contents: ContentsSchema,
});

export type TranslationResponse = z.infer<typeof TranslationResponseSchema>;
