import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/utils";
const RedirectRoute = ({ children }) => {
  const { userIsLoaded, userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName =
    location.state && location.state.from ? location.state.from.pathname : "/";
  console.log(pathName);
  console.log(userInfo);
  React.useEffect(() => {
    console.log("Я в логине");
    console.log("RedirectRoute");
    dispatch(getUser(getCookie("accessToken")));
  }, []);
  if (!userIsLoaded) {
    return "Loader...";
  }
  return (
    <Route
      exact
      render={({ location }) =>
        !userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: pathName,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default RedirectRoute;
