import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import "../Components/Styling/Sidebar.css"
import { isLogOut } from '../Redux/auth/action';

const Sidebar = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth)
    const userData = useSelector(state => state.auth.userData)
    const todo = useSelector(state => state.app.todo)

    const all = todo.length
    const temp = [...todo];
    const personal = temp.filter(item => item.personal).length;
    const official = temp.filter(item => item.official).length;
    const other = temp.filter(item => item.other).length;
    // console.log(personal, official, other)

    const handleLogOut = () => {
        const action = isLogOut();
        dispatch(action)
    }
    return (
        <div className="sidebar">
            <div className="user">
                {auth && <i class="fas fa-user-circle"></i>}
                <div className="profile">
                    <div>{ userData.name }</div>
                    <div>{ userData.email }</div>
                    <div>{ userData.description }</div>
                </div>
            </div>
            <div className="midSidebar">
                <Link className="link" to="/all">
                    {all !== 0 && auth && <div className="count">{ all }</div>}
                    <i class="far fa-list-alt"></i>
                    <div className="hiddenText">All</div>
                </Link>
                <Link className="link" to="/persional">
                    {personal !== 0 && auth && <div className="count">{ personal }</div>}
                    <i class="fas fa-user-clock"></i>
                    <div className="hiddenText">Personal</div>
                </Link>
                <Link className="link" to="/official">
                    {official !== 0 && auth && <div className="count">{ official }</div>}
                    <i class="fas fa-briefcase"></i>
                    <div className="hiddenText">Official</div>
                </Link>
                <Link className="link" to="/other">
                    {other !== 0 && auth && <div className="count">{ other }</div>}
                    <i class="fas fa-feather-alt"></i>
                    <div className="hiddenText">Other</div>
                </Link>
            </div>
            {auth && <div className="signOut link">
                <i class="fas fa-sign-out-alt"></i>
                <div className="hiddenText" onClick={handleLogOut}>Log Out</div>
            </div>}
        </div>
    )
}

export default Sidebar
