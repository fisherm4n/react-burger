import React from "react";
import { dispatchStore } from "../../utils/utils";
import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login/login";
import { RegistrationPage } from "../../pages/registration/registration";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ProfilePage } from "../../pages/profile/profile";
import { getIngredients } from "../../services/actions/ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation,
} from "react-router-dom";
import RedirectRoute from "../redirect-route/redirect-route";
import ProtectedRoute from "../protected-route/protected-route";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { Feed } from "../../pages/feeds/feed";
import OrderDetailsPage from "../order-details-page/order-details-page";
function App() {
    const history = useHistory();
    const location = useLocation();

    const { ingredients, isLoading, hasError } = useSelector(
        (store: any) => store.ingredients
    );
    React.useEffect(() => {
        dispatchStore(getIngredients());
        console.log("location: " + location);
        console.log("location.state: " + location.state);
        console.log("location.pathname: " + location.pathname);
    }, []);
    const locationState = location.state as any;
    const background = locationState && locationState.background;
    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        history.goBack();
    };
    return (
        <div>
            <AppHeader />
            <main className={AppStyle.main}>
                <div className="container">
                    <section className={AppStyle.menu}>
                        <div className={AppStyle.menu__inner}>
                            {isLoading && "Загрузка..."}
                            {hasError && "Произошла ошибка"}
                            {!isLoading && !hasError && ingredients.length && (
                                <DndProvider backend={HTML5Backend}>
                                    <Switch location={background || location}>
                                        <Route path="/" exact>
                                            <HomePage />
                                        </Route>
                                        <RedirectRoute exact path="/login">
                                            <LoginPage />
                                        </RedirectRoute>
                                        <RedirectRoute exact path="/register">
                                            <RegistrationPage />
                                        </RedirectRoute>
                                        <RedirectRoute
                                            exact
                                            path="/forgot-password"
                                        >
                                            <ForgotPasswordPage />
                                        </RedirectRoute>

                                        <RedirectRoute
                                            path="/reset-password"
                                            exact
                                        >
                                            <ResetPasswordPage />
                                        </RedirectRoute>
                                        <Route path="/feed" exact>
                                            <Feed />
                                        </Route>

                                        <Route
                                            path="/ingredients/:ingredientId"
                                            exact
                                        >
                                            <IngredientDetails />
                                        </Route>
                                        <Route path="/feed/:number" exact>
                                            <OrderDetailsPage />
                                        </Route>
                                        <ProtectedRoute
                                            exact
                                            path="/profile/orders/:number"
                                        >
                                            <OrderDetailsPage />
                                        </ProtectedRoute>
                                        <ProtectedRoute path="/profile">
                                            <ProfilePage />
                                        </ProtectedRoute>
                                    </Switch>
                                    {background && (
                                        <Switch>
                                            <Route
                                                path="/profile/orders/:number"
                                                exact
                                                children={
                                                    <Modal
                                                        onClose={
                                                            handleModalClose
                                                        }
                                                    >
                                                        <OrderDetailsPage />
                                                    </Modal>
                                                }
                                            />
                                            <Route
                                                path="/feed/:number"
                                                exact
                                                children={
                                                    <Modal
                                                        onClose={
                                                            handleModalClose
                                                        }
                                                    >
                                                        <OrderDetailsPage />
                                                    </Modal>
                                                }
                                            />
                                            <Route
                                                path="/ingredients/:ingredientId"
                                                exact
                                                children={
                                                    <Modal
                                                        onClose={
                                                            handleModalClose
                                                        }
                                                    >
                                                        <IngredientDetails />
                                                    </Modal>
                                                }
                                            />
                                        </Switch>
                                    )}
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
