import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./profile-form.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { changeUserInfo, logOut } from "../../services/actions/auth";
import { dispatchStore } from "../../utils/utils";

export function ProfileForm() {
    const { userInfo, userInfoRequest } = useSelector(
        (store: any) => store.user
    );
    const [values, setValues] = useState({
        name: "Имя",
        email: "E-mail",
    });
    console.log(values.email);

    useEffect(() => {
        setValues({
            ...values,
            name: userInfo.name,
            email: userInfo.email,
        });
        console.log(values.email);
    }, [userInfo]);
    useEffect(() => {
        !userInfoRequest && setIsEdit(false);
    }, [userInfoRequest]);
    const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatchStore(
            changeUserInfo({
                name: values.name,
                email: values.email,
            })
        );
    };

    const [isEdit, setIsEdit] = useState(false);

    return (
        <form className={styles.form} onSubmit={formSubmit}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                value={values.name}
                onChange={handleChangeValues}
                name={"name"}
                icon={"EditIcon"}
                disabled={!isEdit}
                onIconClick={() => setIsEdit(true)}
            />
            <Input
                type={"text"}
                placeholder={"Логин"}
                value={values.email}
                onChange={handleChangeValues}
                name={"email"}
                icon={"EditIcon"}
                disabled={!isEdit}
                onIconClick={() => setIsEdit(true)}
            />
            <Input
                type={"password"}
                value={"Password"}
                placeholder={"Пароль"}
                onChange={handleChangeValues}
                icon={"LockIcon"}
                name={"password"}
                disabled
            />
            {isEdit && (
                <div className={styles.buttonsContainer}>
                    <Button size="medium" onClick={() => setIsEdit(false)}>
                        Отмена
                    </Button>
                    <Button size="medium" disabled={userInfoRequest}>
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}
