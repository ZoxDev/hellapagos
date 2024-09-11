import type { CrashedBoatCard } from "../cards/crashedBoatCards";
import type { WeatherCard } from "../cards/allWeatherCards";
import type { Rarity } from "../types";
import { getRandomInt } from "./math";

export const foodRoll = (rollResult: number) => {
  if (rollResult >= 1 && rollResult <= 3) return 1;
  if (rollResult >= 4 && rollResult <= 5) return 2;
  return 3;
};

const rarityCardProbability = (rollResult: number): Rarity => {
  if (rollResult >= 1 && rollResult <= 3) return "common";
  if (rollResult >= 4 && rollResult <= 5) return "uncommon";
  return "rare";
};

export const drawCrashedBoatCard = (cards: CrashedBoatCard[]) => {
  const roll = getRandomInt(1, 6);
  const rarity = rarityCardProbability(roll);

  const cardsByRarity = cards.filter((card) => card.rarity === rarity);
  const card = cardsByRarity[Math.floor(Math.random() * cardsByRarity.length)];

  if (!card) throw new Error("no crashed boat cards left");

  return card;
};

export const drawWeatherCard = (cards: WeatherCard[]) => {
  // when there is only the storm card left, draw it
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  if (cards.length === 1 && cards[0]!.weather === "storm") {
    const card = cards[0];

    if (!card) throw new Error("There is no more cards");

    return card;
  }

  const roll = getRandomInt(1, 6);
  const rarity = rarityCardProbability(roll);

  const cardsByRarity = cards.filter((card) => card.rarity === rarity);
  const card = cardsByRarity[Math.floor(Math.random() * cardsByRarity.length)];

  if (!card) throw new Error("no crashed boat cards left");

  return card;
};
