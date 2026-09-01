
import { useContext } from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'



const Navbar = (props) => {
    const{user}=useContext(UserContext)
    
    return (
        <>
            <div id='navbar'>
                <h1>@Notes.com</h1>
                <h3>{(!user) ? <Link to={props.nele.lnk}>{props.nele.nnm}</Link> : user.userName}</h3>
            </div>
        </>
    )
}

export default Navbar
