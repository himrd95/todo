/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from './Login'
import { getUserData } from '../Redux/auth/action'
import { TodoList } from './TodoList'


const Home = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth)
    const token = useSelector(state => state.auth.token)
    const username = useSelector(state => state.auth.username)
    useEffect(() => {
        dispatch(getUserData(username, token))
    }, [dispatch])

    return (
        !auth ?
        <div>
            <h1>Please Log In</h1>
            <Login/>
        </div> : 
        <div>
            <TodoList/>
        </div>
    )
}

export default Home
