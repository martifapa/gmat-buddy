import { setMessage } from "../../redux/slices/toast";
import { ACTIVE, FADE, HIDDEN } from "../constants";
import store from "../../redux/store";


export default function useToast() {
    
    const toast = (mood: string, message: string, timeout=3500) => {
        // Show message with desired mood
        store.dispatch(setMessage({
            status: ACTIVE,
            message,
            mood,
        }));
        // Trigger message delay, keeping message
        setTimeout(() => {
            store.dispatch(setMessage({
                status: FADE,
                message,
                mood,
            }));
        }, timeout);
        // Delete message & mood
        setTimeout(() => {
            store.dispatch(setMessage({
                status: HIDDEN,
                message: '',
                mood: '',
            }));
        }, timeout + 500); // Ensure fade effect has completed
    }

    return {
        toast,
    }
};