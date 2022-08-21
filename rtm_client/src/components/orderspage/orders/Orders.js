import React, { useContext, useEffect, useState } from 'react'
import { header, server_URI } from '../../../Constants';
import { OrderContext } from '../../../context/OrderProvider';
import { TableContext } from '../../../context/TableDataProvider'
import Order from './order/Order'
const Orders = props => {
    const { orders, setOrders } = useContext(OrderContext);
    let orderJSX = <></>
    if (!!orders) {
        console.log(orders);
        orderJSX = Object.entries(orders).map(([oId, oData]) => {
            // console.log(oData);
            return <Order key={oId} id={oId} data={oData} openOrder={props.orderWindowToggle} setIsBill={() => { }} />
        });
    }
    const loadOrders = () => {
        fetch(server_URI + '/getOrders', { method: 'Get', headers: header })
            .then(res => res.json())
            .then(orders => { /*console.log(orders);*/ setOrders(orders) })
    }
    useEffect(() => {
        console.log(!orders);
        if (!orders) loadOrders();
    }, [])
    return (
        <>
            <div className='row m-0 d-flex justify-content-end'>
                <button className='btn btn-primary' onClick={loadOrders}>
                    <span class="material-symbols-outlined " style={{ transform: 'translate(0px, 2.5px)', fontSize: '20px' }}>refresh</span>
                </button>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className='row d-flex' style={{ justifyContent: "space-evenly" }}>
                        {orderJSX}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Orders