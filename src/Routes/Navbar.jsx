import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../Components/Styling/Navbar.css'
import MenuListComposition from '../Components/ThemeMenu'
const Navbar = () => {
    const auth = useSelector(state => state.auth.auth)
    return (
        <div>
            <div className="navbar">
                <Link className="headers" to="/"><i class="fas fa-th-list"></i> </Link>
                <Link className="headers" to="/">Dashboard </Link>
                <Link className="headers" to="/create" >Create Task</Link>
                <div className="midHeaders">
                    {!auth && <Link className="headers" to = "/registration">Registration</Link>}
                    {!auth && <Link className="headers" to="/login">Login</Link>}
                    <div><MenuListComposition /></div>
                </div>
                
            </div>
            
            <div className="useless"></div>
        </div>
    )
}
export default Navbar
