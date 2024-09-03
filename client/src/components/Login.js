import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { AppContext } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import style from './loginStyle.css';

function Login() {
    const { setCurrentUser } = useContext(AppContext)
    const navigate = useNavigate();
    const [invalidUser, setInvalidUser] = useState(false)

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch("/login", {
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
                } else {
                    setInvalidUser(true);
                }
            })
        }
    })

    function handleSignUpClick(event) {
        navigate(`/signup`)
    }

    function handleXClick(event) {
        setInvalidUser(false)
    }

    return(
        <>
            <div className="block">
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1>LIFESENSE</h1>
                        <p className="welcome">Welcome to LifeSense</p>

                        <input type="text" placeholder="Username" name="username" value={values.username} onChange={handleChange} className={errors.username && touched.username ? 'input-error' : null} required/>
                        {errors.username && touched.username && (<span className="error">{errors.username}</span>)}

                        <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} className={errors.password && touched.password ? 'input-error' : null} required/>
                        {errors.password && touched.password && (<span className="error">{errors.password}</span>)}
                        
                        <p className="password">Forgot Password?</p>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="signup-container">
                    <h2>New to LifeSense?</h2>
                    <p>Sign up now and join our LifeSense family.</p>
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </div>
            </div>
            {invalidUser ? 
                <div className="invalid-block">
                    <p>Invalid username and password.</p>
                    <span onClick={handleXClick}>X</span>
                </div>
            : ""}
        </>
    )
}

export default Login;