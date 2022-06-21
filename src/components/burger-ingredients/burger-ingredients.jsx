import React from "react";
import ingredientsSt from "./burger-ingredients.module.css";
import { data } from "../../utils/data";

import {
  Tab,
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  const cardTemplate = ({ name, price, image,_id }) => {
    return (
      <li key={_id} className={ingredientsSt.menu__card}>
        <Counter count={1} size="default" />
        <img src={image} alt="" />
        <div className={ingredientsSt.menu__price}>
          {price} <CurrencyIcon type="primary" />
        </div>
        <div>{name}</div>
      </li>
    );
  };
  return (
    <div className={ingredientsSt.menu__item}>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div>
      <div className={ingredientsSt.menu__categories}>
        <div className={ingredientsSt.menu__category}>
          <h3>Булки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {data.map((card) => card.type === "bun" && cardTemplate(card))}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category}>
          <h3>Соусы</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {data.map((card) => card.type === "sauce" && cardTemplate(card))}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category}>
          <h3>Начинки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {data.map((card) => card.type === "main" && cardTemplate(card))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
