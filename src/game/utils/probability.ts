import type { Cards, Rarity } from "../types";

export const foodRoll = (rollResult: number) => {
	if (rollResult >= 1 && rollResult <= 3) return 1;
	if (rollResult >= 4 && rollResult <= 5) return 2;
	return 3;
};

const rarityCardProbability = (rollResult: number): Rarity => {
	if (rollResult >= 1 && rollResult <= 3) return "common";
	if (rollResult >= 4 && rollResult <= 5) return "uncommon";
	return "rare";
};

export const dropedCard = (cards: Cards) => {
	const { cards: cardsData } = cards;

	const roll = Math.floor(Math.random() * 6) + 1;
	const rarity = rarityCardProbability(roll);

	const dropedCards = cardsData.filter((card) => card.rarity === rarity);
	return dropedCards[Math.floor(Math.random() * dropedCards.length)];
};
