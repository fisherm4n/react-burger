import { API } from "../urls.js";

import { Dispatch } from "redux";
import { setCookie,
    getCookie,
    deleteCookie,
    checkResponse, } from "../../utils/utils";
import { TForm } from "../../utils/types.js";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const CLEAR_LOGIN_USER = "CLEAR_LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const FLAG_FORGOT_PASSWORD = "FLAG_FORGOT_PASSWORD";
export const REMOVE_FLAG_FORGOT_PASSWORD = "REMOVE_FLAG_FORGOT_PASSWORD";
export const USER_INFO = "USER_INFO";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED = "USER_INFO_FAILED";
export const CLEAR_USER_INFO = "CLEAR_USER_INFO";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";


export function registerRequest(registerBody: TForm) {
    return function (dispatch: Dispatch) {
        fetch(`${API}/auth/register`, {
            method: "POST",
            body: JSON.stringify(registerBody),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(checkResponse)
            .then((data:any) => {
                
                if (data && data.success) {
                    const accessToken = data.accessToken.split("Bearer ")[1];
                    const refreshToken = data.refreshToken;
                    setCookie("accessToken", accessToken);
                    setCookie("refreshToken", refreshToken);
                    dispatch({ type: USER_INFO_FAILED });
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload: data.user,
                    });
                } else {
                    dispatch({
                        type: REGISTER_USER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                
                dispatch({
                    type: REGISTER_USER_FAILED,
                });
            });
    };
}
export const loginRequest = (form: TForm) => {
    return function (dispatch:Dispatch) {
        dispatch({
            type: LOGIN_USER,
        });

        fetch(`${API}/auth/login`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(form),
        })
            .then(checkResponse)
            .then((data:any) => {
                if (data.success) {
                    const accessToken = data.accessToken.split("Bearer ")[1];
                    const refreshToken = data.refreshToken;
                    setCookie("accessToken", accessToken);
                    setCookie("refreshToken", refreshToken);
                    dispatch({ type: USER_INFO_FAILED });
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
                } else {
                    dispatch({
                        type: LOGIN_USER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                
                dispatch({
                    type: LOGIN_USER_FAILED,
                });
                return Promise.reject(err.message);
            });
    };
};
export async function forgotPasswordRequest(email: string) {
    return fetch(`${API}/password-reset`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            email: email,
        }),
    })
        .then(checkResponse)
        .catch((err) => console.log(err));
}
export const resetPassword = (form:{password: string, token: string}) => {
    return fetch(`${API}/password-reset/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    }).then(checkResponse);
}
export const getUser = (token: string | undefined) => {
    return function (dispatch:Dispatch) {
        fetch(`${API}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            credentials: "same-origin",
        })
            .then(checkResponse)
            .then((data:{success:boolean,user:{email:string;name:string}}) => {
                console.log(data);
                
                if (data && data.success) {
                    dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
                }
            })
            .catch((err) => {
                console.log(err);
                fetch(`${API}/auth/token`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: getCookie("refreshToken"),
                    }),
                })
                    .then(checkResponse)
                    .then((res:any) => {
                        if (res && res.success) {
                            const accessToken =
                                res.accessToken.split("Bearer ")[1];
                            const refreshToken = res.refreshToken;
                            setCookie("accessToken", accessToken);
                            setCookie("refreshToken", refreshToken);
                            getUser(token);
                    
                        }
                    })
                    .catch((error) => {
                        console.log(error, "USER_INFO_FAILED");
                        dispatch({ type: USER_INFO_FAILED });
                    });
            });
    };
};

export function changeUserInfo(changedBody:{name: string, email: string, password?: string}) {
    return function (dispatch:Dispatch) {
        dispatch({
            type: USER_INFO,
        });
        fetch(`${API}/auth/user`, {
            method: "PATCH",
            body: JSON.stringify(changedBody),
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
        })
            .then(checkResponse)
            .then((res:any) => {
                if (res && res.success) {
                    dispatch({
                        type: USER_INFO_SUCCESS,
                        userInfo: res.user,
                    });
                } else {
                    dispatch({
                        type: USER_INFO_FAILED,
                    });
                    console.log("err");
                }
            })
            .catch((err) => console.log(err,'changeUserInfo'));
    };
}
export function logOut() {
    return function (dispatch:Dispatch) {
        fetch(`${API}/auth/logout`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getCookie("refreshToken"),
            }),
        })
            .then(checkResponse)
            .then((res:any) => {
                if (res && res.success) {
                    deleteCookie("accessToken");
                    deleteCookie("refreshToken");
                    dispatch({ type: LOGOUT_USER });
                }
            })
            .catch((err) => {
                console.log(err,'logOut');
            });
    };
}
