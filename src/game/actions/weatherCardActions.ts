import { allWeatherCards } from "../cards/allWeatherCards";

export const getWeatherCards = () => {
	const weatherCards = Array.from(allWeatherCards);
	const stormCardIndex = weatherCards.findIndex(
		(card) => card.weather === "storm",
	);
	if (stormCardIndex !== -1) {
		const stormCard = weatherCards[stormCardIndex];
		if (!stormCard)
			throw new Error(
				"Impossible state where stormCard is not defined after finding its index",
			);
		weatherCards.splice(stormCardIndex, 1);
		weatherCards.push(stormCard);
	}

	return weatherCards;
};
