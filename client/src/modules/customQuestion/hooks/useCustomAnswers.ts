import React from "react";
import { useState } from "react";


export default function useCustomAnswers() {
    const [newAnswer, setNewAnswer] = useState('');
    const [answers, setAnswers] = useState<string[]>([]);

    const handleChangeNewQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setNewAnswer(event.target.value);
    }

    const handleAddAnswer = () => {
        if (newAnswer.length > 0 && answers.length <= 4) {
            setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
        }
        setNewAnswer('');
    }

    const handleDeleteAnswer = (id: number) => {
        setAnswers(prevAnswers => prevAnswers.filter((a, idx) => idx !== id));
    }

    return ({
        answers,
        newAnswer,
        setNewAnswer: handleChangeNewQuestion,
        addAnswer: handleAddAnswer,
        deleteAnswer: handleDeleteAnswer,
    })
};