import ingredientsDetails from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

function OrderDetails() {
    const orderNumber = useSelector(
        (store: any) => store.ingredients.order.orderNumber
    );
    return (
        <div className={ingredientsDetails.modal__inner}>
            <h3 className={ingredientsDetails.modal__title}>{orderNumber}</h3>
            <p>идентификатор заказа</p>
            <div className={ingredientsDetails.modal__checkmark}>
                <CheckMarkIcon type="primary" />
            </div>
            <div className={ingredientsDetails.modal__footer}>
                <p className={ingredientsDetails.modal__status}>
                    Ваш заказ начали готовить
                </p>
                <p className={ingredientsDetails.modal__wait}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    );
}
export default OrderDetails;
