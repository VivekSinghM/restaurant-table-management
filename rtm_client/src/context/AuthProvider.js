import React, { createContext, useEffect, useState } from "react";
import { AKData, userTypes } from "../Constants";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    //check auth
    const [isAuth, setAuth] = useState(false);
    const [userType, setUserType] = useState(userTypes.anonymous);
    const [token, setToken] = useState({ token: "", exp_time: undefined });
    console.log("starting AuthProvider");

    useEffect(() => {
        if (!!localStorage.getItem(AKData)) {
            const localAppData = JSON.parse(localStorage.getItem(AKData));
            const tData = localAppData.tData
            const userType = localAppData.userType
            setToken(tData);
            setUserType(userType);
            setAuth(true);
        }
    }, []);

    const login = (email, password, userType = userTypes.staff) => {
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
                setUserType(userType);
                const localAppData={
                    tData:tData,
                    userType:userType
                }
                const tDataStr = JSON.stringify(localAppData);
                localStorage.setItem(AKData, tDataStr);
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
                userType,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
