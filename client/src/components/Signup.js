import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/schemas";
import { AppContext } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import style from "./signupStyle.css";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Signup() {
    const { setCurrentUser } = useContext(AppContext)
    const navigate = useNavigate();
    const [dateObj, setDateObj] = useState(dayjs(new Date()))

    const maxDate = dayjs()

    function handleDateChange(event) {
        values.birthday = `${event.$M+1}-${event.$D}-${event.$y}`
        setDateObj(event)
    }

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
            gender: "",
            birthday: "",
            age: "",
            date_joined: new Date(Date.now())
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            fetch("/signup", {
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
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="text-input">

                    <input type="text" placeholder="Username" name="username" value={values.username} onChange={handleChange} className={errors.username && touched.username ? 'input-error' : null} required/>
                    {errors.username && touched.username && (<span className="error">{errors.username}</span>)}

                    <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} className={errors.password && touched.password ? 'input-error' : null} required/>
                    {errors.password && touched.password && (<span className="error">{errors.password}</span>)}

                    <input type="text" placeholder="Email" name="email" value={values.email} onChange={handleChange} className={errors.email && touched.email ? 'input-error' : null} required/>
                    {errors.email && touched.email && (<span className="error">{errors.email}</span>)}

                    <input type="text" placeholder="First Name" name="first_name" value={values.first_name} onChange={handleChange} className={errors.first_name && touched.first_name ? 'input-error' : null} required/>
                    {errors.first_name && touched.first_name && (<span className="error">{errors.first_name}</span>)}

                    <input type="text" placeholder="Last Name" name="last_name" value={values.last_name} onChange={handleChange} className={errors.last_name && touched.last_name ? 'input-error' : null} required/>
                    {errors.last_name && touched.last_name && (<span className="error">{errors.last_name}</span>)}

                    <input type="number" placeholder="Age" name="age" value={values.age} onChange={handleChange} className={errors.age && touched.age ? 'input-error' : null} required/>
                    {errors.age && touched.age && (<span className="error">{errors.age}</span>)}

                    <p>Birthday</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateCalendar']}>
                            <DateCalendar label="Birthday" value={dateObj} onChange={handleDateChange} maxDate={maxDate}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div className="gender-radio">

                    <input type="radio" id="f" name="gender" value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                    <label htmlFor="f">Female</label>

                    <input type="radio" id="m" name="gender" value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                    <label htmlFor="m">Male</label>

                    <input type="radio" id="pnta" name="gender" value="PNTA" onChange={handleChange} required/>
                    <label htmlFor="pnta">Prefer Not To Answer</label>

                </div>

                <button className="signup-button" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;