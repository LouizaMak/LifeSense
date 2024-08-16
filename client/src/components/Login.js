import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        return event
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
        </form>
    )
}

export default Login;