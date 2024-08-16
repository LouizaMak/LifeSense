import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";

function Login() {
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
                    res.json().then(user => console.log(user))
                }
            })
        }
    })

    return(
        <form onSubmit={handleSubmit}>
            <h2>Member Login</h2>

            <input type="text" placeholder ="Username" name="username" value={values.username} onChange={handleChange} required/>

            <input type="text" placeholder ="Password" name="password" value={values.password} onChange={handleChange} required/>

            <button type="submit">Login</button>
        </form>
    )
}

export default Login;