import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Login from './components/Login';
import Navbar from './components/UI/navbar/Navbar';
import { AuthContext } from './context/AuthProvider';
import MenuPage from './components/menuPage/MenuPage';
import OrderPage from './components/ordersPage/OrderPage';

function App() {
    const {isAuth, userType } = useContext(AuthContext)
    console.log("App");
    return (
        <>
        <Navbar/>
        <Switch>
            <Route path="/home" ><Redirect to="/dashboard"/></Route>
            {isAuth && <Route path="/menu" component={MenuPage}/>}
            {isAuth ?
                <Route path="/login"><Redirect to="/dashboard"/></Route> 
                :
                <Route path="/login" component={Login}></Route>
            }
            {!isAuth && <Route path="/dashboard" ><Redirect to='/login'/></Route>}
            {isAuth && <Route path="/dashboard" component={Dashboard}/>}
            {isAuth && <Route path="/Orders" component={OrderPage}/>}
            <Route exact path="/"><Redirect to="/dashboard"/></Route>
        </Switch>
        </>
    )
}
export default App