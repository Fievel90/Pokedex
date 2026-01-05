import { Result } from '@Domain/Types/Result';

/**
 * Interface for translating text via an external source
 */
export interface ClientInterface {
    /**
     * Translates text using a specified translation type
     * @param translationType The type of translation to apply (e.g., 'yoda', 'shakespeare')
     * @param text The text to translate
     * @returns A promise resolving to a Result containing either the translated text or an Error
     */
    getTranslation(translationType: string, text: string): Promise<Result<Error, string>>;
}
