import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom";
import { header, server_URI } from "../../Constants"
import { TableContext } from "../../context/TableDataProvider"

const ManageTables = props => {
    const { tableData, getTables, setTableData } = useContext(TableContext);
    const [addTableCount, setAddTableCount] = useState();
    const [totalTableCount, setTotalTableCount] = useState();
    const history = useHistory()
    let tablesCount = 0
    if (tableData) { tablesCount = Object.keys(tableData).length }
    const addTableHandler = (event) => {
        setAddTableCount(event.target.value);
    }
    const totalTableHandler = (event) => {
        setTotalTableCount(event.target.value);
    }
    const deleteAllTables = (afterCompleteFun) => {
        fetch(server_URI + '/deleteTables', { method: 'Delete', headers: header })
            .then(res => res.json())
            .then(res => {
                if (res.isDelete) {
                    console.log("delete all tables");
                    afterCompleteFun();
                    setAddTableCount(0);
                    setTotalTableCount(0);
                    getTables();
                }
            })
    }
    const addTables = (num) => {
        const payload = { tables: num }
        fetch(server_URI + '/addTables', {
            method: 'POST',
            headers: header,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log("created tables");
                setAddTableCount(0);
                setTotalTableCount(0);
                getTables();
            });
    }
    const setTables = () => {
        deleteAllTables(()=>{addTables(totalTableCount)});
    }

    return (
        <>
            <div className="container bg-light">
                <br />
                <div className="row">
                    <div className="col">
                        <h1 className="text-center"> Manage Tables </h1>
                        <br />
                        <div className="card">
                            <h4 className="card-header">
                                Dining Hall - I</h4>
                            <div className="card-body">
                                <h5 className="card-title ">{'Total Tables: ' + tablesCount}</h5>
                                <p className="card-text"></p>
                                <table className="table">
                                    <tbody className="tbody">
                                        <tr>
                                            <td style={{ verticalAlign: "middle" }}><label className="m-0">add tables:</label>
                                            </td>
                                            <td>
                                                <input type='number' className="col form-control" value={addTableCount} onChange={addTableHandler} min={1} />
                                            </td>
                                            <td style={{ width: '1%' }}>
                                                <button href="#" className="btn btn-primary" disabled={!addTableCount} onClick={()=>addTables(addTableCount)}>add Tables</button>
                                            </td>
                                        </tr>
                                        <tr className="border-bottom">
                                            <td style={{ verticalAlign: "middle" }}><label className="m-0">set total tables:</label>
                                            </td>
                                            <td>
                                                <input type='number' className="col form-control" value={totalTableCount} onChange={totalTableHandler} min={1} />
                                            </td>
                                            <td style={{ width: '1%' }}>
                                                <button href="#" className="btn btn-primary" disabled={!totalTableCount} onClick={setTables}>set Tables</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="row m-0 d-flex justify-content-between">
                                    <button href="#" className="btn btn-danger" onClick={() => { deleteAllTables(()=>{}) }}>delete all tables</button>
                                    <button href="#" className="btn btn-primary" onClick={() => { history.push('/') }}>save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}

export default ManageTables