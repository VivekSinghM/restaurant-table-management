import React, { useState } from "react";
import { useReactToPrint } from 'react-to-print'
import DetailedOrderWindow from "./detailedOrderWindow/DetailedOrderWindow";
import Orders from "./orders/Orders";

const OrderPage = () => {
    const [orderWindow, setOrderWindow] = useState(false)
    const [openOrder, setOpenOrder] = useState();

    const orderWindowToggle = (order) => {
        // console.log('window',tId);
        if (!orderWindow) {
            setOpenOrder(order)
        } else {
            setOpenOrder()
        }
        setOrderWindow(!orderWindow);
    }


    const printInvoice =()=>{}


    return (
        <>
            {orderWindow ? <DetailedOrderWindow back={orderWindowToggle} order={openOrder} printInvoice={printInvoice}/> : <></>}
            <div className="container bg-light">
                <br />
                <div className="row">

                    {/* dinein */}
                    <div className="col">
                        <h1 className="text-center"> All orders </h1>
                        <br />
                        <Orders orderWindowToggle={orderWindowToggle}></Orders>
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}
export default OrderPage