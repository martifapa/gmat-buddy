import { useState } from "react";


export default function useCustomAnswers() {
    const [newAnswer, setNewAnswer] = useState('');
    const [answers, setAnswers] = useState<string[]>([]);

    const handleAddAnswer = () => {
        if (newAnswer.length > 0 && answers.length <= 4) {
            setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
        }
        setNewAnswer('');
    }

    const handleDeleteAnswer = (id: number) => {
        setAnswers(prevAnswers => prevAnswers.filter((_, idx) => idx !== id));
    }

    const handleClearAnswers = () => {
        setAnswers([]);
    }

    return ({
        answers,
        newAnswer,
        setNewAnswer,
        addAnswer: handleAddAnswer,
        deleteAnswer: handleDeleteAnswer,
        clearAnswers: handleClearAnswers,
    })
};