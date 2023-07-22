export interface HydraEntity {
    '@id': string;
    '@type': string;
}

export interface Chat extends HydraEntity {
    id: string;
    name: string;
}
