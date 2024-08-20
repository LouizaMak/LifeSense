import React, { useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { AppContext } from "./AppContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Login() {
    const { setCurrentUser } = useContext(AppContext)
    const navigate = useNavigate();

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(user => {
                        setCurrentUser(user);
                        navigate(`/profile`)
                    })
                }
            })
        }
    })

    return(
        <>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h2>Member Login</h2>

                <input type="text" placeholder ="Username" name="username" value={values.username} onChange={handleChange} required/>

                <input type="text" placeholder ="Password" name="password" value={values.password} onChange={handleChange} required/>

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;