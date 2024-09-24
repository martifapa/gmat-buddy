import { setMessage } from "../redux/slices/toast";
import store from "../redux/store";
import { ACTIVE, FADE, HIDDEN } from "./constants";


// TOAST MESSAGES
export const showToastMessage = async (message: string, mood: string='') => {
    // Show message with correspondent mood
    store.dispatch(setMessage({ message, mood, status: ACTIVE }));
    setTimeout(() => { // Trigger fading after delay, keeping message
        store.dispatch(setMessage({ message, mood, status: FADE }));
    }, 3000);
    setTimeout(() => { // Set message & mood to ''
        store.dispatch(setMessage({ message: '', mood: '', status: HIDDEN }));
    }, 3500);
};

// UI
export const setClassNames = (id: number, selected: number, correct: number ) => {
    if (correct !== -1) { // Question already solved
        if (correct === id) {
            return 'correct';
        } else if (correct !== id && id === selected) {
            return 'incorrect';
        }
    } else { // Question not solved yet
        if (id === selected) {
            return 'selected';
        }
    }
    return ''; // No class applies
};

// JWT TOKEN
export const authHeader = () => {
    const token = store.getState().auth.token;
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
};