import { store } from "../services/store";
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type TBurgerConstructorItem = {
    item: TIngredient;
    uid: number;
    index: number;
};
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};
export type TForm = {
    name?: string;
    email: string;
    password: string;
}
export interface IFeedList {
  pageType?: string
}
export type TOrder = {
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}
export interface IOrderComposition {
  item: TIngredient,
  order: TOrder
}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 