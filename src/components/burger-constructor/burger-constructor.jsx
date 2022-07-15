import React from "react";
import constructorSt from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  ConstructorElement,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructor(props) {
  const { cardId, handleOpenModal, modal, modalState,data } = props;
  console.log(data);
  const total = props.data.reduce((acc, cur) => acc + cur.price, 0);
  const cardTemplate = (card, index) => {
    const { name, price, image_mobile, _id, type } = card;
    return (
    index > 0 && (
      <li
        key={_id}
        className={constructorSt.order_main}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          marginRight: '15px'
        }}
      >
       
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image_mobile}
                />
              </div>
           
      </li>
       )
    );
  };

  return (
    <div className={constructorSt.menu__item}>
      <div className={constructorSt.menu__categories}>
        <div className={constructorSt.menu__category}>
          <ul className={`${constructorSt.menu__list}`}>
            {
              <li className={`${constructorSt.menu__item_bun}`}>
                <ConstructorElement
                  type="top"
                  text={`${props.data[0]?.name} (верх) `}
                  price={props.data[0]?.price}
                  isLocked={true}
                  thumbnail={props.data[0]?.image_mobile}
                />
              </li>
            }
            <li>
              <ul className={`${constructorSt.menu__list_2}`}>
                {props.data.map((card, index) => cardTemplate(card, index))}
              </ul>
            </li>

            {
              <li className={`${constructorSt.menu__item_bun}`}>
                <ConstructorElement
                  type="bottom"
                  text={`${props.data[0]?.name} (низ) `}
                  price={props.data[0]?.price}
                  isLocked={true}
                  thumbnail={props.data[0]?.image_mobile}
                />
              </li>
            }
          </ul>
        </div>
      </div>
      <div className={constructorSt.buttonBox}>
        <div className={constructorSt.buttonBox__total}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => handleOpenModal()}>
         Оформить заказ
        </Button>
      </div>
      {modal && (
        <Modal modalState={modalState}>
          <OrderDetails
            cardId={cardId}
            orderNum={"0S34536"}
            data={props.data}
          />
        </Modal>
      )}
    </div>
  );
}
BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
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
  ).isRequired,
};
export default BurgerConstructor;
