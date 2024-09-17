import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('user_id');
    console.log(storedUserId)

    if(storedUserId) {
      fetch(`${process.env.REACT_APP_API_URL}/check_session`, {
        method: 'GET',
        credentails: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': storedUserId,
        }
      })
      .then(res => {
        if (res.status === 200) {
          res.json().then(user => setCurrentUser(user))
        }
      })
    }
    
}, [])

    return (
      <AppContext.Provider value={{currentUser, setCurrentUser}}>
          {children}
      </AppContext.Provider>
    );
};

export { AppContext, AppProvider };