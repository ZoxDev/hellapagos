import { assign, createMachine, createActor, setup } from "xstate";
import { foodRoll } from "../utils/probability";
import { getRandomInt } from "../utils/math";

// TODO: type these shits

const waterMachine = createMachine({
	context: {
		water: 10,
	},
	on: {
		INC_WATER_COUNT: {
			actions: assign({
				water: ({ event }) => event.value,
			}),
		},
		DEC_WATER_COUNT: {
			actions: assign({
				water: ({ event }) => event.value,
			}),
		},
	},
});

const foodMachine = createMachine({
	context: {
		food: 10,
	},
	on: {
		INC_FOOD_COUNT: {
			actions: assign({
				food: ({ event }) => event.value,
			}),
		},
		DEC_FOOD_COUNT: {
			actions: assign({
				food: ({ event }) => event.value,
			}),
		},
	},
});

export const waterActor = createActor(waterMachine, "water");
export const foodActor = createActor(foodMachine, "food");

const playerTurnMachine = setup({
	types: {
		events: {} as
			| { type: "Take water" }
			| { type: "Take food" }
			| { type: "Take a card" }
			| { type: "Gather Wood" }
			| { type: "Play the card"; cardId: number }
			| { type: "Gamgle wood"; amount: number }
			| { type: "End turn" },
		context: {} as {
			food: number;
			water: number;
			weatherWater: number;
		},
		input: {} as {
			playerCount: number;
			weatherWater: number;
		},
	},
	actions: {
		"add water": assign(({ context }) => {
			return {
				...context,
				water: context.water + context.weatherWater,
			};
		}),
		"add food": assign(({ context }) => {
			const number = getRandomInt(1, 6);
			const food = foodRoll(number);

			return {
				...context,
				food: context.food + food,
			};
		}),
		"draw card": () => {
			return {};
		},
		"gamble amount": () => {
			return {};
		},
		poisoned: () => {
			return {};
		},
		"play this card": () => {
			return {};
		},
		"move forward": () => {
			return {};
		},
		"add quantity": () => {
			return {};
		},
	},
	guards: {
		"has card left": () => true,
		"is gamgling": () => true,
		"has succeeded": () => true,
	},
})
	.createMachine({
		id: "playerTurn",
		initial: "Idle",
		context: ({ input }) => ({
			food: input.playerCount,
			water: 0,
			weatherWater: input.weatherWater,
		}),
		states: {
			Idle: {
				on: {
					"Take water": {
						actions: "add water",
						target: "Main Action Done",
					},
					"Take food": {
						actions: "add food",
						target: "Main Action Done",
					},
					"Take a card": {
						actions: "draw card",
						target: "Main Action Done",
					},
					"Gather Wood": {
						actions: "move forward",
						target: "Await Player Decision",
					},
				},
			},
			"Main Action Done": {
				on: {
					"End turn": {
						target: "End of turn",
					},
					"Play the card": [
						{
							guard: "has card left",
							actions: "play this card",
						},
						{ actions: "play this card", target: "End of turn" },
					],
				},
			},
			"Await Player Decision": {
				on: {
					"Gamgle wood": [
						{
							guard: "is gamgling",
							actions: "gamble amount",
							target: "Gamble",
						},
						{ target: "Main Action Done" },
					],
				},
			},
			Gamble: {
				always: [
					{
						guard: "has succeeded",
						actions: "add quantity",
						target: "Main Action Done",
					},
					{ actions: "poisoned", target: "End of turn" },
				],
			},
			"End of turn": {
				type: "final",
			},
		},
	})
	.provide({});
