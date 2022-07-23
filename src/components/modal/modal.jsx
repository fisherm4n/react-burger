import React from "react";
import ReactDOM from "react-dom";
import modalSt from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { handleChangeStatusModal } from "../../services/actions/popup";
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  const { children } = props;
  const dispatch = useDispatch();

  React.useCallback(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(handleChangeStatusModal(null, false));
      }
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          dispatch(handleChangeStatusModal(null, false));
        }
      });
    };
  }, [dispatch]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay>
        <div
          className={modalSt.modal__inner}
          onClick={(e) => e.stopPropagation(e)}
        >
          <div
            className={modalSt.modal__close}
            onClick={() => dispatch(handleChangeStatusModal(null, false))}
          >
            <CloseIcon type="primary" />
          </div>

          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
}
Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Modal;
