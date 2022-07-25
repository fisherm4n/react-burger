import React, { useRef, useState, useEffect } from "react";
import ingredientsSt from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import Ingredient from "./ingredient";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL_INGREDIENT } from "../../services/actions/ingredients";
function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { ingredient } = useSelector((store) => store.modal);
  const [tab, setTab] = useState("buns");

  const ingredientsBlockRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const fillingsTitleRef = useRef(null);

  const onTabClick = (value, ref) => {
    setTab(value);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const onScrollIngredientsBlock = () => {
    if (bunsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab("buns");
    } else if (sauceTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab("sauces");
    } else if (fillingsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab("fillings");
    }
  };
  const closeIngredientModal = () => dispatch({ type: CLOSE_MODAL_INGREDIENT });
  useEffect(() => {
    const ingredientsScrollableDOMElement = ingredientsBlockRef.current;
    ingredientsScrollableDOMElement.addEventListener(
      "scroll",
      onScrollIngredientsBlock
    );
    return () =>
      ingredientsScrollableDOMElement.removeEventListener(
        "scroll",
        onScrollIngredientsBlock
      );
  }, []);
  return (
    <div className={ingredientsSt.menu__item}>
      <div style={{ display: "flex" }}>
        <Tab
          value="buns"
          active={tab === "buns"}
          onClick={(e) => {
            console.log(e);
            return onTabClick(e, bunsTitleRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={tab === "sauces"}
          onClick={(e) => onTabClick(e, sauceTitleRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={tab === "fillings"}
          onClick={(e) => onTabClick(e, fillingsTitleRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={ingredientsSt.menu__categories} ref={ingredientsBlockRef}>
        <div className={ingredientsSt.menu__category} ref={bunsTitleRef}>
          <h3>Булки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {ingredients.map(
              (card) =>
                card.type === "bun" && (
                  <Ingredient
                    key={card._id}
                    type={card.type}
                    ingredient={card}
                  />
                )
            )}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category} ref={sauceTitleRef}>
          <h3>Соусы</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {ingredients.map(
              (card) =>
                card.type === "sauce" && (
                  <Ingredient
                    key={card._id}
                    type={card.type}
                    ingredient={card}
                  />
                )
            )}
          </ul>
        </div>
        <div className={ingredientsSt.menu__category} ref={fillingsTitleRef}>
          <h3>Начинки</h3>
          <ul className={`${ingredientsSt.menu__list}`}>
            {ingredients.map(
              (card) =>
                card.type === "main" && (
                  <Ingredient
                    key={card._id}
                    type={card.type}
                    ingredient={card}
                  />
                )
            )}
          </ul>
        </div>
      </div>
      {ingredient && (
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails cardId={ingredient._id} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerIngredients;
