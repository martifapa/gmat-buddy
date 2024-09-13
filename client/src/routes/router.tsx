import { createBrowserRouter } from "react-router-dom";

import Root from "../modules/Root";
import QuestionDetail from "../modules/questionList/components/QuestionDetail";
import CustomQuestion from "../modules/customQuestion/components/CustomQuestion";
import QuestionList from "../modules/questionList/components/QuestionList";
import Login from "../modules/login/components/Login";
import Register from "../modules/register/components/Register";
import Settings from "../modules/settings/components/Settings";


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
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ],
    }
]);

export default router;