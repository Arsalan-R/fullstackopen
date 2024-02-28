import { Link } from "react-router-dom"

const NotExist = () => {
    return (
        <div>Sorry, the page you are looking for does not exist
        <div><Link to={'/'} ><button>Go back to homepage</button></Link></div>
        </div>
    )
}

export default NotExist