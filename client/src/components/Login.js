import React, { useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import style from './style.css'

function Login() {
    const { setCurrentUser } = useContext(AppContext)
    const navigate = useNavigate();

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
                }
            })
        }
    })

    return(
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Member Login</h2>

                <input type="text" placeholder="Username" name="username" value={values.username} onChange={handleChange} className={errors.username && touched.username ? 'input-error' : null} required/>
                {errors.username && touched.username && (<span className="error">{errors.username}</span>)}

                <input type="text" placeholder="Password" name="password" value={values.password} onChange={handleChange} className={errors.password && touched.password ? 'input-error' : null} required/>
                {errors.password && touched.password && (<span className="error">{errors.password}</span>)}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;