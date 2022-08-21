import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import { AKData, header, server_URI, setHeader, userTypes } from "../Constants";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    //check auth
    const [isAuth, setAuth] = useState(false);
    const [userType, setUserType] = useState(userTypes.anonymous);
    const [token, setToken] = useState({ token: "", exp_time: undefined });
    const [isLoading,setIsLoaing] = useState(false)
    const history = useHistory();
    // const [headerVal, setHeaderVal] = useState({ Accept: "appliation/json", "Content-type": "appliation/json" })

    console.log("starting AuthProvider");

    useEffect(() => {
        if (!!localStorage.getItem(AKData)) {
            const localAppData = JSON.parse(localStorage.getItem(AKData));
            const tData = localAppData.tData
            const userType = localAppData.userType
            setToken(tData);
            // const tempHeader = { ...headerVal };
            const tempHeader = { ...header };
            tempHeader['token'] = tData.token;
            // console.log("header: ",tempHeader);
            // setHeaderVal(tempHeader);
            setHeader(tempHeader);
            setUserType(userType);
            setAuth(true);
        }
    }, []);

    const login = (email, password, userType = userTypes.staff) => {
        setIsLoaing(true);
        const payload = {
            email: email,
            password: password,
        };
        fetch(server_URI + "/login", {
            method: "POST",
            // headers: headerVal,
            headers: header,
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((tData) => {
                // const tempHeader = { ...headerVal };
                const tempHeader = { ...header };
                tempHeader['token'] = tData.token;
                console.log("header: ",tempHeader);
                // setHeaderVal(tempHeader);
                setHeader(tempHeader);
                setToken(tData);
                setUserType(userType);
                const localAppData = {
                    tData: tData,
                    userType: userType
                }
                const tDataStr = JSON.stringify(localAppData);
                localStorage.setItem(AKData, tDataStr);
                setAuth(true);
            })
            .catch((error) => {
                console.log(error);
            }).finally(_=>setIsLoaing(false));
    };

    const logout = () => {
        // const tempHeader = { ...headerVal };
        const tempHeader = { ...header };
        delete tempHeader['_token'];
        console.log(tempHeader);
        // setHeaderVal(tempHeader);
        setHeader(tempHeader);
        setToken({ token: "", exp_time: undefined });
        setUserType(userTypes.anonymous)
        setAuth(false);
        localStorage.removeItem(AKData);
        history.push('/login')
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuth,
                userType,
                // headerVal,
                login,
                logout,
            }}
        >
            {isLoading && <Loader></Loader>}
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
