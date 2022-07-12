import css from './BackDrop.module.css'

const BackDrop = (props) => ( props.show?<div className={css.Backdrop} onClick={props.hide}></div>:null )

export default BackDrop