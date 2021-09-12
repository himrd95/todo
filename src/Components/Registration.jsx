import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create_account } from '../Redux/auth/action';
import { useHistory } from "react-router-dom";
import { TextField } from '@material-ui/core';
import "./Styling/Registration.css"

const user = {
    name: "",
    email: '',
    username: '',
    password: '',
    mobile: '',
    description: '',
}
const Registration = () => {
    const [details, setDetails] = useState(user);
    const dispatch = useDispatch();

    const regAuth = useSelector(state => state.auth.regAuth)
    console.log(regAuth)
    const history = useHistory();
    regAuth && history.push("/login")

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails({ ...details, [name]: value });
    }

    const { name, email, username, password, mobile, description } = details;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "" && email !== "" && username !== "" && password !== "" &&
        mobile !== "" && description !== "") {
            const action = create_account(details);
            dispatch(action)
            alert("Your account was successfully created")
        } else {
            alert('All fields are required');
        }
    }
    
    return ( 
        <div>
            <h3>Registration Form</h3>
            <form onSubmit={handleSubmit} className="regForm">
                <TextField label="Name" type="text" name="name"
                    placeholder="Name" value={name} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <TextField label="Email" type="email" name="email"
                    placeholder="Email" value={email} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <TextField label="Username" type="text" name='username'
                    placeholder="Username" value={username} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <TextField label="Password" type="password" name='password'
                    placeholder="Password" value={password} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <TextField label="Number" type="number" name='mobile'
                    placeholder="Mobile" value={mobile} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <TextField label="Description" type="text" name='description'
                    placeholder="Description" value={description} 
                    onChange={handleChange} variant="filled"
                />
                <br/>
                <input className="submit" type="submit"/>
            </form>
        </div>
    )
}

export default Registration
