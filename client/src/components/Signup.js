import React, { useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { AppContext } from "./AppContext";
import NavBar from "./NavBar";

function Signup() {
    const { setCurrentUser } = useContext(AppContext)

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
                    res.json().then(user => setCurrentUser(user))
                }
            })
        }
    })

    return(
        <>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>

                <input type="text" placeholder ="Username" name="username" value={values.username} onChange={handleChange} required/>

                <input type="text" placeholder ="Password" name="password" value={values.password} onChange={handleChange} required/>

                <input type="text" placeholder ="First Name" name="firstName" value={values.first_name} onChange={handleChange} required/>

                <input type="text" placeholder ="Last Name" name="lastName" value={values.last_name} onChange={handleChange} required/>

                <input type="radio" name="female" value={values.gender} onChange={handleChange} required/>
                <label for="female">Female</label>

                <input type="radio" name="male" value={values.gender} onChange={handleChange} required/>
                <label for="male">Male</label>

                <input type="radio" name="pnta" value={values.gender} onChange={handleChange} required/>
                <label for="pnta">Prefer Not To Answer</label>

                <input type="number" placeholder ="Age" name="age" value={values.age} onChange={handleChange} required/>

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Signup;