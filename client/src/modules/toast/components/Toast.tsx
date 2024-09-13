import { ACTIVE } from "../../../common/constants";
import { useAppSelector } from "../../../common/hooks/redux";


const Toast = () => {
    const toast = useAppSelector(state => state.toast);

    return (<div className={`toast ${toast.status === ACTIVE ? 'active' : ''}`}>
        <p>{toast.message}</p>
    </div>);
};


export default Toast;