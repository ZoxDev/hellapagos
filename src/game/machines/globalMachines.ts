import { setup } from "xstate";
import type { CrashedBoatCard } from "../cards/crashedBoatCards";

const playerTurnMachine = setup({
	types: {
		events: {} as
			| { type: "Take water" }
			| { type: "Take food" }
			| { type: "Special action" }
			| { type: "Take a card" }
			| { type: "Gather Wood" }
			| { type: "Play the card"; cardId: number }
			| { type: "Gamgle wood"; amount: number }
			| { type: "End turn" },
		context: {} as {
			food: number;
			water: number;
			playerPosition: number;
			weatherWater: number;
			crashedBoatCards: CrashedBoatCard[];
		},
		input: {} as {
			playerCount: number;
			weatherWater: number;
			crashedBoatCards: CrashedBoatCard[];
		},
	},
	actions: {
		"add water": () => {
			return {};
		},
		"add food": () => {
			return {};
		},
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
			playerPosition: 0,
			weatherWater: input.weatherWater,
			crashedBoatCards: input.crashedBoatCards,
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
