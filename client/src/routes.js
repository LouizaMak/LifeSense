import React from 'react';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/profile",
                element: <Profile />
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