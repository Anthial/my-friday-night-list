/* This file defines application state with Recoil atoms */
import { atom } from "recoil";
import { TitleId, Title } from "./title";

export const selectedTitleAtom = atom({
  key: "selectedTitleId",
  default: "" as TitleId,
});

export const selectedTitle = atom({
  key: "selectedTitle",
  default: {} as Title,
});

export const myListState = atom({
  key: "myList", // unique ID (with respect to other atoms/selectors)
  default: [] as Title[] | null, // default value (aka initial value)
});
export const selectedSeasonState = atom({
  key: "selectedSeason",
  default: "",
});
export const selectedRegionState = atom({
  key: "selectedRegion",
  default: "us",
});

export  const searchValueState = atom({
  key: "searchValueQuery",
  default: "",
});
