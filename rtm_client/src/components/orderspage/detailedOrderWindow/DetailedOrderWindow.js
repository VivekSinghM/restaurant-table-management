import React, { useContext, useState } from "react";

import { MenuCard } from '../../../context/MenuProvider';
import PropTypes from 'prop-types'
import Item from "./items/Item";
import css from "./DetailedOrderWindow.module.css"



const DetailedOrderWindow = props => {
    const { menu } = useContext(MenuCard);
    let temp = <></>;
    let subTotal = 0;
    const order=props.order.order;
    const getGST = rate => (subTotal * rate) / 100;
    const getGrandTotal = () => subTotal + 2 * getGST(2.5);
    if (!(Object.keys(order).length === 0)) {
        temp = Object.entries(order).map(([name, qty]) => {
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

    const printHandler =()=> {
        props.printInvoice()
    }

    return (
        <>
            <div className={"row justify-content-around " + css.backDiv} onClick={() => { props.back(); }} >
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
                                    <p className="mt-auto mb-auto" style={{ fontSize: ".75rem" }}>Order no.-{props.oId}</p>
                                </div>
                            </div>
                            <table className={"table text-center m-0 " + css.memo}>
                                <thead className="thead thead-light">
                                    <tr>
                                        <td className="text-left">items</td>
                                        <td>Rate</td>
                                        <td>Qty</td>
                                        <td>Amount</td>
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
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="m-0" style={{ color: "#dee2e6" }} />
                            <div className="row mr-auto ml-auto d-flex justify-content-end" style={{ marginTop: "1.25rem" }}>
                                <div className="col p-0 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={printHandler}>Print Bill</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
DetailedOrderWindow.propTypes = {
    back: PropTypes.func.isRequired,
    printInvoice: PropTypes.func.isRequired,
    order : PropTypes.object.isRequired
};
DetailedOrderWindow.defaulProps = {
    back:()=>{console.log('back fun');},
    printInvoice:()=>{ console.log('print invoice'); },
    order : {xyz:{item1:1,item:2,'invoice id':'xyz'}}
};
export default DetailedOrderWindow