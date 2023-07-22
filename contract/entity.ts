import { User } from "~/store/auth";

export interface HydraEntity {
    '@id': string;
    '@type': string;
}

export interface Chat extends HydraEntity {
    id: string;
    name: string;
}

export interface Stock extends HydraEntity {
    id: string;
    name: string;
    symbol: string;
}

export interface Portfolio extends HydraEntity {
    id: string;
    user: User;
    // eslint-disable-next-line no-use-before-define
    transactions: StockTransaction[];
}

export interface StockPrice extends HydraEntity {
    id: string;
    stock: Stock;
    price: number;
    changeAbsolute: number;
    changePercent: number;
}

export interface StockTransaction extends HydraEntity {
    id: string;
    portfolio: Portfolio;
    price: StockPrice;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}



