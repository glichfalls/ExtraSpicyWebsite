interface HydraResponseBase {
    '@context': string;
    '@type': string;
}

export interface HydraResponse<T> extends HydraResponseBase {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

export type HydraResponseSingle<T> = T & HydraResponseBase & { '@id': string };
