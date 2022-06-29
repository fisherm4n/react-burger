import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
 const [state, setState] = React.useState({
   isLoading: false,
   hasError: false,
   data: [],
 });
  const [cardId, setCardId] = React.useState();
  const [modal, modalState] = React.useState(false);
  const [modalOrder, modalOrderState] = React.useState(false);
   const handleOpenModal = (id) => {
    if(id){
     setCardId(id);

    }
     modalState(true);
     document.body.style.overflow = "hidden";
   };
   const handleOpenOrderModal = () => {
    modalOrderState(true)
     document.body.style.overflow = "hidden";

   } 
 React.useEffect(() => {
  const API = "https://norma.nomoreparties.space/api";
   const getData = () => {
     setState({ ...state, hasError: false, isLoading: true });
     fetch(`${API}/ingredients`)
       .then((res) => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(res.status);
       })
       .then((data) =>
         setState({ ...state, data: data.data, isLoading: false })
       )
       .catch((e) => {
         setState({ ...state, hasError: true, isLoading: false });
       });
   };
   getData();
 }, []);

 const {data,isLoading,hasError} = state;

  return (
    <div>
      <AppHeader />
      <main className="main">
        <div className="container">
          <section className="menu">
            <h1 className="menu__title">Соберите бургер</h1>
            <div className="menu__inner">
              {isLoading && "Загрузка..."}
              {hasError && "Произошла ошибка"}
              {!isLoading && !hasError && data.length && (
                <BurgerIngredients
                  cardId={cardId}
                  handleOpenModal={handleOpenModal}
                  modal={modal}
                  modalState={modalState}
                  data={data}
                />
              )}
              {!isLoading && !hasError && data.length && (
                <BurgerConstructor
                  cardId={cardId}
                  handleOpenModal={handleOpenOrderModal}
                  modal={modalOrder}
                  modalState={modalOrderState}
                  data={data}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


export default App;
