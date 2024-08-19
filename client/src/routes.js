import React from 'react';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';

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
    }
]

export default routes;