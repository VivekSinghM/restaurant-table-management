import Auxi from '../../../hoc/Auxi'
import BackDrop from '../BackDrop/BackDrop'
import css from './Modal.module.css'

const Modal= (props)=>(
    <Auxi>
        <BackDrop show={props.show} hide={props.hide} />
        <div className={css.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0'}}>
            { props.children }
        </div>
    </Auxi>
)
export default Modal