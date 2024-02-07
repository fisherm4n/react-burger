import overlaySt from "./overlay.module.css";
import { ReactNode } from "react";

const ModalOverlay: React.FC<{ children: ReactNode; onClose: () => void }> = ({
    children,
    onClose,
}) => {
    return (
        <div className={overlaySt.modal} onClick={() => onClose()}>
            {children}
        </div>
    );
};

export default ModalOverlay;
