import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../services/actions/auth";
import styles from "./login.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
export function LoginPage() {
  const dispatch = useDispatch();

  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const formBody = {
    email: emailValue,
    password: passwordValue,
  };
  const onChange = (e, set) => {
    set(e.target.value);
  };
  const sendRequest = (e, formBody) => {
    e.preventDefault();
    dispatch(loginRequest(formBody));
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Вход
        </h1>
        <form
          id="login-form"
          className={styles.form}
          onSubmit={(e) => sendRequest(e, formBody)}
        >
          <Input
            type="email"
            onChange={(e) => onChange(e, setEmail)}
            name="email"
            value={emailValue}
            placeholder={"E-mail"}
            error={false}
          />
          <PasswordInput
            value={passwordValue}
            onChange={(e) => onChange(e, setPassword)}
            error={false}
            name="password"
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
    </>
  );
}
