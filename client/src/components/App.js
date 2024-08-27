import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import NavBar from './NavBar';
import logo from "../images/lifesense_logo.png"

function App() {
    const { currentUser } = useContext(AppContext)

    return (
      <>
        <header className="site-header">
          <img src={logo} alt="lifesense logo" width="125"/>
          <NavBar />
        </header>
        <Outlet />
      </>
    )
}

export default App;