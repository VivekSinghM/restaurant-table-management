import React from "react";
import Logo from "../../../static/Logo";
import "./Loader.css"
const Loader = props => {
    return (
        <div className="col justify-content-around backDiv" onClick={props.back} >
            <div className='text-light' style={{ paddingTop: '15%' }}>
                <br />
                <div className='row d-flex justify-content-center' style={{ height: '250px' }}>
                    <Logo />
                </div>
                <h1 className='heading AKheading' style={{ paddingBottom: '15%' }}>Aloo Kachaloo</h1>
            </div>
            <div className="row">
                <div className="col  d-flex justify-content-center">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>
    )
}
export default Loader