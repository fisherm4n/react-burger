import ReactDOM from "react-dom";
import modalSt from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import { handleChangeStatusModal } from "../../services/actions/popup";
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  const { children, onClose } = props;
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={modalSt.modal__inner}
          onClick={(e) => e.stopPropagation(e)}
        >
          <div
            className={modalSt.modal__close}
            onClick={() => dispatch(onClose())}
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
