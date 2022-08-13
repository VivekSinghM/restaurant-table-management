import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Order = props => {
    let itemsJSX = <h2 className='text-secondary'>No Order</h2>
    if (props.order_id!=null) {
        itemsJSX = Object.entries(props.order).map(([name, qty]) => {
            return <li key={name}><div className="row m-0 d-flex justify-content-between  pr-3"><span>{name}</span><span>- {qty}</span></div></li>
        });
    }
    return (
        <div className='p-2' style={{ width: '270px' }}>
            <div className="card">
                <div className="card-header p-2">
                    <div className='row d-flex justify-content-between  m-0' style={{ verticalAlign: 'middle' }}>
                        <h3 className="m-0">T-{Number(props.tId).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</h3>
                    </div>
                </div>
                <div className="card-body p-2">
                    <h5 className="card-title mb-2">Order</h5>
                    <ul className="card-text mb-3" style={{ height: '3em', lineHeight: "1em", overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
                        {itemsJSX}
                    </ul>
                    <div className='row m-auto'>
                        <div className='col p-0 d-flex'>
                            <button className="btn btn-dark border-0 p-1" onClick={()=>{props.setIsBill(true); props.openOrder(props.tId);}}>Generate bill</button>
                        </div>
                            <div className="d-flex align-items-center "><span onClick={() => props.openOrder(props.tId)}>open..</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Order