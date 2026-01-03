import { Result } from '@Domain/Types/Result';

export interface ClientInterface {
    getTranslation(translationType: string, text: string): Promise<Result<Error, string>>;
}
