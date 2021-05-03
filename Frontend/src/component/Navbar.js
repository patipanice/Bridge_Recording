import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Navbar.css';
export default function Navbar() {
    return (
        <nav>
           
            <ul> 
                <li> <Link to="/" className="link">HOME</Link> </li>
                <li> <Link to="/playing" className="link">PLAYING</Link> </li>
                <li> <Link to="/recording" className="link">RECORDING</Link> </li>
                <li> <Link to="/aboutme" className="link">ABOUT ME</Link></li>
            </ul>
        </nav>
    )
}
