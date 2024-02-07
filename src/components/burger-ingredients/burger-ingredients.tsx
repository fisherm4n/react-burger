import React, { useRef, useState } from "react";
import ingredientsSt from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import Ingredient from "./ingredient";
import { TIngredient } from "../../utils/types";

function BurgerIngredients() {
    const { ingredients } = useSelector((store: any) => store.ingredients);
    const [tab, setTab] = useState("buns");

    const ingredientsBlockRef = useRef(null);
    const bunsTitleRef = useRef<HTMLDivElement>(null);
    const sauceTitleRef = useRef<HTMLDivElement>(null);
    const fillingsTitleRef = useRef<HTMLDivElement>(null);

    const onTabClick = (value: string, ref: any) => {
        setTab(value);
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={ingredientsSt.menu__item}>
            <h1 className={ingredientsSt.menu__title}>Соберите бургер</h1>

            <div style={{ display: "flex" }}>
                <Tab
                    value="buns"
                    active={tab === "buns"}
                    onClick={(e) => onTabClick(e, bunsTitleRef)}
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
            <div
                className={ingredientsSt.menu__categories}
                ref={ingredientsBlockRef}
            >
                <div
                    className={ingredientsSt.menu__category}
                    ref={bunsTitleRef}
                >
                    <h3>Булки</h3>
                    <ul className={`${ingredientsSt.menu__list}`}>
                        {ingredients.map(
                            (card: TIngredient) =>
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
                <div
                    className={ingredientsSt.menu__category}
                    ref={sauceTitleRef}
                >
                    <h3>Соусы</h3>
                    <ul className={`${ingredientsSt.menu__list}`}>
                        {ingredients.map(
                            (card: TIngredient) =>
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
                <div
                    className={ingredientsSt.menu__category}
                    ref={fillingsTitleRef}
                >
                    <h3>Начинки</h3>
                    <ul className={`${ingredientsSt.menu__list}`}>
                        {ingredients.map(
                            (card: TIngredient) =>
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
        </div>
    );
}

export default BurgerIngredients;
