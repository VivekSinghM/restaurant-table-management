import React, { useState } from 'react'
import CurrentOrder from '../tableOrderWindow/CurrentOrder';
// import ConfirmOrder from '../confirm/ConfirmOrder';
import Tables from './tables/Tables'
const Dashboard=()=>{
    const [orderWindow,setOrderWindow]= useState(false)
    const [currentTId,setCurrentTId] = useState(undefined);
    const [isBill, setIsBill] = useState(false);

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
        {orderWindow?<CurrentOrder back={orderWindowToggle} tId={currentTId} isBill={isBill} setIsBill={setIsBill} />:<></>}
        <div className= "container bg-light">
              <br/>
              <div className="row">

                {/* dinein */}
                <div className="col">
                  <h1 className="text-center"> Dine-in </h1>
                  <br/>
                    <Tables orderWindowToggle={orderWindowToggle} setIsBill={setIsBill}></Tables>
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
export default Dashboard
