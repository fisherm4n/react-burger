import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_START,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_CONNECTION_START,
} from "../../services/actions/auth";
import {
    useAppDispatch,
    useAppSelector,
} from "../../services/types/reduxHooks";
import { getCookie } from "../../utils/utils";
import { allOrdersWs, userOrdersWs } from "../../services/urls";
import style from "./feed-list.module.css";
import { IFeedList, TOrder } from "../../utils/types";
import { FeedItem } from "./feed-item/feed-item";
export const FeedList: FC<IFeedList> = ({ pageType }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { orders, userOrders } = useAppSelector((store) => store.feed);
    const isProfileOrdersPage = location.pathname === "/profile/orders";
    const wrapper =
        pageType === "orders" ? style.orders_wrapper : style.wrapper;
    const generalOrdersArr = useMemo(() => orders?.orders, [orders.orders]);
    const userOrdersArr = useMemo(() => userOrders, [userOrders]);
    useEffect(() => {
        if (location.pathname === "/profile/orders") {
            dispatch({
                type: WS_USER_CONNECTION_START,
                payload: `${userOrdersWs}?token=${getCookie("accessToken")}`,
            });
            userOrdersArr &&
                userOrdersArr?.sort((a: any, b: any): 1 | -1 | number => {
                    if (a.createdAd > b.createdAd) {
                        return 1;
                    }
                    return -1;
                });
        } else if (location.pathname === "/feed") {
            dispatch({
                type: WS_ORDERS_CONNECTION_START,
                payload: allOrdersWs,
            });
        }
        return () => {
            isProfileOrdersPage
                ? dispatch({ type: WS_USER_CONNECTION_CLOSED })
                : dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
        };
    }, []);
    return (
        <>
            {!orders ? (
                "Loading..."
            ) : (
                <div className={wrapper}>
                    <ul className={style.list}>
                        {location.pathname === "/profile/orders"
                            ? userOrders?.map((order: TOrder) => {
                                  return "asd";
                              })
                            : generalOrdersArr?.map((order: TOrder) => {
                                  return <FeedItem order={order} />;
                              })}
                    </ul>
                </div>
            )}
        </>
    );
};
