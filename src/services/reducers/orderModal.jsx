import { OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER } from "../actions/ingredients";
const initialState = {
  orderNumberStatus: false,
};
const modalOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER:
      return {
        ...state,
        orderNumberStatus: true,
      };
    case CLOSE_MODAL_ORDER:
      return {
        ...state,
        orderNumberStatus: false,
      };
    default:
      return state;
  }
};
export default modalOrderReducer;
