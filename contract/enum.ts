export type ItemRarity = {
  name: string;
  label: string;
  value: number;
  emoji: string;
  lower?: string|null;
  higher?: string|null;
}

export type ItemAttribute = 'executable'|string;

export enum ItemRarityEnum {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
}
