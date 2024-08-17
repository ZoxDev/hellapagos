import { describe, test, expect } from "vitest";
import { foodActor } from "./machines/globalMachine";

describe("player actions during round", () => {
	test("gather food and store it in the global var", () => {
		foodActor.start();
		const foodBefore = foodActor.getSnapshot().context.food;

		const food = Math.floor(Math.random() * 3) + 1;
		foodActor.send({ type: "INC_FOOD_COUNT", value: foodBefore + food });

		const foodAfter = foodActor.getSnapshot().context.food;
		foodActor.stop();

		expect(food >= 1 && food <= 3).toMatchInlineSnapshot(`true`);
		expect(foodBefore + food === foodAfter).toMatchInlineSnapshot(`true`);
	});

	test("eat food and store it in the global var", () => {
		foodActor.start();
		const foodBefore = foodActor.getSnapshot().context.food;

		const food = Math.floor(Math.random() * 16) + 3;
		foodActor.send({ type: "DEC_FOOD_COUNT", value: foodBefore - food });

		const foodAfter = foodActor.getSnapshot().context.food;
		foodActor.stop();

		expect(food >= 3 && food <= 16).toMatchInlineSnapshot(`true`);
		expect(foodBefore - food === foodAfter).toMatchInlineSnapshot(`true`);
	});
});
