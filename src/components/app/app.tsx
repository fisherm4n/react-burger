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

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { ingredients, isLoading, hasError } = useSelector(
        (store: any) => store.ingredients
    );
    React.useEffect(() => {
        dispatchStore(getIngredients());
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
                                        <ProtectedRoute exact path="/profile">
                                            <ProfilePage />
                                        </ProtectedRoute>

                                        <Route
                                            path="/ingredients/:ingredientId"
                                            exact
                                        >
                                            <IngredientDetails />
                                        </Route>
                                    </Switch>
                                    {background && (
                                        <Route
                                            path="/ingredients/:ingredientId"
                                            children={
                                                <Modal
                                                    onClose={handleModalClose}
                                                >
                                                    <IngredientDetails />
                                                </Modal>
                                            }
                                        />
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
