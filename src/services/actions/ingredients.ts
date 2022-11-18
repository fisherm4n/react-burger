import { API } from "../urls.js";
import { checkResponse } from "../../utils/utils";
import { Dispatch } from "redux";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
    "DELETE_INGREDIENT_FROM_CONSTRUCTOR";

export const CHANGE_MODAL_STATUS = "CHANGE_MODAL_STATUS";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const DELETE_BUN_FROM_CONSTRUCTOR = "DELETE_BUN_FROM_CONSTRUCTOR";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const REPLACE_INGREDIENTS = "REPLACE_INGREDIENTS";
export const CLOSE_MODAL_INGREDIENT = "CLOSE_MODAL_INGREDIENT";
export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const OPEN_MODAL_ORDER = "OPEN_MODAL_ORDER";
export const CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER";

export const getIngredients = () => (dispatch:Dispatch) => {
    dispatch({
        type: GET_INGREDIENTS,
    });

    fetch(`${API}/ingredients`)
        .then(checkResponse)
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: data.data,
                });
            } else {
                return Promise.reject(new Error("Произошла ошибка"));
            }
        })
        .catch((err) => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                payload: err,
            });
        });
};
export function getOrderNumber(ingredients:object[]) {
    const URL_API_ORDER = `${API}/orders`;
    console.log(ingredients);
    
    return (dispatch:Dispatch) => {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });

        const data = {
            ingredients: ingredients.map((item:{readonly [key:string]:any}) => item._id),
        };
        fetch(URL_API_ORDER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: data.order.number,
                });
                dispatch({ type: CLEAR_CONSTRUCTOR });
                dispatch({ type: DELETE_BUN_FROM_CONSTRUCTOR });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                });
                console.error("Error:", error);
            });
    };
}

export const replaceItems = (dragIndex:string, hoverIndex:string) => {
    return (dispatch:Dispatch) => {
        dispatch({
            type: REPLACE_INGREDIENTS,
            payload: {
                dragIndex: dragIndex,
                hoverIndex: hoverIndex,
            },
        });
    };
};
