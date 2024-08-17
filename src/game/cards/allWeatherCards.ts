import type { CardType, Rarity } from "../types";

export type WeatherCard = {
	rarity: Rarity;
	type: CardType;
	waterAmount: number;
	weather: "rain" | "heavyRain" | "sun" | "storm";
};

export const allWeatherCards: WeatherCard[] = [
	{
		rarity: "common",
		type: "weather",
		waterAmount: 0,
		weather: "sun",
	},
	{
		rarity: "common",
		type: "weather",
		waterAmount: 1,
		weather: "sun",
	},
	{
		rarity: "common",
		type: "weather",
		waterAmount: 1,
		weather: "rain",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 2,
		weather: "heavyRain",
	},
	{
		rarity: "rare",
		type: "weather",
		waterAmount: 3,
		weather: "heavyRain",
	},
	{
		rarity: null,
		type: "weather",
		waterAmount: 3,
		weather: "storm",
	},
];
