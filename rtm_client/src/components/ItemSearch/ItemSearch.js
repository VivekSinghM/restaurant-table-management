import React, { useContext, useState } from "react";
import Select from 'react-select'
import { MenuCard } from "../../context/MenuProvider";
const ItemSearch = props => {
    const selectHandler=data=>{
        props.setSelectedI(data)
    }
    return (
        <>
            <div style={{ width: '100%' }}><Select options={props.optionList} placeholder="Select Item" value={props.selectedI} onChange={selectHandler} classNamePrefix="Select" isMulti /></div>
        </>
    )
}

export default ItemSearch