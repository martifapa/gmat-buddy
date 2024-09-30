import store from "../redux/store";


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


// UTILS
export const toCamelCase = (text: string) => {
    // [-_\s]+ one or more occurrences of "-", "_" or whitespace
    // (.)? one or zero characters following the previous pattern
    return text
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^./, str => str.toLowerCase());
};