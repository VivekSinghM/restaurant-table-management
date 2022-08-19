import React, { useContext, useState } from 'react'
import { TableContext } from '../../../context/TableDataProvider'
import Table from './table/Table'
const Tables = props => {
    const { tableData } = useContext(TableContext);
    let tablesJSX=<></>
    if (!!tableData) {
        tablesJSX = Object.entries(tableData).map(([tId, tData]) => {
            // console.log(orders[order_id]);
            return <Table key={tId} tId={tId} tData={tData} openOrder={props.orderWindowToggle} setIsBill={props.setIsBill}/>
        });
    }
    return (
        <>

            <div className="row">
                {/* col 1 */}
                <div className="col-sm">
                    <div className='row d-flex' style={{ justifyContent: "space-evenly" }}>
                        {tablesJSX}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tables