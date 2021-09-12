import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateTask from '../Components/CreateTask'
import Home from '../Components/Home'
import { Login } from '../Components/Login'
import Registration from '../Components/Registration'
import {Personal} from "../Components/Personal";
import { Official } from '../Components/Official'
import { Other } from '../Components/Other'
import Task from '../Components/Task'

const Rout = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/all">
                    <Home />
                </Route>
                <Route exact path="/persional">
                    <Personal />
                </Route>
                <Route exact path="/official">
                    <Official />
                </Route>
                <Route exact path="/other">
                    <Other />
                </Route>
                <Route exact path="/create">
                    <CreateTask />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/task/:id">
                    <Task />
                </Route>
                <Route exact path="/login">
                    <h3>404 Error: Page not found</h3>
                </Route>
            </Switch>
        </div>
    )
}

export default Rout
