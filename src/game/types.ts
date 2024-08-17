export type Rarity = "common" | "uncommon" | "rare";

export type WeatherCard = {
	rarity: Rarity;
	type: "weather";
	waterAmount: number;
	weather: "rain" | "heavyRain" | "sun" | "storm";
};

export type CrashedBoatCard = {
	rarity: Rarity;
	type: "crashedBoat";
};

export type Cards = {
	cards: Array<WeatherCard | CrashedBoatCard>;
	amount: number;
};
