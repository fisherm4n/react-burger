import React from "react";
import ReactDOM from "react-dom";
import overlaySt from "./overlay.module.css";

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
export default ModalOverlay;