import React, { useState } from "react";
const ItemList=props=>{
        const [action,setAction]=useState('add');
        const [btnColor,setBtnColor]=useState("btn-dark");
        const updateAction=()=> {
            if(props.isAdded()) {
                setAction("remove"); setBtnColor("btn-light text-dark border");
            }
            else{
                setAction('add'); setBtnColor("btn-dark");
            }
        }
        // console.log(props.key,val);
        return (
        <tr>
            <td className='pl-3'>{props.name }</td>
            <td>{props.val["rate"]}</td>
            <td style={{width: "1%"}}>
                <span>{props.qty}</span>
                {/* <button type="button" className={"btn btn-default btn-sm p-0 " + btnColor} onClick={()=>{props.addOrderItems(props.key); updateAction()}}>
                    <span className={"material-symbols-outlined "+ props.cssIconCenter}>{action}</span>
                </button> */}
            </td>
        </tr>
        );
}
export default ItemList