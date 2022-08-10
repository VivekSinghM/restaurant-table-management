import React, { useContext, useState } from 'react'
import { TableContext } from '../../context/TableProvicer';
import ConfirmOrder from '../confirm/ConfirmOrder';
import Tables from './tables/Tables'
const DineIn=()=>{
    const [orderWindow,setOrderWindow]= useState(false)
    const {orders} = useContext(TableContext);
    const [currentTId,setCurrentTId] = useState(undefined);
    const [currentOId,setCurrentOId] = useState(undefined);
    const [orderToOpen,setOrderToOpen] = useState({});
    const orderWindowToggle=(tId,oId,order)=>{
      console.log('window',tId,order);
        if (!orderWindow) {
          setCurrentTId(tId)
          if (!!oId) setCurrentOId(oId)
          setOrderToOpen(order)
        }else{
          setCurrentTId(undefined)
          setCurrentOId(undefined)
          setOrderToOpen({});
        }
        setOrderWindow(!orderWindow);
    }

    return(
        <>
        {orderWindow?<ConfirmOrder back={orderWindowToggle} orderItems={orderToOpen} tId={currentTId} oId={currentOId}/>:<></>}
        <div className= "container bg-light">
              <br/>
              <div className="row">

                {/* dinein */}
                <div className="col">
                  <h1 className="text-center"> Dine-in </h1>
                  <br/>
                    <Tables orderWindowToggle={orderWindowToggle}></Tables>
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
export default DineIn
