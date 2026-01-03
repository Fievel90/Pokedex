import { ClientInterface } from '@Application/Shared/Translator/ClientInterface';
import { Result } from '@Domain/Types/Result';
import { HttpError } from '@Domain/Errors/HttpError';
import { ValidationError } from '@Domain/Errors/ValidationError';
import { LoggerInterface } from '@Application/Shared/Monitoring/LoggerInterface';
import { TranslationResponseSchema } from './types';
import config from '@Infrastructure/Environments/config';

export class HttpClient implements ClientInterface {
    private readonly baseUrl = config.translatorClient.baseUrl;

    constructor(private readonly logger: LoggerInterface) { }

    async getTranslation(translationType: string, text: string): Promise<Result<Error, string>> {
        this.logger.info(`Fetching translation`, { translationType, text });

        if (!text || !translationType) {
            this.logger.error(`Text or translation type are required`, {
                translationType,
                text,
            });

            return {
                success: false,
                error: new ValidationError('Text or translation type are required'),
            };
        }

        const body = new URLSearchParams({ text });
        let response: Response;
        try {
            response = await fetch(`${this.baseUrl}/${translationType}.json`, {
                method: 'POST',
                headers: {
                    ...(config.translatorClient.apiKey.length > 0 ? { 'X-Funtranslations-Api-Secret': config.translatorClient.apiKey } : {}),
                },
                body: body,
            });
        } catch (error) {
            this.logger.error(`Failed to fetch translation`, {
                translationType,
                text,
                body: error,
            });

            return {
                success: false,
                error: new HttpError(500, `Failed to fetch '${translationType}' translation for '${text}'`),
            };
        }

        if (!response.ok) {
            this.logger.error(`Failed to fetch translation`, {
                translationType,
                text,
                status: response.status,
                body: await response.text(),
            });

            return {
                success: false,
                error: new HttpError(response.status, `Failed to fetch '${translationType}' translation for '${text}'`),
            };
        }

        const data = await response.json();

        const result = TranslationResponseSchema.safeParse(data);
        if (!result.success) {
            this.logger.error(`Failed to parse translation`, {
                translationType,
                text,
                body: data,
                error: result.error.message,
            });

            return {
                success: false,
                error: new ValidationError(result.error.message),
            };
        } else {
            this.logger.info(`Translation fetched successfully`, {
                translationType,
                text,
            });
            this.logger.debug(`Translation fetched successfully: body`, {
                translationType,
                text,
                body: data,
            });

            return {
                success: true,
                data: result.data.contents.translated,
            };
        }
    }
}
