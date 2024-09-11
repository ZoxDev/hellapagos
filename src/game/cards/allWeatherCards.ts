import type { CardType, Rarity } from "../types";

export type WeatherCard = {
  id: number;
  rarity: Rarity;
  type: CardType;
  waterAmount: number;
  weather: "rain" | "heavyRain" | "sun" | "storm";
};

export const allWeatherCards: WeatherCard[] = [
  {
    id: 1,
    rarity: "common",
    type: "weather",
    waterAmount: 0,
    weather: "sun",
  },
  {
    id: 2,
    rarity: "common",
    type: "weather",
    waterAmount: 1,
    weather: "sun",
  },
  {
    id: 3,
    rarity: "common",
    type: "weather",
    waterAmount: 1,
    weather: "rain",
  },
  {
    id: 4,
    rarity: "uncommon",
    type: "weather",
    waterAmount: 2,
    weather: "heavyRain",
  },
  {
    id: 5,
    rarity: "rare",
    type: "weather",
    waterAmount: 3,
    weather: "heavyRain",
  },
  {
    id: 6,
    rarity: null,
    type: "weather",
    waterAmount: 3,
    weather: "storm",
  },
];
