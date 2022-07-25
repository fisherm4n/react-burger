import React from "react";
import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector(
    (store) => store.ingredients
  );
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <main className={AppStyle.main}>
        <div className="container">
          <section className={AppStyle.menu}>
            <h1 className={AppStyle.menu__title}>Соберите бургер</h1>
            <div className={AppStyle.menu__inner}>
              {isLoading && "Загрузка..."}
              {hasError && "Произошла ошибка"}
              {!isLoading && !hasError && ingredients.length && (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
