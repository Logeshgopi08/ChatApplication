import MessagePage from "../components/MessagePage";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const { createBrowserRouter } = require("react-router-dom");
const { default: App } = require("../App");

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/register",
                element:<RegisterPage/>
            },
            {
                path:"/login",
                element:<LoginPage/>
            },
            {
                path:"",
                element:<Home/>,
                children:[
                    {
                        path:"/:userId",
                        element:<MessagePage/>
                    }
                ]
            }
        ]
    },
    
]);

export default appRouter;