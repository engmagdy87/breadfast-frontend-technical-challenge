import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

const productsStateSelector = (state: RootState) => state.products;

export const productsSelector = createSelector(
  productsStateSelector,
  (productsState: any) => productsState
);
