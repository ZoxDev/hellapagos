import { describe, test, expect } from "vitest";
import { drawWeatherCard, foodRoll } from "./utils/probability.js";

import { allWeatherCards, type WeatherCard } from "./cards/allWeatherCards.js";
import { getRandomInt } from "./utils/math.js";
import {
	drawAndDeleteWeatherCard,
	getWeatherCards,
} from "./actions/weatherCardActions.js";

// start of the game set (player / card order)
const playerCount = getRandomInt(3, 12);

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

// test of start round
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
		// Simulate the start draw of the weather card
		const weatherCard = getWeatherCards();
		const card = drawAndDeleteWeatherCard(weatherCard);

		const waterAmount = card.waterAmount;

		expect(waterAmount >= 0 && waterAmount <= 3).toMatchInlineSnapshot(`true`);
		expect(card.weather !== "storm").toMatchInlineSnapshot(`true`);
	});
});

// end of the round
describe("test in the end of the round", () => {
	test("eat food corresponding to the amount of players and store it in the global var", () => {});
	test("drink water corresponding to the amount of players and store it in the global var", () => {});
});

// end of the game
describe("test of the end of the game", () => {});
