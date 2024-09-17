import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";

import style from "../styles/NavBar.module.css";


const Navbar = () => {
    const [toggleState, { toggle }] = useToggle();

    return (<div className={style.navbar}>
        <p className={style.logo}><Link to="/"><span>GMAT</span> assistant</Link></p>
        <ul className={style.navigation}>
            <li><Link to="/">List</Link></li>
            <li><Link to="custom">Custom</Link></li>
            <li className={style.profile} onClick={toggle}>
                <img src="/avatar.svg" alt="Avatar icon" className={style['profile-icon']} />
                {toggleState && (
                    <div className={style['profile-dropdown']}>
                        <div className={style['dropdown-content']}>
                            <Link to="login">
                                <img src="/logout.svg" alt="Log out icon" />
                                <p>Log out</p>
                            </Link>
                            <Link to="settings">
                                <img src="/settings.svg" alt="Settings icon" />
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