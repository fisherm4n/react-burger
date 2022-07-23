import constructorSt from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
} from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";

import { useSelector, useDispatch } from "react-redux";
import { handleChangeStatusModal } from "../../services/actions/popup";
import BurgerConstructorItem from "./burger-constructor-item";
import { v4 as uuidv4 } from "uuid";
import { getOrderNumber } from "../../services/actions/ingredients";
function BurgerConstructor(props) {
  const { modalStatus, ingredient } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const { constructorIngredients, currentBun } = useSelector(
    (store) => store.ingredients
  );
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        console.log(item);
        dispatch({
          type: ADD_BUN_TO_CONSTRUCTOR,
          draggedIngredient: item,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          payload: { ...item, _uid: uuidv4() },
        });
      }
    },
  });

  const totalPrice =
    useSelector((store) => store.ingredients.constructorIngredients).reduce(
      (sum, { price }) => {
        return sum + price;
      },
      0
    ) + (currentBun ? currentBun.price * 2 : 0);

  const topElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} (верх)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : (
      ""
    );
  }, [currentBun]);

  const bottomElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${currentBun.name} (низ)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : (
      ""
    );
  }, [currentBun]);

  return (
    <div className={constructorSt.menu__item}>
      <div className={constructorSt.menu__categories}>
        <div ref={dropTarget} className={constructorSt.menu__category}>
          <ul className={`${constructorSt.menu__list}`}>
            {
              <li className={`${constructorSt.menu__item_bun}`}>
                {topElement}
              </li>
            }
            <li>
              <ul className={`${constructorSt.menu__list_2}`}>
                {constructorIngredients.map((item, index) => (
                  <BurgerConstructorItem
                    item={item}
                    key={item._uid}
                    uid={item._uid}
                    index={index}
                  />
                ))}
              </ul>
            </li>

            {
              <li className={`${constructorSt.menu__item_bun}`}>
                {bottomElement}
              </li>
            }
          </ul>
        </div>
      </div>
      <div className={constructorSt.buttonBox}>
        <div className={constructorSt.buttonBox__total}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            if (currentBun != null && constructorIngredients.length > 0) {
              dispatch(
                getOrderNumber([
                  currentBun,
                  ...constructorIngredients,
                  currentBun,
                ])
              );
              dispatch(handleChangeStatusModal(null, true));
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {modalStatus && ingredient === null && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number,
      _id: PropTypes.string.isRequired,
    })
  ),
};
export default BurgerConstructor;
