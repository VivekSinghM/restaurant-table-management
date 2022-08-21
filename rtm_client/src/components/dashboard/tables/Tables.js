import React, { useContext, useState } from 'react'
import { TableContext } from '../../../context/TableDataProvider'
import Table from './table/Table'
const Tables = props => {
    const { tableData } = useContext(TableContext);
    let tablesJSX=(<div className='col'>
                <h3>No Tables</h3>
                <p>add tables from manage tables option in dropdown</p>
                </div>)
    console.log(tableData,!!tableData);
    if (!!tableData && Object.keys(tableData).length != 0) {
        tablesJSX = Object.entries(tableData).map(([tId, tData]) => {
            // console.log(orders[order_id]);
            return <Table key={tId} tId={tId} tData={tData} openOrder={props.orderWindowToggle} setIsBill={props.setIsBill}/>
        });
    }
    return (
        <>
            <hr/>
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