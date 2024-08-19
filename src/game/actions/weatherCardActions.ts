import { allWeatherCards, type WeatherCard } from "../cards/allWeatherCards";
import { drawWeatherCard } from "../utils/probability";

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

export const drawAndDeleteWeatherCard = (weatherCards: WeatherCard[]) => {
	const card = drawWeatherCard(weatherCards);
	if (!card) {
		throw new Error("Impossible state where card is not defined after drawing");
	}
	weatherCards.splice(weatherCards.indexOf(card), 1);

	return card;
};
