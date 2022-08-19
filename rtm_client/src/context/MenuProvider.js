import React, { createContext, useContext, useEffect, useState } from "react";
import { server_URI } from "../Constants";
import { AuthContext } from "./AuthProvider";

export const MenuCard = createContext();

const MenuProvider = props => {
    const [menu, setMenu] = useState();
    // const { headerVal } = useContext(AuthContext);

    const addMenuItem = (name, rate, img = null, desc = "") => {
        const tempMenu = { ...menu };
        tempMenu[name] = { rate: rate, img: img, desc: desc };
        console.log("adding item in local menu \nitem:",tempMenu)
        setMenu( tempMenu );
    }

    useEffect(_ => {
        console.log("setting up menu");
        console.log(menu,!menu);
        if (!menu) {
            console.log("sending req for menu");
            fetch(server_URI + '/getMenu')
                .then(data => data.json()).then(data => setMenu(data))
                .catch(error => console.log(error));
            console.log('menu loaded success', menu);
        }
    }, []);

    return (
        <MenuCard.Provider value={{ menu, setMenu, addMenuItem }}>
            {props.children}
        </MenuCard.Provider>
    );
}

export default MenuProvider;