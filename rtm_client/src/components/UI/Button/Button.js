import React from 'react'
import css from './Button.module.css'

const Button = (props) => {
    const classes=[css.Button,css[props.type]]
    return (!!props.btnType)?<button className={classes.join(' ')} onClick={props.click} type={props.btnType} style={props.style} >{props.children}</button>:<button className={classes.join(' ')} onClick={props.click} style={props.style} >{props.children}</button>

}

export default Button 