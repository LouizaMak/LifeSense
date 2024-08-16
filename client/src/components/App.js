import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider } from './AppContext';
import NavBar from './NavBar';

function App() {

    return (
        <AppProvider>
            <NavBar />
            <Outlet />
        </AppProvider>
    )
}

export default App;