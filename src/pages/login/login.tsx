import React from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../../services/actions/auth";
import useForm from "../../hooks/useForm";

import styles from "./login.module.css";
import {
    Input,
    Button,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dispatchStore } from "../../utils/utils";

export function LoginPage() {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

    const sendRequest = (
        e: React.FormEvent<HTMLFormElement>,
        formBody: { email: string; password: string }
    ) => {
        e.preventDefault();
        dispatchStore(loginRequest(formBody));
    };

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
                Вход
            </h1>
            <form
                id="login-form"
                className={styles.form}
                onSubmit={(e) => sendRequest(e, values)}
            >
                <Input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    placeholder={"E-mail"}
                />
                <PasswordInput
                    value={values.password}
                    onChange={handleChange}
                    name={"password"}
                />
                <Button type="primary" size="large">
                    Войти
                </Button>
            </form>
            <div className={styles.container_text}>
                <div>
                    <span className="text text_type_main-small text_color_inactive">
                        Вы — новый пользователь?{" "}
                    </span>
                    <Link
                        to="/register"
                        className={`${styles.link} text text_type_main-small`}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                <div>
                    <span className="text text_type_main-small text_color_inactive">
                        Забыли пароль?{" "}
                    </span>
                    <Link
                        to="/forgot-password"
                        className={`${styles.link} text text_type_main-small`}
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </div>
    );
}
