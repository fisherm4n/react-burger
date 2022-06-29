import React from "react";
import useMemo from "react";
import ingredientsSt from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
  const {cardId,handleOpenModal, modal,modalState,data} = props
  const onTabSmooth = (tab) => {
    setCurrent(tab)
    const element = document.getElementById(tab);
    if(element){
      element.scrollIntoView({behavior: "smooth"})
    }
  }
 
  const cardTemplate = ({ name, price, image,_id }) => {
    return (
      <li
        onClick={() => handleOpenModal(_id)}
        key={_id}
        className={ingredientsSt.menu__card}
      >
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
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={ingredientsSt.menu__categories}>
        <div className={ingredientsSt.menu__category}>
          <h3>Булки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {props.data.map(
              (card, index) => card.type === "bun" && cardTemplate(card, index)
            )}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category}>
          <h3>Соусы</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {props.data.map(
              (card, index) =>
                card.type === "sauce" && cardTemplate(card, index)
            )}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category}>
          <h3>Начинки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {props.data.map(
              (card, index) => card.type === "main" && cardTemplate(card, index)
            )}
          </ul>
        </div>
      </div>
      {modal && (
        <Modal modalState={modalState}>
          <IngredientDetails cardId={cardId} data={props.data} />
        </Modal>
      )}
    </div>
  );
}
BurgerIngredients.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  modalState: PropTypes.func.isRequired,
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
export default BurgerIngredients;
