import React, { createContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    const contextValue = {};

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };