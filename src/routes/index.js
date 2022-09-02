import { Navigate } from "react-router-dom";
import Todo from "@/pages/Todo/Todo.jsx";
import Home from "../pages/Home/Home.jsx";
import MakePlans from "../pages/MakePlans/MakePlans.jsx";
import MyDay from "../pages/MyDay/MyDay.jsx";
import Important from "../pages/Important/Important.jsx";
import DataChart from "../pages/DataChart/DataChart.jsx";
import ImportantPlans from "../pages/Important/ImportantPlans/ImportantPlans.jsx";
import ImportantDiary from "../pages/Important/ImportantDiary/ImportantDiary.jsx";
import WelcomePage from "@/pages/WelcomePage/WelcomePage.jsx";

const routes = [
    {
        path: '/todo',
        element: <Todo></Todo>,
        children: [
            {
                path: 'home',
                element: <Home></Home>
            },
            {
                path: 'makeplans',
                element: <MakePlans></MakePlans>
            },
            {
                path: 'myday',
                element: <MyDay></MyDay>
            },
            {
                path: 'important',
                element: <Important></Important>,
                children: [
                    {
                        path: 'importantplans',
                        element: <ImportantPlans></ImportantPlans>
                    },
                    {
                        path: 'importantdiary',
                        element: <ImportantDiary></ImportantDiary>
                    },
                    {
                        path: '/todo/important',
                        element: <Navigate to={'importantplans'} />
                    }
                ]
            },
            {
                path: 'datachart',
                element: <DataChart></DataChart>
            },
        ]
    },
    {
        path: '/welcomepage',
        element: <WelcomePage></WelcomePage>
    },
    {
        path: '/',
        element: <Navigate to={'/todo/home'} />
    }
]

export default routes;