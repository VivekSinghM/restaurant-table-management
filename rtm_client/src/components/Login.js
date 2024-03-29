import React, { useContext, useState } from "react";
import { userTypes } from "../Constants";
import { AuthContext } from "../context/AuthProvider";
import css from "./login.module.css";

const Login = (props) => {
    const {login}=useContext(AuthContext)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const fillEmail = (event) => {
        const temp = event.target.value;
        setemail(temp);
    };

    const fillPassword = (event) => {
        const temp = event.target.value;
        setpassword(temp);
    };

    const loginHandler=(email,password)=>{
        login(email,password,userTypes.staff);
    }
    return (
        <>
            <div className={css.container}>
                <div className={css.top}></div>
                <div className={css.bottom}></div>
                <form className={css.center}>
                    <h2>Please Sign In</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={fillEmail}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={fillPassword}
                        placeholder="password"
                    />
                    <button
                        className={"text-light mt-2 " + css.signInBtn}
                        type="button"
                        onClick={() => loginHandler(email, password)}
                        style={{ color: "white" }}
                    >
                        <h5>Sign In</h5>
                    </button>
                    <h2>&nbsp;</h2>
                </form>
            </div>
        </>
    );
};
export default Login;
