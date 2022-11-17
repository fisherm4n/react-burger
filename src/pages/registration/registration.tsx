import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dispatchStore } from "../../utils/utils";

import { registerRequest } from "../../services/actions/auth";
import styles from "./registration.module.css";
import {
    Input,
    Button,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
export function RegistrationPage() {
    const [name, nameSet] = useState("");
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>, set: any) => {
        set(e.target.value);
    };
    const body = {
        name: name,
        email: email,
        password: password,
    };
    const registerNewUser = (
        e: React.FormEvent<HTMLFormElement>,
        body: { name: string; email: string; password: string }
    ) => {
        e.preventDefault();
        dispatchStore(registerRequest(body));
    };

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
            <form
                id="registration-form"
                className={styles.form}
                onSubmit={(e) => registerNewUser(e, body)}
            >
                <Input
                    name={"name"}
                    onChange={(e) => onChange(e, nameSet)}
                    value={name}
                    placeholder={"Имя"}
                />
                <Input
                    type="email"
                    onChange={(e) => onChange(e, emailSet)}
                    value={email}
                    name="email"
                    placeholder={"E-mail"}
                />
                <PasswordInput
                    onChange={(e) => onChange(e, passwordSet)}
                    value={password}
                    name="password"
                />
                <Button type="primary" size="large">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.container_text}>
                <span className="text text_type_main-small text_color_inactive">
                    Уже зарегистрированы?{" "}
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
}
