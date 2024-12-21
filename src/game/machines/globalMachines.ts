import { assertEvent, assign, setup } from "xstate";
import type { WeatherCard } from "../cards/allWeatherCards";
import type { CrashedBoatCard } from "../cards/crashedBoatCards";
import { getRandomInt } from "../utils/math";
import { drawCrashedBoatCard, drawWeatherCard } from "../utils/probability";

const playerTurnMachine = setup({
	types: {
		events: {} as
			| { type: "take_water" }
			| { type: "take_food" }
			| { type: "special_action" }
			| { type: "take_a_card" }
			| { type: "gather_wood" }
			| { type: "play_the_card" }
			| { type: "gambling"; amount: number }
			| { type: "end_turn" },
		context: {} as {
			food: number;
			water: number;
			wood: number;
			waterInWeatherCard: number;
			playerPosition: number;
			playerCards: CrashedBoatCard[];
			crashedBoatCards: CrashedBoatCard[];
			weatherCards: WeatherCard[];
			poisoned: boolean;
		},
		input: {} as {
			playerCount: number;
			water: number;
			food: number;
			crashedBoatCards: CrashedBoatCard[];
			weatherCards: WeatherCard[];
		},
	},
	actions: {
		// ressources action
		add_water: assign(({ context }) => {
			return { water: context.water + context.waterInWeatherCard };
		}),
		add_food: assign(({ context }) => {
			const gatherFoodAmount = getRandomInt(1, 3);

			return { food: context.food + gatherFoodAmount };
		}),
		gamble_wood: assign(({ context, event }) => {
			assertEvent(event, "gambling");

			const gambling = getRandomInt(1, 6);

			if (event.amount > gambling) return { poisoned: true };

			return { wood: context.wood + event.amount };
		}),
		not_gambling: assign(({ context }) => {
			return { wood: context.wood + 1 };
		}),
		// card actions
		draw_weather_card: assign(({ context }) => {
			const card = drawWeatherCard(context.weatherCards);
			const index = context.weatherCards.findIndex((el) => el.id === card.id);

			return {
				waterInWeatherCard: card.waterAmount,
				weatherCards: context.weatherCards.splice(index, 1),
			};
		}),
		draw_crashed_card: assign(({ context }) => {
			const card = drawCrashedBoatCard(context.crashedBoatCards);
			const index = context.crashedBoatCards.findIndex(
				(el) => el.id === card.id,
			);

			return {
				playerCards: [...context.playerCards, card],
				crashedBoatCards: context.crashedBoatCards.splice(index, 1),
			};
		}),
		play_this_card: () => {
			return {};
		},
		// general actions
		poisoned: () => {
			return {};
		},
		move_forward: () => {
			return {};
		},
	},
	guards: {
		has_card_left: () => true,
		is_gamgling: () => true,
		has_succeeded: () => true,
	},
})
	.createMachine({
		id: "playerTurn",
		initial: "Idle",
		context: ({ input }) => ({
			food: input.playerCount * 3,
			water: input.playerCount * 3,
			wood: 0,
			playerPosition: 0,
			playerCards: [],
			waterInWeatherCard: 0,
			crashedBoatCards: input.crashedBoatCards,
			weatherCards: input.weatherCards,
			poisoned: false,
		}),
		states: {
			Idle: {
				on: {
					take_water: {
						actions: ["draw_weather_card", "add_water"],
						target: "Main Action Done",
					},
					take_food: {
						actions: "add_food",
						target: "Main Action Done",
					},
					take_a_card: {
						actions: "draw_crashed_card",
						target: "Main Action Done",
					},
					gather_wood: {
						target: "Await Player Decision",
					},
				},
			},
			"Main Action Done": {
				on: {
					end_turn: {
						target: "End of turn",
					},
					play_the_card: [
						{
							guard: "has_card_left",
							actions: "play_this_card",
						},
					],
				},
			},
			"Await Player Decision": {
				on: {
					gambling: [
						{
							guard: "is_gamgling",
							actions: "gamble_wood",
							target: "Gamble",
						},
						{ target: "Main Action Done", actions: "not_gambling" },
					],
				},
			},
			Gamble: {
				always: [
					{
						guard: "has_succeeded",
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
