import React, { createContext, useContext, useEffect, useState } from "react";
import { inisitalData } from "../Constants";
// import { MenuCard } from "./MenuProvider";

export const TableContext = createContext();

const TableDataProvicer = (props) => {
    const [tableData, setTableData] = useState(inisitalData.tableData);

    const setOrderId=(tid,oid,order)=>{
        const tempdict = {...tableData};
        const table = tempdict[tid];
        table.order_id = oid;
        table.order=order;
        table.occupied = true;
        setTableData(tempdict);
    }

    const reSetTabel=(tid)=>{
        const tempdict = {...tableData};
        const table = tempdict[tid];
        table.order_id = null;
        table.order={};
        table.occupied = false;
        setTableData(tempdict);
    }

    useEffect(() => {
        console.log("loading tables data");
        fetch("/tables")
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
                const orderIds = [];
                Object.entries(data).forEach(([key, val]) => {
                    if (!!val.order_id) orderIds.push(val.order_id);
                });
                // if (orderIds.length > 0) getordersData(orderIds);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <TableContext.Provider value={{ tableData, setOrderId, reSetTabel }}>{props.children}</TableContext.Provider>
        </>
    );
};

export default TableDataProvicer;
