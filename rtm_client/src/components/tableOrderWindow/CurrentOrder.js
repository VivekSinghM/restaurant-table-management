import React, { useContext, useState } from "react";
import { MenuCard } from "../../context/MenuProvider";
import { TableContext } from "../../context/TableDataProvider";
import { OrderContext } from "../../context/OrderProvider";
import Item from "./items/Item";
import css from "./ConfirmOrder.module.css"
import ItemSearch from "../ItemSearch/ItemSearch";



const CurrentOrder = props => {
    const { menu } = useContext(MenuCard);
    const { placeOrder, updateOrder, closeOrder } = useContext(OrderContext);
    const { tableData, setOrderId, reSetTable } = useContext(TableContext);
    const [orderEdit, setOrderEdit] = useState(false);
    // const [isMenu, setIsMenu] = useState(false);
    // const [isBill, setIsBill] = useState(false);
    const optionList = Object.keys(menu).map(name => { return { value: name, label: name } })
    const selectedOpList = []
    const tData = tableData[props.tId];
    const [orderCopy, setOrderCopy] = useState({ ...tData.order });
    let temp = <></>;
    let subTotal = 0;
    const getGST = rate => (subTotal*rate)/100;
    const getGrandTotal = ()=> subTotal + 2*getGST(2.5);
    console.log(props.tId, tData);
    // console.log("menu", tData.order_id==null);
    // if (props.isBill) setIsBill(true);
    if (!(Object.keys(orderCopy).length === 0)) {
        temp = Object.entries(orderCopy).map(([name, qty]) => {

            selectedOpList.push({ value: name, label: name }); // list of selected options for search and edit 

            const item = menu[name];
            const amount = item.rate * qty;
            subTotal += amount;
            return (
                <Item key={name} name={name} item={item} qty={qty} amount={amount} cssIconCenter={css.iconCenter} isBill={props.isBill} />
            );
        });
    } else {
        temp = <tr className="text-center"><td colSpan={5}> no items </td></tr>
    }

    const [selectedI, setSelectedI] = useState(selectedOpList);
    const orderChangeHandler = orderList => {
        const tempDict = { ...orderCopy }
        orderList.forEach(item => {
            if (!orderCopy[item.value]) {
                tempDict[item.value] = 1;
            }
        })
        setOrderCopy(tempDict)
        setSelectedI(orderList);
    }

    const placeOrderHandler = () => { 
        if (tData.order_id==null){
            placeOrder(orderCopy,props.tId,(tid,oid,order)=>setOrderId(tid,oid,order))
        }
        setOrderEdit(false);
    }
    
    const genrateBillHandler=()=>{
        closeOrder( tData.order_id, subTotal,tid=>reSetTable(tid), props.tId);
    }

    return (
        <>
            <div className={"row justify-content-around " + css.backDiv} onClick={()=>{props.setIsBill(false); props.back();}} >
                <div className="col-md-8 p-0" style={{ maxWidth: '650px' }}>
                    <div className="card mt-4" onClick={e => e.stopPropagation()}>
                        <div className="card-header">
                            <div className='col m-0' style={{ verticalAlign: 'middle' }}>
                                <h2 className="m-0">Aloo Kachaloo</h2>
                                <div className="">{(new Date()).toLocaleDateString({
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit"
                                })}</div>
                            </div>
                        </div>
                        <div className="card-body" style={{ overflow: 'auto' }}>
                            <div className="col" style={{ verticalAlign: "middle" }}>
                                <h4 className="card-title m-0">Your Order</h4>
                                <div className="col p-0 d-flex justify-content-between">
                                    <p className="mt-auto mb-auto" style={{ fontSize: ".75rem" }}>Table no.-{Number(props.tId).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</p>
                                    {!!tData.order_id ? <span>order Id: {tData.order_id} </span> : <span>order Id: Nan </span>}
                                </div>
                            </div>
                            <table className={"table text-center m-0 " + css.memo}>
                                <thead className="thead thead-light">
                                    <tr>
                                        <td className="text-left">items</td>
                                        <td>Rate</td>
                                        <td>Qty</td>
                                        <td>Amount</td>
                                        {props.isBill ? <></> : <td style={{ width: "auto" }}> </td>}
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                    {temp}
                                    <tr className="border-top">
                                        <td className="text-left">Sub-Total:</td>
                                        <td></td>
                                        <td></td>
                                        <td>{subTotal}</td>
                                        <td></td>
                                    </tr>
                                    {props.isBill ?
                                        <>
                                            <tr>
                                                <td className="text-left"><label className="m-0">CGST 2.5%:</label></td>
                                                <td></td>
                                                <td></td>
                                                <td>{getGST(2.5)}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left"><label className="m-0">SGST 2.5%:</label></td>
                                                <td className="border-0"></td>
                                                <td></td>
                                                <td>{getGST(2.5)}</td>
                                                <td></td>
                                            </tr>
                                            <tr className="font-weight-bold border-top">
                                                <td className="text-left "><label className="m-0">Grand Total:</label></td>
                                                <td></td>
                                                <td></td>
                                                <td>{getGrandTotal()}</td>
                                                <td></td>
                                            </tr></>
                                        : ''}
                                </tbody>
                            </table>
                            <hr className="m-0" style={{ color: "#dee2e6" }} />
                            {orderEdit ?
                                <div className="row ml-auto mr-auto">
                                    <ItemSearch setSelectedI={orderChangeHandler} optionList={optionList} selectedI={selectedI} />
                                </div>
                                :
                                <></>
                            }
                            <div className="row mr-auto ml-auto d-flex justify-content-end" style={{ marginTop: "1.25rem" }}>
                                <div className="col p-0">
                                    {props.isBill ? <></> :
                                        orderEdit ? <button className="btn btn-danger" onClick={props.back} >Discard</button> : <button className="btn btn-primary" onClick={() => setOrderEdit(true)}>add Items</button>
                                    }
                                </div>
                                <div className="col p-0 d-flex justify-content-end">
                                    {
                                        props.isBill ? 
                                            <button className="btn btn-primary" onClick={genrateBillHandler}>Print Bill</button>
                                            :
                                            orderEdit? 
                                                <button className="btn btn-primary" onClick={placeOrderHandler}>Place Order</button> 
                                                : 
                                                <button className="btn btn-primary" onClick={() => props.setIsBill(true)}>Generate bill</button> 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CurrentOrder