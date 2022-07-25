import constructorSt from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
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
// import { handleChangeStatusModal } from "../../services/actions/popup";
import BurgerConstructorItem from "./burger-constructor-item";
import { v4 as uuidv4 } from "uuid";
import { getOrderNumber } from "../../services/actions/ingredients";
import {
  CLOSE_MODAL_ORDER,
  OPEN_MODAL_ORDER,
} from "../../services/actions/ingredients";
function BurgerConstructor() {
  const { orderNumberStatus } = useSelector((store) => store.modalOrder);
  const dispatch = useDispatch();
  const { constructorIngredients, currentBun } = useSelector(
    (store) => store.ingredients
  );
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
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
  const closeOrderModal = () =>
    dispatch({
      type: CLOSE_MODAL_ORDER,
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
  const openOrderModal = () => dispatch({ type: OPEN_MODAL_ORDER });
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
              dispatch(openOrderModal(true));
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {orderNumberStatus && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
export default BurgerConstructor;
