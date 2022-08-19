import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { userTypes } from '../../../Constants'
import { AuthContext } from '../../../context/AuthProvider'

const Navbar = (props) => {
    const {isAuth}=useContext(AuthContext)
    const { userType, logout } = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = () => {
        history.push('/home')
    }
    const loginHandler = () => {
        history.push('/login')
    }
    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg navbar-dark justify-content-between" style={{ background: "#222222" }}>
                    <Link className="navbar-brand" to="/home">Aloo Kachaloo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {(userType == userTypes.staff) ? <NavLink className="nav-link" activeClassName='active' to='/dashboard'>dashboard</NavLink> : <NavLink className="nav-link" activeClassName='active' to='/home'>Home</NavLink>}
                            </li>
                            <li className="nav-item">
                            {(userType == userTypes.staff) ? <NavLink className="nav-link" activeClassName='active' to='/menu'>Menu Card</NavLink> : <></>}
                            </li>
                            <li className="nav-item">
                                {(userType == userTypes.staff) ?<NavLink className="nav-link" activeClassName='active' to='/Orders'>Orders</NavLink> : <NavLink className="nav-link" activeClassName='active' to='/yourOrders'>your Order</NavLink>}
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="material-symbols-outlined">account_circle</span><span className="material-symbols-outlined">arrow_drop_down</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    {userType==userTypes.anonymous?<></>:
                                        <>
                                            {/* <a className="dropdown-item" href="#">Dine-in</a>
                                            <a className="dropdown-item" href="#">add user</a>
                                            <a className="dropdown-item" href="#">Online</a>
                                            <div className="dropdown-divider"></div> */}
                                        </>
                                    }
                                    {isAuth?<a className="dropdown-item pl-2" onClick={logout} >Logout</a>:<a className="dropdown-item pl-2" onClick={loginHandler}>Login</a>}
                                </div>
                            </li>
                        </ul>
                        {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>
                </nav>
            </header>
            {props.children}
        </>
    )
}
export default Navbar