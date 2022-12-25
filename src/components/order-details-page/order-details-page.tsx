import style from "./order-details-page.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from "react";
import { TIngredient } from "../../utils/types";
import { useParams } from "react-router-dom";
import OrderDetailsItem from "./order-details-item";
import {
    useAppDispatch,
    useAppSelector,
} from "../../services/types/reduxHooks";
import { sayDate } from "../../utils/utils";
import { getOrderByNumber } from "../../services/actions/ingredients";
const OrderDetailsPage: FC = () => {
    const { number } = useParams<{ number?: string }>();
    console.log(number);

    const dispatch = useAppDispatch();
    const [status, setStatus] = useState("");
    const { ingredients, gotOrder } = useAppSelector(
        (store) => store.ingredients
    );
    console.log("order", gotOrder);

    const uniqueIngredientsFromOrder = useMemo(
        () =>
            ingredients?.filter((item: TIngredient) =>
                gotOrder?.ingredients.includes(item._id)
            ),
        [gotOrder, ingredients]
    );

    const ingredientsFromOrder = useMemo(
        () =>
            gotOrder?.ingredients.map((elem: string) => {
                // Существуют заказы в массиве id которых есть null
                if (elem !== null && elem !== undefined) {
                    const orderItem = ingredients.filter(
                        (item: TIngredient) => elem && item._id === elem
                    );
                    return orderItem[0];
                }
            }),
        [gotOrder, ingredients]
    );

    const ingredientsPrice = useMemo(
        () =>
            ingredientsFromOrder?.reduce((sum: number, elem: TIngredient) => {
                if (elem) {
                    return elem.price + sum;
                } else {
                    return 0;
                }
            }, 0),
        [ingredientsFromOrder]
    );

    useEffect(() => {
        dispatch(getOrderByNumber(number));
        gotOrder?.status === "done" && setStatus("Выполнен");
        gotOrder?.status === "created" && setStatus("Создан");
        gotOrder?.status === "pending" && setStatus("Готовится");
    }, []);

    return (
        <>
            {!gotOrder ? (
                "Loading..."
            ) : (
                <section className={style.section}>
                    <div className={style.content}>
                        <p className={style.number}>#{gotOrder.number}</p>
                        <h3 className={style.title}>{gotOrder.name}</h3>
                        <span
                            className={`${style.status} ${
                                status === "Выполнен" && style.status_completed
                            }`}
                        >
                            {status}
                        </span>
                        <p className={style.compound}>Состав:</p>
                        <ul className={style.details}>
                            {uniqueIngredientsFromOrder?.map(
                                (item: any, index: any) => {
                                    return (
                                        <OrderDetailsItem
                                            key={index}
                                            order={gotOrder}
                                            item={item}
                                        />
                                    );
                                }
                            )}
                        </ul>
                        <div className={style.order_info}>
                            <p className={style.date}>
                                {sayDate(gotOrder.createdAt)}
                            </p>
                            <div className={style.sum_wrapper}>
                                <span className={style.sum}>
                                    {ingredientsPrice}
                                </span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default OrderDetailsPage;
