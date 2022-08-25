import { Link } from "react-router-dom";

import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/actions/auth";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
export function ResetPasswordPage() {
  let history = useHistory();
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });
  const formSubmit = (e) => {
    e.preventDefault();
    resetPassword(values)
      .then((res) => {
        if (res && res.success) {
          history.push("/login");
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <form id="reset-form" className={styles.form} onSubmit={formSubmit}>
          <Input
            // type={isVisiblePassword ? "text" : "password"}
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
    </>
  );
}
