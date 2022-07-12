import React from "react";
import css from "./Input.module.css"
const Input =(props)=>{
    let inputElement=null
    switch(props.elementType){
        case ('input') : inputElement=<input className={css.InputElement} onChange={props.change} {...props.elementConfig}/>;
        break;
        case ('password') : inputElement=<input className={css.InputElement} onChange={props.change} {...props.elementConfig}/>;
        break; 
        case ('textArea') : inputElement=<input className={css.InputElement} onChange={props.change} {...props.elementConfig}/>;
        break; 
        case ('select') : inputElement=<select name={props.elementConfig.name} onChange={props.change} >
            {props.elementConfig.options.map(data=>(<option value={data.value} key={data.value}>{data.display}</option>))}
        </select>;
        break; 
        default : inputElement=<input className={css.InputElement} onChange={props.change} {...props.elementConfig}/>; 
    }
    return(
        <div className={css.Input}>
            <label className={css.Label}>{props.name}</label>
            {inputElement}
        </div>
    )
}
export default Input