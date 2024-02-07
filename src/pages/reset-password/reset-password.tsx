import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import styles from "./reset-password.module.css";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/actions/auth";
import { useHistory, useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
    let history = useHistory();
    const location = useLocation();
    const locationState = location?.state as any;
    const pathFrom = locationState?.from;
    const { values, handleChange } = useForm({
        password: "",
        token: "",
    });
    useEffect(() => {
        if (pathFrom !== "/forgot-password") {
            history.push("/forgot-password");
        }
    }, [pathFrom, history]);
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);

        resetPassword(values)
            .then((res) => {
                if (res && res.success) {
                    history.push("/login");
                }
            })
            .catch((e) => console.error(e));
    };
    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
                Восстановление пароля
            </h1>
            <form id="reset-form" className={styles.form} onSubmit={formSubmit}>
                <Input
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    placeholder={"Введите новый пароль"}
                    icon="ShowIcon"
                />
                <Input
                    value={values.token}
                    onChange={handleChange}
                    type="text"
                    name="token"
                    placeholder={"Введите код из письма"}
                />
                <Button type="primary" size="large">
                    Сохранить
                </Button>
            </form>
            <div className={styles.container_text}>
                <span className="text text_type_main-small text_color_inactive">
                    Вспомнили пароль?{" "}
                </span>
                <Link
                    to="/login"
                    className={`${styles.link} text text_type_main-small`}
                >
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
