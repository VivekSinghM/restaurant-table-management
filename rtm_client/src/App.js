import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import { AuthContext } from './context/AuthProvider';

function App() {
    const {isAuth} = useContext(AuthContext)
    console.log("App");
    return (
        <>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/"><Redirect to="/login"/></Route>
        </Switch>
        </>
    )
}
export default App