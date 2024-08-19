import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";

function NavBar() {
    const { currentUser, setCurrentUser } = useContext(AppContext)

    function handleLogoutClick() {
        fetch("http://127.0.0.1:5555/logout", {
            method: "DELETE" 
        })
        .then(res => {
          if (res.ok) {
            setCurrentUser(null);
          }
        });
    }

    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {currentUser ? (
                <button onClick={handleLogoutClick}>Logout</button>
                ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </>
                )}
            </div>
        </nav>
    )
}

export default NavBar;