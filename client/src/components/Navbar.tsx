import { Link } from "react-router-dom";


const Navbar = () => {
    return (<div className="navbar">
        <p className="logo"><span>GMAT</span> assistant</p>
        <ul className="navigation">
            <li><Link to="/">List</Link></li>
            <li><Link to="custom">Custom</Link></li>
        </ul>
    </div>);
};


export default Navbar;