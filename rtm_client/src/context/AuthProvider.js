import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    //check auth
    const [isAuth, setAuth] = useState(false);
    const [token, setToken] = useState({ token: "", exp_time: undefined });
    const lAuthKey = "AKauthData";
    console.log("starting AuthProvider");

    useEffect(() => {
        if (!!localStorage.getItem(lAuthKey)) {
            const tData = JSON.parse(localStorage.getItem(lAuthKey));
            setToken(tData);
            setAuth(true);
        }
    }, []);

    const login = (email, password) => {
        const payload = {
            email: email,
            password: password,
        };
        fetch("/login", {
            method: "POST",
            headers: {
                Accept: "appliation/json",
                "Content-type": "appliation/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((tData) => {
                setToken(tData);
                const tDataStr = JSON.stringify(tData);
                localStorage.setItem(lAuthKey, tDataStr);
                setAuth(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logout = () => {
        setToken({ token: "", exp_time: undefined });
        setAuth(false);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuth,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
