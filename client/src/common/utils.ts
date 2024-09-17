import { setMessage } from "../redux/slices/toast";
import store from "../redux/store";
import { ACTIVE, HIDDEN } from "./constants";


// TOAST MESSAGES
export const showToastMessage = async (message: string) => {
    store.dispatch(setMessage({ message, status: ACTIVE }));
    setTimeout(() => {
        store.dispatch(setMessage({ message: '', status: HIDDEN }));
    }, 3000);
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