import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AppProvider } from './AppContext';
import routes from './routes';
import NavBar from './NavBar';

function App() {
    const routing = useRoutes(routes);

    return (
        <AppProvider>
            <NavBar />
            {routing}
        </AppProvider>
    )
}

export default App;