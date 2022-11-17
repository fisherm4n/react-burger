import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { getUser } from "../../services/actions/auth";
import { dispatchStore } from "../../utils/utils";

const RedirectRoute: React.FC<{ children: any; exact: true; path: string }> = ({
    children,
}) => {
    const { userIsLoaded, userInfo } = useSelector((store: any) => store.user);
    const location = useLocation();
    const locationState = location.state as any;
    const pathName =
        locationState && locationState.from ? locationState.from.pathname : "/";
    React.useEffect(() => {
        dispatchStore(getUser(getCookie("accessToken")));
    }, []);
    if (!userIsLoaded) {
        return "Loader...";
    }
    return !userInfo ? (
        children
    ) : (
        <Route
            exact
            render={({ location }) => {
                return (
                    <Redirect
                        to={{
                            pathname: pathName,
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};
export default RedirectRoute;
