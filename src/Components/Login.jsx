/* eslint-disable no-lone-blocks */
import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../Redux/auth/action';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth)
    const history = useHistory();
    {auth && history.push("/")}

    const handleSubmit = e => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            const action = login(username, password);
            dispatch(action)
        } else {
            alert("All fields are required.")
        }
    }

    return (<>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} className="regForm">
            
            <TextField type="text"
                placeholder="Username..." value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <br />
            <TextField type="password"
                placeholder="Password..." value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <br />
            <input className="submit" type="submit"/>
        </form>
    </>)
}

export {Login}
