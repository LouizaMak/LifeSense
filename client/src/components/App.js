import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import NavBar from './NavBar';

function App() {
    const { currentUser } = useContext(AppContext)

    return (
      <>
        <NavBar />
        {currentUser ? <Outlet /> : <Navigate to="/login"/>}
      </>
    )
}

export default App;