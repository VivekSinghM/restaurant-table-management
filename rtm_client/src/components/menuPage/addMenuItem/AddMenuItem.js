import React, { useContext, useState } from "react"
import { header, server_URI } from "../../../Constants";
import { MenuCard } from "../../../context/MenuProvider";

const AddMenuItem = () => {
    const [name, setName] = useState();
    const [rate, setRate] = useState();
    const [desc, setDesc] = useState();
    const { addMenuItem } = useContext(MenuCard);

    const addItemHandler = (event) => {
        const img = ""
        event.preventDefault();
        if (!!name && !!rate) {
            const payload = {
                name: name,
                price: rate,
                img: img,
                desc: desc
            }
            fetch(server_URI + '/addMenuItem', {method:'POST', headers: header, body: JSON.stringify(payload) })
                .then(res => res.json())
                .then(data => {
                    console.log('item added in menu. Item id: ', data);
                    addMenuItem(name,rate,"",desc);
                })
                .catch(error => { console.log(error); })
        }
    }

    return (
        <div className='row'>
            <div className="col">
                <form className="form">
                    <table className='table table-light text-left' onKeyDown={event => { if (event.key == "Enter") { } }}>
                        <thead>
                            <tr>
                                <td colSpan={4}>
                                    <h5>Add item:</h5>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: "middle" }}><label className="m-0">Name:</label></td>
                                <td><input className='form-control' type='text' name='iten_name' onChange={event => setName(event.target.value)} /></td>
                                <td style={{ verticalAlign: "middle" }}><label className="m-0">Rate:</label></td>
                                <td><input className='form-control' type='number' min={0} name='item_rate' onChange={event => setRate(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: "middle" }}><label className="m-0">Desciption:</label></td>
                                <td colSpan={3}><input className='form-control' type='text' name='item_disc' onChange={event => setDesc(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><button type="reset" className="reset btn btn-secondary">reset</button></td>
                                <td colSpan={2}></td>
                                <td className="d-flex justify-content-end"><button className="btn btn-primary" onClick={event => addItemHandler(event)}>Add Item</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}
export default AddMenuItem;