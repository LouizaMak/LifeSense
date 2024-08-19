import React, { createContext } from 'react';
import { useEffect, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session")
    .then(res => {
      if (res.status === 200) {
        res.json().then(user => setCurrentUser(user))
      }
    })
}, [])

    return (
        <AppContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };