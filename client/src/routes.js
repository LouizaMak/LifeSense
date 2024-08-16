import React from 'react';
import App from './components/App';
import Login from './components/Login';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]

export default routes;