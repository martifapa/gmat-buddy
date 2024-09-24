import { Link } from "react-router-dom";

import useToggle from "../hooks/useToggle";
import DropdownOption from "./DropdownOption";

import style from "../styles/NavBar.module.css";
import useAuth from "../../../common/hooks/useAuth";


const Navbar = () => {
    const [toggleState, { toggle }] = useToggle();
    const { isAuthenticated, logout } = useAuth();


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
                            {
                                isAuthenticated
                                ? <DropdownOption
                                    route="/login"
                                    imgSrc="/logout.svg"
                                    alt="Log out icon"
                                    label="Log out"
                                    onClick={logout}
                                />
                                : <DropdownOption
                                    route="/login"
                                    imgSrc="/login.svg"
                                    alt="Login icon"
                                    label="Login"
                                /> 
                            }
                            <DropdownOption route="/settings" imgSrc="/settings.svg" alt="Settings icon" label="Settings"/>
                        </div>
                    </div>
                )}
            </li>
        </ul>
    </div>);
};


export default Navbar;