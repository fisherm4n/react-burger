import React from "react";
import ReactDOM from "react-dom";
import modalSt from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");
function Modal(props) {

    const { children, modalState } = props;
    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в modalRoot
      React.useEffect(() => {
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            modalState(false);
          }
        });
        return () => {
          document.removeEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              modalState(false);
            }
          });
        };
      }, [modalState]);
  
    return ReactDOM.createPortal(
      <>
        <ModalOverlay modalState={modalState}>
          <div
            className={modalSt.modal__inner}
            onClick={(e) => e.stopPropagation(e)}
          >
            <div
              className={modalSt.modal__close}
              onClick={() => modalState(false)}
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
  modalState: PropTypes.func.isRequired,
};
export default Modal;