import { CHANGE_MODAL_STATUS } from "./ingredients";

export const handleChangeStatusModal = (ingredient, status) => ({
  type: CHANGE_MODAL_STATUS,
  payload: { ingredient, status },
});
