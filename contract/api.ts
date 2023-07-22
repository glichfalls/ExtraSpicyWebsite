export interface HydraResponse<T> {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': T[];
    'hydra:totalItems': number;
}
