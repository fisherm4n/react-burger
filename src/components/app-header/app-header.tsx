import React from 'react';
import headerStyles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className="container">
        <div className={headerStyles.header__inner}>
          <nav>
            <ul className={headerStyles.header__tabs}>
              <li>
                <a href="/" className={headerStyles.header__tab + " " + headerStyles.active + " pl-5 pr-5 pb-4 pt-4"}>
                  <BurgerIcon type="primary" />
                  <span className="pl-2">Конструктор</span>
                </a>
              </li>
              <li>
                <a href="/" className={headerStyles.header__tab + " ml-2 pl-5 pr-5 pb-4 pt-4"}>
                  <ListIcon type="secondary" />
                  <span className="pl-2 secondary">Лента заказов</span>
                </a>
              </li>
            </ul>
           
          
          </nav>
          <a href="/" className={headerStyles.header__logo}>
            <Logo />
          </a>
          <a href="/" className={headerStyles.header__tab + " " + headerStyles.header__link + " pl-5 pr-5 pb-4 pt-4"}>
            <ProfileIcon type="secondary" />
            <span className="pl-2">Личный кабинет</span>
          </a>
        </div>
   
      </div>
    
    </header>

  );
}

export default AppHeader;
