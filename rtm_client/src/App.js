import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import Navbar from './components/UI/navbar/Navbar';
import { userTypes } from './Constants';
import { AuthContext } from './context/AuthProvider';
import TableDataProvicer from './context/TableDataProvider';

function App() {
    const {isAuth, userType } = useContext(AuthContext)
    console.log("App");
    return (
        <>
        <Navbar/>
        <Switch>
            {isAuth ?
                <Route path="/login"><Redirect to="/dashboard"/></Route> 
                :
                <Route path="/login" component={Login}></Route>
            }
            {!isAuth && <Route path="/dashboard" ><Redirect to='/login'/></Route>}
            {isAuth && <Route path="/dashboard" component={Dashboard}/>}
            <Route exact path="/"><Redirect to="/login"/></Route>
        </Switch>
        </>
    )
}
export default App