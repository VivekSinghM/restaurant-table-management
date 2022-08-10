import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/UI/navbar/Navbar';
import { AuthContext } from './context/AuthProvider';

function App() {
    const {isAuth} = useContext(AuthContext)
    console.log("App");
    return (
        <>
        <Navbar/>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/"><Redirect to="/login"/></Route>
        </Switch>
        </>
    )
}
export default App