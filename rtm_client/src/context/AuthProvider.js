import React, { createContext, useState } from 'react'

export const Auth=createContext();

const AuthProvider=(props)=>{
    //check auth
    const [isAuth,setAuth]=useState(false);
    const [token,setToken]=useState("");
    const login=(token)=>{setToken(token);setAuth(true)}
    const logout=()=>{ setAuth(false) }
    
    return <Auth.Provider value= {
        {
            isAuth:isAuth,
            login:login,
            logout:logout
        }
    }>
        {props.children}
    </Auth.Provider>
}
export default AuthProvider