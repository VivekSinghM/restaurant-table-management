import React from "react";
import CurrentOrder from "../orderWindow/CurrentOrder";
import Orders from "./orders/Orders";

const OrderPage = () =>{
    const [orderWindow,setOrderWindow]= useState(false)
    const [currentOId,setCurrentOId] = useState(undefined);
    const [isBill, setIsBill] = useState(true);

    const orderWindowToggle=(tId)=>{
      // console.log('window',tId);
        if (!orderWindow) {
          setCurrentTId(tId)
        }else{
          setCurrentTId(undefined)
        }
        setOrderWindow(!orderWindow);
    }

    return(
        <>
        {orderWindow?<CurrentOrder back={orderWindowToggle} oid={currentOId} isBill={isBill} setIsBill={()=>{}} />:<></>}
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