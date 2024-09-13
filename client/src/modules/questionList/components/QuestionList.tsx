import { Link } from "react-router-dom";
import { useAppSelector } from "../../../common/hooks/redux";

const QuestionList = () => {
    const questions = useAppSelector(state => state.questions.questionBank);

    return (<div className="questionList">
        {questions.map(question => {
            const prompt = question.question.split('(A)')[0];
            return (<div key={question.id} className="questionPrompt">
                <Link to={`question/${question.id}`}>{prompt}</Link>
            </div>);
        })}
    </div>)
};


export default QuestionList;