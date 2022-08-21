import React, { createContext, useContext, useEffect, useState } from "react";
import { header, inisitalData, server_URI } from "../Constants";
import { AuthContext } from "./AuthProvider";
// import { MenuCard } from "./MenuProvider";

export const TableContext = createContext();

const TableDataProvicer = (props) => {
    const [tableData, setTableData] = useState();
    const { isAuth, logout } = useContext(AuthContext)
    // const { headerVal } = useContext(AuthContext)

    const setOrderId = (tid, oid, order) => {
        console.log("tid:", tid, "oid:", oid, order);
        const tempdict = { ...tableData };
        const table = tempdict[tid];
        table.order_id = oid;
        table.order = order;
        table.occupied = true;
        setTableData(tempdict);
    }

    const reSetTable = (tid) => {
        const tempdict = { ...tableData };
        const table = tempdict[tid];
        table.order_id = null;
        table.order = {};
        table.occupied = false;
        setTableData(tempdict);
    }
    const getTables = () => {
        fetch(server_URI + "/tables", { headers: header })
            .then((res) => {
                // check for error response
                if (!res.ok) {
                    res.json().then((data) => {
                        const error = (data && data.message) || res.status;
                        throw new Error(error);
                    }).catch((error) => {
                        console.log("error in loading table:", error);
                        logout();
                    })
                }
                return res.json();
            })
            .then((data) => {
                setTableData(data);
                const orderIds = [];
                Object.entries(data).forEach(([key, val]) => {
                    if (!!val.order_id) orderIds.push(val.order_id);
                });
                // if (orderIds.length > 0) getordersData(orderIds);
            })
            .catch((error) => {
                console.log("error in loading table:", error);
            });
    }

    useEffect(() => {
        if (isAuth) {
            console.log("loading tables data");
            getTables();
        }
    }, [isAuth]);


    return (
        <>
            <TableContext.Provider value={{ tableData, getTables, setOrderId, reSetTable, setTableData }}>{props.children}</TableContext.Provider>
        </>
    );
};

export default TableDataProvicer;
