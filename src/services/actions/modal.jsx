import { OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER } from "./ingredients";

export const openIngredientModal = (ingredient) => ({
  type: OPEN_MODAL_INGREDIENT,
  payload: ingredient,
});

export const openOrderModal = () => {
  return {
    type: OPEN_MODAL_ORDER,
  };
};
