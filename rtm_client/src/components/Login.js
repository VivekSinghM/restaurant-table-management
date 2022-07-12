import React, { useState } from "react";
import css from "./login.module.css";

const Login = (props) => {
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

  const signIn = (email,password) => {
    const payload = {
      email: email,
      password: password,
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Accept": "appliation/json",
        "Content-type": "appliation/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(
        (data) => console.log(data),
        (error) => {
          console.error(error);
        }
      );
    // defaultFire.auth().signInWithEmailAndPassword(email, password)
    // .then(response => { console.log("signIn Successfull",defaultFire.auth().currentUser); dispatch(setAuth(true)); })
    // .catch(error=>{console.log(error);});
  };

  return (
    <React.Fragment>
      <div className={css.container}>
        <div className={css.top}></div>
        <div className={css.bottom}></div>
        <form className={css.center}>
          <h2>Please Sign In</h2>
          <input type="email" value={email} onChange={fillEmail} placeholder="email" />
                <input type="password" value={password} onChange={fillPassword} placeholder="password" />
          <button
            className={"text-light mt-2 " + css.signInBtn}
            type="button"
            onClick={() => signIn(email,password)}
            style={{ color: "white" }}
          >
            <h5>Sign In</h5>
          </button>
          <h2>&nbsp;</h2>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Login;
