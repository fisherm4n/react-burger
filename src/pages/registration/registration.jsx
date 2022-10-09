import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../services/actions/auth";
import styles from "./registration.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
export function RegistrationPage() {
  const dispatch = useDispatch();
  const [name, nameSet] = useState("");
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const onChange = (e, set) => {
    set(e.target.value);
  };
  const registerNewUser = (e, body) => {
    e.preventDefault();
    dispatch(registerRequest(body));
  };
  const body = {
    email: email,
    password: password,
    name: name,
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
