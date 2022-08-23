import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAR_CONSTRUCTOR,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  REPLACE_INGREDIENTS,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../actions/ingredients";
const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
  currentBun: null,
  constructorIngredients: [],
  order: {
    orderNumber: 0,
  },
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        order: { orderNumber: action.orderNumber },
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        order: { orderNumber: 0 },
      };
    }
    case GET_INGREDIENTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        ingredients: action.payload,
        isLoading: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        hasError: true,
        ingredients: action.data,
        isLoading: false,
      };
    }

    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      let itemToDelete = state.constructorIngredients.find(
        (item) => item._uid === action.id
      );
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (item) => item._uid !== itemToDelete._uid
        ),
      };
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return { ...state, currentBun: action.draggedIngredient };
    }
    case DELETE_BUN_FROM_CONSTRUCTOR: {
      return { ...state, currentBun: null };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [],
      };
    }
    case REPLACE_INGREDIENTS: {
      const { ingredientDroppedId, whereIngredientDroppedId } = action.payload;

      const constructorIngredients = [...state.constructorIngredients];
      const draggedItemIndex = constructorIngredients.findIndex(
        (ingredient) => ingredient._uid === ingredientDroppedId
      );
      const hoveredItemIndex = constructorIngredients.findIndex(
        (ingredient) => ingredient._uid === whereIngredientDroppedId
      );

      const draggedItem = constructorIngredients[draggedItemIndex];
      const hoveredItem = constructorIngredients[hoveredItemIndex];

      constructorIngredients[draggedItemIndex] = hoveredItem;
      constructorIngredients[hoveredItemIndex] = draggedItem;

      return {
        ...state,
        constructorIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
