import { Link } from "react-router-dom";

const Menu = ({ user, logout, username }) => {

    return (
        <div className="menu">
            <Link to={'/blogs'} className="menuItem" >Blogs</Link>
            <Link to={'/users'} className="menuItem" >Users</Link>
            {user ? ( <span> {username} is logged in <button onClick={logout}>Logout</button> </span> )
            : <Link to={'/login'} >Log in</Link> }
        </div>
    )
}

export default Menu