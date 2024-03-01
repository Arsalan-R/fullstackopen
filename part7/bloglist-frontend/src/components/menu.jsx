import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const FadeMenu = ({ user, logout, username }) => {


    return (
        <div className="menu">
            <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Link to={'/blogs'} className="menuItem" style={{ textDecoration: 'none' }} >Blogs</Link>
      </Button>
      <Button id="fade-button" >
        <Link to={'/users'} className="menuItem" style={{ textDecoration: 'none' }} >Users</Link>
      </Button>
            {user ? ( <span> {username} is logged in <Button id="fade-button" onClick={logout}>Logout</Button> </span> )
            :<Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
                <Link to={'/login'} style={{ textDecoration: 'none' }} >Log in</Link>
            </Button>
            }
        </div>
    )
}

export default FadeMenu
