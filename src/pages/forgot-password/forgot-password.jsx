import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPasswordRequest } from "../../services/actions/auth";
export function ForgotPasswordPage() {
  const [email, inputEmail] = useState("");
  const [requestStatus, getRequestStatus] = useState(false);
  const history = useHistory();
  const onChangeInput = (e) => {
    inputEmail(e.target.value);
  };
  const onSumbit = async (e) => {
    e.preventDefault();
    const response = await forgotPasswordRequest(email);
    getRequestStatus(response.success);
  };
  useEffect(() => {
    if (requestStatus) {
      history.push({
          pathname: "/reset-password",
          state: {
              from: "/forgot-password",
          },
      });
    }
  }, [email, requestStatus, history]);
  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <form id="forgot-form" className={styles.form} onSubmit={onSumbit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChangeInput}
            placeholder={"Укажите e-mail"}
          />
          <Button type="primary" size="large">
            Восстановить
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
    </>
  );
}
