import overlaySt from "./overlay.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { handleChangeStatusModal } from "../../services/actions/popup";
function ModalOverlay(props) {
  const { children } = props;
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={overlaySt.modal}
        onClick={() => dispatch(handleChangeStatusModal(null, false))}
      >
        {children}
      </div>
    </>
  );
}
ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ModalOverlay;
