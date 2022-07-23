import { CHANGE_MODAL_STATUS } from "../actions/ingredients";
const initialState = {
  ingredient: null,
  modalStatus: false,
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODAL_STATUS:
      return {
        ...state,
        ingredient: action.payload.ingredient,
        modalStatus: action.payload.status,
      };
    default:
      return state;
  }
};
export default modalReducer;
