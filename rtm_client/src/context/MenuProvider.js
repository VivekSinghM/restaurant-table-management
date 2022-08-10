import React, { createContext, useEffect, useState } from "react";

export const MenuCard = createContext();

const MenuProvider=props=>{
    const [menu,setMenu]=useState(undefined);
    useEffect(_=>{
        if (menu==undefined){
            console.log("sending req for menu");
            fetch('/getMenu')
            .then(data=>data.json()).then(data=>setMenu(data))
            .catch(error=>console.log(error));
            console.log('menu loaded success', menu);
        }
    },[]);

    return(
        <MenuCard.Provider value={{menu,setMenu}}>
            { props.children }
        </MenuCard.Provider>
    );
} 

export default MenuProvider;