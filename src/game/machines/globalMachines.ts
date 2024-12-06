import { setup } from "xstate";
import type { CrashedBoatCard } from "../cards/crashedBoatCards";

const playerTurnMachine = setup({
	types: {
		events: {} as
			| { type: "take_water" }
			| { type: "take_food" }
			| { type: "special_action" }
			| { type: "take_a_card" }
			| { type: "gather_wood" }
			| { type: "play_the_card" }
			| { type: "gambling" }
			| { type: "end_turn" },
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
		// ressources action
		add_water: ({ context }) => {
			return {};
		},
		add_food: () => {
			return {};
		},
		gamble_wood: () => {
			return {};
		},
		add_wood: () => {
			return {};
		},
		// card actions
		draw_card: () => {
			return {};
		},
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
			food: input.playerCount,
			water: 0,
			playerPosition: 0,
			weatherWater: input.weatherWater,
			crashedBoatCards: input.crashedBoatCards,
		}),
		states: {
			Idle: {
				on: {
					take_water: {
						actions: "add_water",
						target: "Main Action Done",
					},
					take_food: {
						actions: "add_food",
						target: "Main Action Done",
					},
					take_a_card: {
						actions: "draw_card",
						target: "Main Action Done",
					},
					gather_wood: {
						actions: "move_forward",
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
						{ target: "Main Action Done" },
					],
				},
			},
			Gamble: {
				always: [
					{
						guard: "has_succeeded",
						actions: "add_wood",
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
