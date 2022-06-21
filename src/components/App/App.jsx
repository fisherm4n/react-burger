import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
function App() {
  return (
    <div>
      <AppHeader />
      <main className="main">
        <div className="container">
          <section className="menu">
            <h1 className="menu__title">Соберите бургер</h1>
            <div className="menu__inner">
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}



export default App;
