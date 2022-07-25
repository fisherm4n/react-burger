import ReactDOM from "react-dom";
import modalSt from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
const ESC_KEYCODE = 27;
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  const { children, onClose } = props;
  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === "Escape" || e.keyCode === ESC_KEYCODE) {
        onClose();
      }
    };
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={modalSt.modal__inner}
          onClick={(e) => e.stopPropagation(e)}
        >
          <div className={modalSt.modal__close} onClick={() => onClose()}>
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
  onClose: PropTypes.func.isRequired,
};

export default Modal;
