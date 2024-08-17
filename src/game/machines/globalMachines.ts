import { assign, createMachine, createActor } from "xstate";

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
