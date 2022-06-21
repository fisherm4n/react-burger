import React from "react";
import constructorSt from "./burger-constructor.module.css";
import { data } from "../../utils/data";

import {
  CurrencyIcon,
  ConstructorElement,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructor() {
  const total = data.reduce((acc, cur) => acc + cur.price, 0);
  const cardTemplate = (card, index) => {
    const { name, price, image_mobile, _id } = card;
    return (
      <div
        key={_id}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {index === 0 && (
          <ConstructorElement
            type="top"
            text={`${name} (верх) `}
            price={price}
            thumbnail={image_mobile}
          />
        )}
        {index > 0 && (
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image_mobile}
          />
        )}
        {index === data.length - 1 && (
          <ConstructorElement
            type="bottom"
            text={`${name} (низ) `}
            price={price}
            thumbnail={image_mobile}
          />
        )}
      </div>
    );
  };

  return (
    <div className={constructorSt.menu__item}>
      <div className={constructorSt.menu__categories}>
        <div className={constructorSt.menu__category}>
          <ul className={`${constructorSt.menu__list}`}>
            {data.map((card, index) => cardTemplate(card, index))}
          </ul>
        </div>
      </div>
      <div className={constructorSt.buttonBox}>
        <div className={constructorSt.buttonBox__total}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
