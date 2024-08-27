import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import logo from "../images/lifesense_logo.png"

function App() {

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