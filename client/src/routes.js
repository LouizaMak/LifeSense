import React from 'react';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Sensors from './components/Sensors';
import Statuses from './components/Statuses';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/sensors",
                element: <Sensors />
            },
            {
                path: "/statuses",
                element: <Statuses />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
]

export default routes;