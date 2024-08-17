import { describe, test, expect } from "vitest";
import { foodActor, waterActor } from "./machines/globalMachines.js";
import { drawWeatherCard, foodRoll } from "./utils/probability.js";

import { allWeatherCards, type WeatherCard } from "./cards/allWeatherCards.js";
import { getRandomInt } from "./utils/math.js";

// start of the game set (player / card order)
const playerCount = getRandomInt(3, 12);

// start of the round
const getWeatherCards = () => {
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

// test of the setup start
describe("verify the setup start", () => {
	test("storm to the end of the cards", () => {
		const weatherCards = getWeatherCards();
		expect(
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			weatherCards[weatherCards.length - 1]!.weather,
		).toMatchInlineSnapshot(`"storm"`);
	});
});

const drawAndDeleteWeatherCard = (weatherCards: WeatherCard[]) => {
	const card = drawWeatherCard(weatherCards);
	if (!card) {
		throw new Error("Impossible state where card is not defined after drawing");
	}
	weatherCards.splice(weatherCards.indexOf(card), 1);

	return card;
};

// test of the start of the round
describe("test of the start of the round", () => {
	test("draw a weather that is not storm", () => {
		const card = drawAndDeleteWeatherCard(getWeatherCards());
		expect(card.weather !== "storm").toMatchInlineSnapshot(`true`);
	});
});

// player actions during round
describe("player actions during round", () => {
	test("gather food", () => {
		const number = getRandomInt(1, 6);
		const food = foodRoll(number);

		expect(food >= 1 && food <= 3).toMatchInlineSnapshot(`true`);
	});

	test("player gather water", () => {
		waterActor.start();
		const card = drawAndDeleteWeatherCard(getWeatherCards());
		const waterAmount = card.waterAmount;

		expect(waterAmount >= 0 && waterAmount <= 3).toMatchInlineSnapshot(`true`);
		expect(card.weather !== "storm").toMatchInlineSnapshot(`true`);
	});
});

// end of the round
describe("test in the end of the round", () => {
	test("eat food corresponding to the amount of players and store it in the global var", () => {
		foodActor.start();
		const foodBefore = foodActor.getSnapshot().context.food;

		foodActor.send({ type: "DEC_FOOD_COUNT", value: foodBefore - playerCount });

		const foodAfter = foodActor.getSnapshot().context.food;
		foodActor.stop();

		expect(foodBefore - playerCount === foodAfter).toMatchInlineSnapshot(
			`true`,
		);
	});
});

// end of the game
describe("test of the end of the game", () => {});
