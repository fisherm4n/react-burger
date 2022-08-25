import overlaySt from "./overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  const { children, onClose } = props;

  return (
    <div className={overlaySt.modal} onClick={() => onClose()}>
      {children}
    </div>
  );
}
ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
