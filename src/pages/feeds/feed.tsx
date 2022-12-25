import { FC, useEffect, useMemo } from "react";
import style from "./feed.module.css";
import { allOrdersWs } from "../../services/urls";
import { useDispatch, useSelector } from "react-redux";
import { WS_ORDERS_CONNECTION_START } from "../../services/actions/auth";
import { FeedList } from "../../components/feed-list/feed-list";
export const Feed: FC = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((store: any) => store.feed);
    const { userInfoRequest } = useSelector((store: any) => store.user);
    const done = useMemo(
        () => orders.orders?.filter((item: any) => item.status === "done"),
        [orders.orders]
    );
    const pending = useMemo(
        () => orders.orders?.filter((item: any) => item.status === "pending"),
        [orders.orders]
    );
    console.log(done);
    console.log(pending);
    useEffect(() => {
        dispatch({ type: WS_ORDERS_CONNECTION_START, payload: allOrdersWs });
    }, []);

    return (
        <section className={style.section}>
            {userInfoRequest ? (
                "Loading.."
            ) : (
                <>
                    <h2 className={style.feed_title}>Лента заказов</h2>
                    <div className={style.wrapper}>
                        <FeedList />
                        <div className={style.dashboard}>
                            <div className={style.process}>
                                <h3 className={style.title}>Готовы:</h3>
                                <h3 className={style.title}>В работе:</h3>
                                <ul className={style.done}>
                                    {done &&
                                        done.slice(0, 10).map((item: any) => {
                                            return (
                                                <li
                                                    className={style.done_item}
                                                    key={item.number}
                                                >
                                                    {item.number}
                                                </li>
                                            );
                                        })}
                                </ul>
                                <ul className={style.during}>
                                    {pending &&
                                        pending
                                            .slice(0, 10)
                                            .map((item: any) => {
                                                return (
                                                    <li
                                                        className={
                                                            style.during_item
                                                        }
                                                        key={item.number}
                                                    >
                                                        {item.number}
                                                    </li>
                                                );
                                            })}
                                </ul>
                            </div>
                            <div className={style.process_all}>
                                <h3 className={style.title}>
                                    Выполнено за всё время:
                                </h3>
                                <span className={style.count}>
                                    {orders.total}
                                </span>
                            </div>
                            <div className={style.process_today}>
                                <h3 className={style.title}>
                                    Выполнено за сегодня:
                                </h3>
                                <span className={style.count}>
                                    {orders.totalToday}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};
