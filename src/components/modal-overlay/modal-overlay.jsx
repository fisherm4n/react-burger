import overlaySt from "./overlay.module.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
const ESC_KEYCODE = 27;

function ModalOverlay(props) {
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
  return (
    <div className={overlaySt.modal} onClick={() => onClose()}>
      {children}
    </div>
  );
}
ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ModalOverlay;
