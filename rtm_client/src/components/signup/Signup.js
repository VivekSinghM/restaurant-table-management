import React, {useState,useEffect,useLayoutEffect} from "react"
import { Navigate } from "react-router-dom";
import css from "./Signup.module.css";
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Signup=(props)=>{
    const loggedIn=false
    const form={
        name:{
            elementType: 'input',
            elementConfig:{type:'text',name:'name',placeholder:'Full Name'}
        },
        userId:{
            elementType: 'input',
            elementConfig:{type:'text',name:'email',placeholder:'userId'}
        },
        password:{
            elementType: 'input',
            elementConfig:{type:'password',name:'password',placeholder:'password',}
        },
    }
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const inputValueHandler = (event)=>{
        switch(event.target.name){
            case 'name': setName(event.target.value);break;
            case 'email': setEmail(event.target.value);break;
            case 'password': setPassword(event.target.value);break;
        }
    }
    const submitHandler=()=>{
        console.log(name,email,password)
        const _alert=[]
        if(name=='')_alert.push('name'); if(email=='')_alert.push('email'); if(password=='')_alert.push('password') 
        if(!_alert.length==0) {alert(_alert.join(' and ')+' not entred'); return}
        const payload={
            name:name,
            email:email,
            password:password
        }
        fetch("/signup", {
            method: "POST",
            headers: {
              Accept: "appliation/json",
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
    }
    const webform=[];
    for(let key in form){
        const temp =form[key]
        webform.push(<Input elementType={temp.elementType} elementConfig={temp.elementConfig} change={inputValueHandler} key={key}/>)
    }
    return (
        <div className={css.Auth}>
            {loggedIn?<Navigate to="/"/>:null}
            <form>
                <h1>logIn</h1>
                {webform}{console.log(webform,'x')}
                <Button type="Success" click={submitHandler} btnType="button">logIn</Button>
            </form>
        </div>
    )
};

export default Signup;