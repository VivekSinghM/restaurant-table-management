import React, { useState, createContext } from "react";

export const OrderContext = createContext()

const OrderProvider = props => {
    // const [order,setOrder] = useState({'62f025e9a5cf024b91afb560': {1: 1, 3: 1, 6: 1}})
    const [order, setOrder] = useState({});

    const placeOrder = (orderItems, tid, setOID) => {
        console.log("placing order for table:", tid);
        const payload = { order: orderItems }
        fetch('/place_order?tid=' + tid, {
            method: "POST",
            headers: {
                "Accept": "appliation/json",
                "Content-type": "appliation/json",
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json()).then(res => {
                const tempOrder = { order_id: res.order_id, order: orderItems };
                console.log("order placed", tempOrder);
                setOrder(tempOrder);
                setOID(tid,res.order_id,orderItems);
            }
            )
            .catch(error => console.log(error));
    }
    const updateOrder = (orderItems, tId, oId) => {
        const payload = {
            order_id: oId,
            order: orderItems
        }
        fetch('/updateOrder?tid=' + tId, {
            method: "POST",
            headers: {
                "Accept": "appliation/json",
                "Content-type": "appliation/json",
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(res => {
                const orderId = res.order_id;
                console.log("order id:", orderId);
                setOrder({ orderId: orderItems })
            })
            .catch(error => console.log(error));
    }

    // const removeOrder = (tokenId, oId, tId) => {
    //     const payload = {
    //         token_id:tokenId,
    //         order_id: oId
    //     }
    //     fetch('/updateOrder?tid=' + tId, {
    //         method: "POST",
    //         headers: {
    //             "Accept": "appliation/json",
    //             "Content-type": "appliation/json",
    //         },
    //         body: JSON.stringify(payload),
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //              const orderId = res.order_id;
    //              console.log("order id:", orderId);
    //             })
    //         .catch(error => console.log(error));
    // }

    return (
        <>
            <OrderContext.Provider value={{ order, placeOrder, updateOrder }}>
                {props.children}
            </OrderContext.Provider>
        </>
    );
}
export default OrderProvider