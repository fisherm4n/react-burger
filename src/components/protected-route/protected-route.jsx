import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/utils";
const ProtectedRoute = ({ children }) => {
  const { userIsLoaded, userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("ProtectedRoute");

    dispatch(getUser(getCookie("accessToken")));
  }, []);
  if (!userIsLoaded) {
    return "Loader..";
  }
  return (
    <Route
      exact
      render={({ location }) => {
        return userInfo ? (
          children
        ) : (
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
