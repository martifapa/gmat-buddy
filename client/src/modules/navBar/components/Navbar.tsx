import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";


const Navbar = () => {
    const [toggleState, { toggle }] = useToggle();

    return (<div className="navbar">
        <p className="logo"><Link to="/"><span>GMAT</span> assistant</Link></p>
        <ul className="navigation">
            <li><Link to="/">List</Link></li>
            <li><Link to="custom">Custom</Link></li>
            <li className="profile" onClick={toggle}>
                <img src="/public/avatar.svg" alt="Avatar icon" className="profile-icon" />
                {toggleState && (
                    <div className="profile-dropdown">
                        <div className="dropdown-content">
                            <Link to="login">
                                <img src="/public/logout.svg" alt="Log out icon" />
                                <p>Log out</p>
                            </Link>
                            <Link to="settings">
                                <img src="/public/settings.svg" alt="Settings icon" />
                                <p>Settings</p>
                            </Link>
                        </div>
                    </div>
                )}
            </li>
        </ul>
    </div>);
};


export default Navbar;