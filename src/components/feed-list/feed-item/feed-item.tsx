import React from "react";
import style from "./feed-item.module.css";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../services/types/reduxHooks";
import { TOrder } from "../../../utils/types";
import { sayDate } from "../../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export function FeedItem({ order }: { order: TOrder }) {
    const location = useLocation();
    const history = useHistory();
    const locationState = location.state as any;
    const dispatch = useAppDispatch();
    const [status, setStatus] = React.useState("");
    const { ingredients } = useAppSelector((store) => store.ingredients);
    const ingredientsFromOrder = React.useMemo(
        () =>
            order.ingredients.map((elem: string) =>
                ingredients.find((item: TOrder) => elem && item._id === elem)
            ),
        [order, ingredients]
    );
    const uniqIngredients = ingredients.filter((item: TOrder) => {
        return order.ingredients.includes(item._id);
    });

    const ingredientsPrice = React.useMemo(
        () =>
            ingredientsFromOrder.reduce((acc, item) => {
                if (item) {
                    return item.price + acc;
                }
                return 0;
            }, 0),
        [ingredientsFromOrder]
    );
    const visibleIngredients =
        uniqIngredients.length < 5
            ? uniqIngredients
            : uniqIngredients.slice(0, 5);

    const hiddeIngredients =
        uniqIngredients.length > 5 ? uniqIngredients.length - 5 : 0;
    function handleClickOnOrder() {
        history.push(`${location.pathname}/${order.number}`);
    }
    React.useEffect(() => {
        order.status === "done" && setStatus("Выполнен");
        order.status === "created" && setStatus("Создан");
        order.status === "pending" && setStatus("Готовится");
    }, [order.status]);
    return (
        <Link
            to={{
                // Тут мы формируем динамический путь для нашего ингредиента
                // а также сохраняем в свойство background роут, на котором была открыта наша модалка
                pathname: `/feed/${order.number}`,
                state: { background: location },
            }}
        >
            <div className={style.wrapper}>
                <div className={style.info}>
                    <p className={style.number}>#{order.number}</p>
                    <span className={style.date}>
                        {sayDate(order.createdAt)}
                    </span>
                </div>
                <h3 className={style.name}>{order.name}</h3>
                {location.pathname === "/profile/orders" && (
                    <p
                        className={`${style.status} ${
                            status === "Выполнен" && style.status_completed
                        }`}
                    >
                        {status}
                    </p>
                )}
                <div className={style.details}>
                    <ul className={style.buns}>
                        {visibleIngredients.map((item: any, index: number) => {
                            return (
                                <li className={style.bunsItem} key={item._id}>
                                    <img
                                        className={style.icon}
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    {hiddeIngredients > 0 && index === 0 && (
                                        <span className={style.hiddenIcons}>
                                            +{hiddeIngredients}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <div className={style.price}>
                        <span className={style.sum}>{ingredientsPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
