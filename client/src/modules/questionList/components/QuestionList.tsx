import { Link } from "react-router-dom";
import { useAppSelector } from "../../../common/hooks/redux";
import QuestionFilters from "./QuestionFilters";
import { useState } from "react";


const QuestionList = () => {
    const questions = useAppSelector(state => state.questions.questionBank);

    // State to store selected filters
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const filteredQuestions = questions.filter(question => {
        const typeMatch = selectedType ? question.type === selectedType : true;
        const difficultyMatch = selectedDifficulty ? question.difficulty === selectedDifficulty : true;
        return typeMatch && difficultyMatch;
    });

    return (
    <div className='flex-container'>
        <QuestionFilters
            activeType={selectedType}
            activeDifficulty={selectedDifficulty}
            setSelectedType={setSelectedType}
            setSelectedDifficulty={setSelectedDifficulty}
        />
        <div className="questionList">
            {filteredQuestions.map(question => {
                return (<div key={question.id} className="questionPrompt">
                    <Link to={`question/${question.id}`}>{question.question}</Link>
                </div>);
            })}
        </div>
    </div>
    )
};


export default QuestionList;