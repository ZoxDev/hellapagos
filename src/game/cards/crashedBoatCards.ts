import type { CardType, Rarity } from "../types";

type EffectParams = {
	playerCount: number;
	food: number;
	water: number;
	wood: number;
	bulletAmout: number;
	hasRevolver: boolean;
	playerOrder: any[];
	voteCount: number;
	hisPoisoned: boolean;
};

export type CrashedBoatCard = {
	id: number;
	rarity: Rarity;
	type: CardType;
	title: string;
	description: string;
	isPermanent?: boolean;
	waterAmount?: number;
	foodAmount?: number;
	effect?: (params: EffectParams) => void;
};

export const crashedBoatCards: CrashedBoatCard[] = [
	{
		id: 1,
		rarity: "rare",
		type: "crashedBoat",
		title: "Coconut",
		description: "This coconut will give you 3 food",
		foodAmount: 3,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 2,
		rarity: "common",
		type: "crashedBoat",
		title: "Water bottle",
		description: "A little potion of water that will give you 1 water",
		waterAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
	{
		id: 3,
		rarity: "common",
		type: "crashedBoat",
		title: "Sandwich",
		description: "A opened sandwich that will give you 1 food",
		foodAmount: 1,
	},
];

// 7 water bottle and 7 sandwich
// 6 bullet 3 revolver
// 5 useless card
