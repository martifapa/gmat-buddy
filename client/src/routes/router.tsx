import { createBrowserRouter } from "react-router-dom";

import Root from "../components/Root";
import QuestionDetail from "../components/QuestionDetail";
import CustomQuestion from "../components/CustomQuestion";
import QuestionList from "../components/QuestionList";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <QuestionList />
            },
            {
                path: 'question/:id',
                element: <QuestionDetail />
            },
            {
                path: 'custom',
                element: <CustomQuestion />
            }
        ],
    }
]);

export default router;