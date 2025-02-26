import type { CardType, Rarity } from "../types";

export type WeatherCard = {
	rarity: Rarity;
	type: CardType;
	waterAmount: number;
	weather: "rain" | "heavyRain" | "sun" | "desert" | "storm";
};

export const allWeatherCards: WeatherCard[] = [
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 0,
		weather: "desert",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 0,
		weather: "desert",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 0,
		weather: "desert",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 1,
		weather: "sun",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 1,
		weather: "sun",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 1,
		weather: "sun",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 2,
		weather: "rain",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 2,
		weather: "rain",
	},
	{
		rarity: "uncommon",
		type: "weather",
		waterAmount: 2,
		weather: "rain",
	},
	{
		rarity: "common",
		type: "weather",
		waterAmount: 3,
		weather: "heavyRain",
	},
	{
		rarity: "common",
		type: "weather",
		waterAmount: 3,
		weather: "heavyRain",
	},
	{
		rarity: "rare",
		type: "weather",
		waterAmount: 2,
		weather: "storm",
	},
];
