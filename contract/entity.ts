import { User } from "~/store/auth";
import { ItemAttribute, ItemRarity } from '~/contract/enum';

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

export interface Item extends HydraEntity {
    id: string;
    name: string;
    description: string;
    price: number|null;
    rarity: ItemRarity;
    permanent: boolean;
    attributes: ItemAttribute[];
    imagePublicPath: string|null;
    effects?: Effect[];
}

export interface ItemInstance extends HydraEntity {
    id: string;
    item: Item;
    chat: Chat;
    owner: User;
    tradeable: boolean;
    expiresAt: Date|null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Effect extends HydraEntity {
    id: string;
    name: string;
    description: string;
    type: string;
    operator: string;
    magnitude: number;
}
