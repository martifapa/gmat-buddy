import { Link } from "react-router-dom";
import { useAppSelector } from "../../../common/hooks/redux";
import QuestionFilters from "./QuestionFilters";


const QuestionList = () => {
    const questions = useAppSelector(state => state.questions.questionBank);

    return (
    <div className='flex-container'>
        <QuestionFilters />
        <div className="questionList">
            {questions.map(question => {
                return (<div key={question.id} className="questionPrompt">
                    <Link to={`question/${question.id}`}>{question.question}</Link>
                </div>);
            })}
        </div>
    </div>
    )
};


export default QuestionList;