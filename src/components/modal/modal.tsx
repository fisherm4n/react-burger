import ReactDOM from "react-dom";
import { ReactNode } from "react";
import modalSt from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
const ESC_KEYCODE = 27;
const modalRoot = document.getElementById("react-modals");
const Modal: React.FC<{ children: ReactNode; onClose: () => void }> = ({
    children,
    onClose,
}) => {
    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
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
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className={modalSt.modal__close}
                        onClick={() => onClose()}
                    >
                        <CloseIcon type="primary" />
                    </div>

                    {children}
                </div>
            </ModalOverlay>
        </>,
        modalRoot as HTMLDivElement
    );
};

export default Modal;
