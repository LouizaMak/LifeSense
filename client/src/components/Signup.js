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
            password: "",
            first_name: "",
            last_name: "",
            gender: "",
            age: "",
            date_joined: new Date(Date.now())
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {setCurrentUser(user)})
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

                <input type="text" placeholder ="First Name" name="first_name" value={values.first_name} onChange={handleChange} required/>

                <input type="text" placeholder ="Last Name" name="last_name" value={values.last_name} onChange={handleChange} required/>

                <input type="radio" id="f" name="gender" value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                <label for="f">Female</label>

                <input type="radio" id="m" name="gender" value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                <label for="m">Male</label>

                <input type="radio" id="pnta" name="gender" value="PNTA" onChange={handleChange} required/>
                <label for="pnta">Prefer Not To Answer</label>

                <input type="number" placeholder ="Age" name="age" value={values.age} onChange={handleChange} required/>

                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default Signup;