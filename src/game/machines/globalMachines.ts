import { assign, createMachine, createActor, setup } from "xstate";
import { foodRoll } from "../utils/probability";
import { getRandomInt } from "../utils/math";

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
		/** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgFQFccA7AOgEkJUwBiPdAazAAIB3dAF1wG0AGAXUQoA9rACWHMcOJCQAD0QBGAKwAOUooAsazQCZlegOyaAnCYA0ITIk0BmXaVW9DugGy3XixapO7VmgF8AyzQsXEISCipaeiZmADNhYQg+QSQQZFEJKRl0hQQVdS0dfSNTCytEZV0TDVVdN11tZVdtVyCQjGx8IjJKajpGFnRmAGN0HBSBWUzxSWlZfMKNbX9S3WMzS2sEV31SZWUXTxqTWxNVWw6MrvDeqIGAcU4AC1xmAHUkqbSROZzFko1CsSgYNuVtohbLxlKQLq5eCZFDVbKjXMorsEbmEepEALLoMTEZgAQVG82JABFpLQAKLECDMDi9VIzLIUwEFDzqXhOVyqQyuQz1c6GSG7bRw2x6ZSI3xIrzXULdCJkAlE0nknLManEWgABS6TLeYwmPzZ-wWeSUil4Dl0vJqKmMyNcrnFGPU0KOqncHg8eyVt1xasJxLJFJ1NJohqwxpY40m3EUvwy7IB1q5-NIvN4-MFwt0oo9pgOyl81S0SLUmM6ONVpBJ7AkzFj3R1YFGYnE0hozwAtlBqGxvqz0rNslbQPllFo4apFC7XEjdF4xZUCq0DppNPy17ZFNDWkH6-cm4SOK3gx2uz3iH30IPh6xRymLZPctOqnOLovNIpl2RNdxVRWF+QaQwPFMRQTHLdosWVO5IgHAAjAYxz+D9OR8VwNF4FRoUFc5bEMdcdkXWxSAdI4VAafQ8xPFV7lQ9C33HdMp3kRAcLwgjnHcM5SPFBdSHsJ1V14WxqhMQJrmIZI4BmYNVXfDlMwAWndDdNMYpC+miVSMy-BA9BLdRSIRBo9BqWdFF0kNSHVcMtWkKM9UMzili0XCDGsgDnHw3RxQE0h+WcVRZycLwTHshtzxbNt3kpTtuyMtNLU-LiEAPWFJNsS4DHRX0tE0ECalIPRVCcYUoMkiLYuYx80LADzMvyYVancfCXGKt0NnFbxDHnSCXEkzReG0BoGsielGWEeImV6VrOQAqS4TUDZDAuM4VGUYLUVEtQJsgw4usxIIgA */
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
