import React, { useState } from "react";

const Item = props=>{
    const [addItem,setAddItem]= useState(undefined)
    return(
        <>
        <tr>
          <td className="text-left">{props.name}</td>
          <td>{props.item["rate"]}</td>
          <td style={{ width: "1%" }}>
            <span>{props.qty}</span>
          </td>
          <td>{props.amount}</td>
          { props.isBill ?<></>:
            <td className="pl-0 pr-0" style={{minWidth:"80px"}}>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={"btn btn-default border border-dark text-weight-bold text-danger btn-sm p-0 "} onClick={() => {}} disabled>
                  <span className={"material-symbols-outlined " + props.cssIconCenter}> remove </span>
                </button>
                <button type="button" className={"btn btn-default border border-dark text-weight-bold  text-success btn-sm p-0 "} onClick={() => {}} >
                  <span className={"material-symbols-outlined " + props.cssIconCenter}> add </span>
                </button>
              </div>
              <button type="button" className={"btn btn-default btn-dark btn-sm p-0 ml-2"} onClick={() => {}} >
                  <span className="material-symbols-outlined" style={{transform: 'translate(0px, 2.5px)',fontSize:20}}> restart_alt </span>
                </button>
            </td> 
          }
        </tr>
        </>
    )
}
export default Item