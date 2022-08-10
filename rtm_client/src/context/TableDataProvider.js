import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuCard } from "./MenuProvider";

export const TableContext = createContext();

const TableDataProvicer = (props) => {
    const { menu } = useContext(MenuCard)
    const [tableDate, setTableDate] = useState({});
    const [ordersData, setordersDataData] = useState({});
    let subMenu = {}
    const getordersData = (orderIds) => {
        // console.log("loaded tables data:", tableDate);
        console.log("loding ordersData");
        const payload = { ids: orderIds };
        fetch("/getordersData", {
            method: "POST",
            headers: {
                Accept: "appliation/json",
                "Content-type": "appliation/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                setordersDataData(data);
                // console.log(data);
            })
            .catch((error) => console.log(error));
        // console.log("loaded ordersData:", ordersData);
    };
    useEffect(() => {
        console.log("loading tables data");

        fetch("/tables")
            .then((res) => res.json())
            .then((data) => {
                setTableDate(data);
                const orderIds = [];
                Object.entries(data).forEach(([key, val]) => {
                    if (!!val.order_id) orderIds.push(val.order_id);
                });
                if (orderIds.length > 0) getordersData(orderIds);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log("loading subMenu");
        const items = []
        Object.values(ordersData).map(items => Object.keys(items)).forEach(item => items.push(...item))
        console.log(items, Object.values(ordersData));
        Object.values(menu).filter(item => items.includes(item.name)).forEach(item => subMenu[item.name] = item)
        console.log("submenu: ", subMenu);
    }, [ordersData])
    return (
        <>
            <TableContext.Provider value={{ tableDate, ordersData, subMenu }}>{props.children}</TableContext.Provider>
        </>
    );
};

export default TableDataProvicer;
