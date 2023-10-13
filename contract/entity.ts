import { User } from "~/store/auth";

export interface HydraEntity {
    '@id': string;
    '@type': string;
    id: string;
}

export interface ChatConfig extends HydraEntity {
    id: string;
    chat: Chat;
    passiveHonorEnabled: boolean;
    passiveHonorAmount: number;
}

export interface Chat extends HydraEntity {
    id: string;
    name: string;
    config: ChatConfig;
    users: User[];
}

export interface Message extends HydraEntity {
    id: string;
    chat: Chat;
    user: User;
    telegramMessageId: number|null;
    telegramThreadId: number|null;
    message: string;
    createdAt: string;
}

export interface Stock extends HydraEntity {
    id: string;
    name: string;
    symbol: string;
}

export interface Portfolio extends HydraEntity {
    id: string;
    chat: Chat;
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

export interface Sticker extends HydraEntity {
    id: string;
    file: {
        id: string;
        filePath: string;
    }
}

export interface Collectable extends HydraEntity {
    id: string;
    name: string;
    description: string;
    imagePublicPath: string|null;
    tradeable: boolean;
    isUnique: boolean;
}

export interface CollectableInstance extends HydraEntity {
    id: string;
    collectable: Collectable;
    user: User;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

