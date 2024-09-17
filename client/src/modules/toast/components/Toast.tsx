import { ACTIVE } from "../../../common/constants";
import { useAppSelector } from "../../../common/hooks/redux";

import styles from '../styles/Toast.module.css';


const Toast = () => {
    const toast = useAppSelector(state => state.toast);

    return (<div className={`${styles.toast} ${toast.status === ACTIVE ? styles.active : ''}`}>
        <p>{toast.message}</p>
    </div>);
};


export default Toast;