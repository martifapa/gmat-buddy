import { setMessage } from "../redux/slices/toast";
import store from "../redux/store";
import { ACTIVE, HIDDEN } from "./constants";

export const showToastMessage = async (message: string) => {
    store.dispatch(setMessage({ message, status: ACTIVE }));
    setTimeout(() => {
        store.dispatch(setMessage({ message: '', status: HIDDEN }));
    }, 3000);
};