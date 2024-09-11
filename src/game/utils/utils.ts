import type { WeatherCard } from "../cards/allWeatherCards";
import type { CrashedBoatCard } from "../cards/crashedBoatCards";

/* -----------------------------------------------------------------------------
 * this function mutate the array of card to delete the choosen one 🙇‍♂️
 * -----------------------------------------------------------------------------*/
export const deleteCard = (
  cardToDelete: CrashedBoatCard | WeatherCard,
  cards: CrashedBoatCard[] | WeatherCard[]
) => {
  const index = cards.findIndex((card) => card.id === cardToDelete.id);
  cards.splice(index, 1);

  return cards;
};
