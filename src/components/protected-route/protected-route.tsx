import React from "react";

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { dispatchStore, getCookie } from "../../utils/utils";
const ProtectedRoute: React.FC<{
    children: any;
    exact?: true;
    path: string;
}> = ({ children }) => {
    const { userIsLoaded, userInfo } = useSelector((store: any) => store.user);
    React.useEffect(() => {
        dispatchStore(getUser(getCookie("accessToken")));
    }, []);
    if (!userIsLoaded) {
        return "Loader..";
    }
    return userInfo ? (
        children
    ) : (
        <Route
            exact
            render={({ location }) => {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
