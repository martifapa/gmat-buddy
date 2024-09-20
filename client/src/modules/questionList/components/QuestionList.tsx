import { useAppSelector } from "../../../common/hooks/redux";
import QuestionFilters from "./QuestionFilters";
import { useState } from "react";
import QuestionListItem from "./QuestionListItem";

import styles from '../styles/QuestionList.module.css';
import ReadingQuestionListItem from "./ReadingQuestionListItem";


const QuestionList = () => {
    const questions = useAppSelector(state => state.questions.questionBank);

    // State to store selected filters
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const filteredQuestions = questions.filter(question => {
        const readingMatch = selectedType ? selectedType.toLowerCase().includes('reading') : true;
       
        let difficultyMatch = true;
        if ('difficulty' in question) {
            difficultyMatch = selectedDifficulty ? question.difficulty === selectedDifficulty : true;
        }

        return readingMatch && difficultyMatch;
    });

    return (
    <div className={styles['flex-container']}>
        <QuestionFilters
            activeType={selectedType}
            activeDifficulty={selectedDifficulty}
            setSelectedType={setSelectedType}
            setSelectedDifficulty={setSelectedDifficulty}
        />
        <div className={styles['question-list']}>
            {filteredQuestions.map(question => {
                if ('text' in question) {
                    return <ReadingQuestionListItem
                        key={`r-${question.id}`}
                        id={question.id}
                        text={question.text}
                        questions={question.questions}
                    />
                }
                return <QuestionListItem
                    key={question.id}
                    id={question.id}
                    question={question.question}
                    difficulty={question.difficulty}
                />;
            })}
        </div>
    </div>
    )
};


export default QuestionList;