import React, { createContext, useState } from 'react';

const AIContext = createContext();

function AIProvider({ children }) {
    const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true)

    return (
        <AIContext.Provider value={{aiAnalysisEnabled, setAiAnalysisEnabled}}>
            {children}
        </AIContext.Provider>
    );
    };

    export { AIContext, AIProvider };