import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
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