import type { CrashedBoatCard } from "../cards/crashedBoatCards";

export const deleteCard = (
	cardToDelete: CrashedBoatCard,
	cards: CrashedBoatCard[],
) => {
	const index = cards.findIndex((card) => card.id === cardToDelete.id);
	cards.splice(index, 1);

	return cards;
};

export const reverseStatus = (status: boolean) => {
	return !status;
};

// TODO: give back card
