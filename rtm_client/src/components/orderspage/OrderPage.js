import React, { useState } from "react";
import CurrentOrder from "../tableOrderWindow/CurrentOrder";
import Orders from "./orders/Orders";

const OrderPage = () =>{
    const [orderWindow,setOrderWindow]= useState(false)
    const [currentOId,setCurrentOId] = useState(undefined);

    const orderWindowToggle=(oId)=>{
      // console.log('window',tId);
        if (!orderWindow) {
          setCurrentOId(oId)
        }else{
          setCurrentOId(undefined)
        }
        setOrderWindow(!orderWindow);
    }

    return(
        <>
        {orderWindow?<CurrentOrder back={orderWindowToggle} oid={currentOId} isBill={true}  />:<></>}
        <div className= "container bg-light">
              <br/>
              <div className="row">

                {/* dinein */}
                <div className="col">
                  <h1 className="text-center"> All orders </h1>
                  <br/>
                    <Orders orderWindowToggle={orderWindowToggle}></Orders>
                </div>

                {/* other orders */}
                {/* <div className="col-3 border mr-3">
                  <div className="row">
                    <div className="col-sm">
                      <h3 className="text-center"> Other Orders </h3>
                    </div>
                  </div>
                </div> */}

              </div>
              <br/>
        </div> 
        </>
    )
}
export default OrderPage