import type { CardType, Rarity } from "../types";
import { getRandomInt } from "../utils/math";
import type { WeatherCard } from "./allWeatherCards";

export type EffectParams = {
	foodAmount: number;
	waterAmount: number;
	bulletAmout: number;
	hasRevolver: boolean;
	cards: CrashedBoatCard[];
	players: any[];
	currentPlayer: any;
	selectedPlayer: any;
	opponentsCards: { [playerId: string]: CrashedBoatCard[] };
	playerCount: number;
	playerOrder: any[];
	crashedBoatCards: CrashedBoatCard[];
	weatherCards: WeatherCard[];
	voteCount: number;
	playerStatus: "poisoned" | "dead" | "fine";
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
	{
		id: 4,
		rarity: "rare",
		type: "crashedBoat",
		title: "Hachet",
		description:
			"This hachet grant you to take 2 wood without risking your life",
		isPermanent: true,
	},
	{
		id: 5,
		rarity: "rare",
		type: "crashedBoat",
		title: "Pack of fruits",
		description:
			"This huge pack came from the sea, it will save you and your friends from hunger",
		effect: ({ foodAmount, waterAmount }) => {
			if (foodAmount === 0 || waterAmount === 0) {
				// TODO: function to reset global food and water (should use store i guss)
			}
		},
	},
	{
		id: 6,
		rarity: "rare",
		type: "crashedBoat",
		title: "Barometer",
		description:
			"This barometer will let you see through the next 2 meteo cards",
		effect: ({ weatherCards }) => {
			if (weatherCards.length < 2) {
				const meteoCardToReveal = weatherCards;

				return meteoCardToReveal;
			}

			const reteoCardToReveal = weatherCards.splice(0, 2);

			return reteoCardToReveal;
		},
	},
	{
		id: 7,
		rarity: "rare",
		type: "crashedBoat",
		title: "Sleeping pill",
		description:
			"You have three sleeping pills, this will let you see steal a random card from three opponents",
		effect: ({ players: selectedPlayers, opponentsCards }) => {
			if (opponentsCards) {
				// TODO: give back the card
				throw new Error(
					"The opponent didn't have any cards... You can retry :)",
					{ cause: opponentsCards },
				);
			}

			const cardsToTake = selectedPlayers.map((player) => {
				const opponentCards = opponentsCards[player.id] as CrashedBoatCard[];
				return opponentCards[getRandomInt(0, opponentCards.length)];
			});

			// TODO: in return give the cards with function
		},
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 8,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Bullet",
		description: "A bullet that will give you 1 shot to one of your opponent",
	},
	{
		id: 9,
		rarity: "rare",
		type: "crashedBoat",
		title: "Revolver",
		description: "Take care one bullet of this shit will kill anyone",
		isPermanent: true,
	},
	{
		id: 10,
		rarity: "rare",
		type: "crashedBoat",
		title: "Fishing rod",
		description: "You catch 2 times more fish",
		isPermanent: true,
	},
	{
		id: 11,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "flashlight",
		description: "You can see the 3 next crashed boat cards",
		effect: ({ crashedBoatCards }) => {
			if (crashedBoatCards.length < 3) {
				const crashedBoatCardsToReveal = crashedBoatCards;

				return crashedBoatCardsToReveal;
			}

			const crashedBoatCardsToReveal = crashedBoatCards.splice(0, 3);

			return crashedBoatCardsToReveal;
		},
	},
	{
		id: 12,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Voodoo doll",
		description: "On the next turn, this doll will revive one of your mates",
		effect: ({ selectedPlayer }) => {
			// TODO: function to revive player
		},
	},
	{
		id: 13,
		rarity: "common",
		type: "crashedBoat",
		title: "Metal plate",
		description: "This metal plate will protect you from a bullet",
	},
	{
		id: 13,
		rarity: "common",
		type: "crashedBoat",
		title: "Metal plate",
		description: "This metal plate will protect you from a bullet",
	},
	{
		id: 13,
		rarity: "common",
		type: "crashedBoat",
		title: "Metal plate",
		description: "This metal plate will protect you from a bullet",
	},
	{
		id: 13,
		rarity: "common",
		type: "crashedBoat",
		title: "Metal plate",
		description: "This metal plate will protect you from a bullet",
	},
	{
		id: 14,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Pendulum",
		description:
			"With this, you can force one of your opponent to do an action (food, water or wood), use only if this guy is crazy",
		effect: ({ selectedPlayer, playerOrder, currentPlayer }) => {
			if (playerOrder[playerOrder.length - 1].id === currentPlayer.id) {
				// TODO: give back the card

				throw new Error("You can't force yourself to do an action wtf");
			}

			// TODO: function to force action
		},
	},
	/* -----------------------------------------------------------------------------
	 * TODO: determine the card title and desc
	 * -----------------------------------------------------------------------------*/
	{
		id: 15,
		rarity: "common",
		type: "crashedBoat",
		title: "useless card",
		description: "This card is useless",
	},
	{
		id: 15,
		rarity: "common",
		type: "crashedBoat",
		title: "useless card",
		description: "This card is useless",
	},
	{
		id: 15,
		rarity: "common",
		type: "crashedBoat",
		title: "useless card",
		description: "This card is useless",
	},
	{
		id: 15,
		rarity: "common",
		type: "crashedBoat",
		title: "useless card",
		description: "This card is useless",
	},
	{
		id: 15,
		rarity: "common",
		type: "crashedBoat",
		title: "useless card",
		description: "This card is useless",
	},
	/* -----------------------------------------------------------------------------
	 *
	 * -----------------------------------------------------------------------------*/
	{
		id: 16,
		rarity: "common",
		type: "crashedBoat",
		title: "Telescope",
		description: "With this telescope you can see through one opponent card",
		effect: ({ selectedPlayer, opponentsCards }) => {
			const selectedPlayerCards = opponentsCards[selectedPlayer.id];

			if (!selectedPlayerCards || selectedPlayerCards.length === 0) {
				// TODO: give back the card

				throw new Error("You can't see through an empty card");
			}

			return selectedPlayerCards[getRandomInt(0, selectedPlayerCards.length)];
		},
	},
	{
		id: 17,
		rarity: "rare",
		type: "crashedBoat",
		title: "Immunity totem",
		description: "This immunity totem will protect you from the next vote",
		effect: () => {
			// Pop the player from the vote list in the global (and store it in pending somthg like that)
		},
		// TODO: this card can be play at any time, create an event in the global machine
	},
	{
		id: 18,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Adrelanine",
		description: "Heal you from any poisoned effect",
		effect: ({ playerStatus }) => {
			if (playerStatus !== "poisoned") {
				// TODO: give back the card

				return new Error(
					"You can't apply adrelanine in other status than poisoned",
				);
			}
		},
	},
	{
		id: 19,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Vegetable mill",
		description: "You can transform 2 water into food and 2 food into water",
		effect: ({ waterAmount, foodAmount }) => {
			if (waterAmount < 2 || foodAmount < 2) {
				// TODO: give back the card

				return new Error("You can't transform less than 2 water or food");
			}

			return {};
		},
	},
	{
		id: 20,
		rarity: "common",
		type: "crashedBoat",
		title: "Stagnant water",
		description: "You can drinkm, but you will be poisoned",
		effect: ({ playerStatus }) => {
			playerStatus = "poisoned";

			// TODO: function to set new water amount
			return playerStatus;
		},
	},
	{
		id: 21,
		rarity: "uncommon",
		type: "crashedBoat",
		title: "Cristal ball",
		description: "You vote at the end forever",
		isPermanent: true,
		effect: () => {
			// TODO: this action should be triggered on the (vote action) maybe as a guard
		},
	},
];

// 7 water bottle and 7 sandwich
// 6 bullet 3 revolver
// 5 useless card
