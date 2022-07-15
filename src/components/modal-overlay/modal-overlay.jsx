import React from "react";
import ReactDOM from "react-dom";
import overlaySt from "./overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  const { children, modalState } = props;
  return (
    <>
      <div className={overlaySt.modal} onClick={() => modalState(false)}>
        {children}
      </div>
    </>
  );
}
ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  modalState: PropTypes.func.isRequired,
};
export default ModalOverlay;