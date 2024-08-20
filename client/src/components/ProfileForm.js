import { useContext } from "react"
import { AppContext } from "./AppContext"
import { useFormik } from "formik"
import { loginSchema } from "../schemas/schemas"

function ProfileForm({ onToggleForm }) {
    const { currentUser, setCurrentUser } = useContext(AppContext)

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: currentUser.username,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            gender: currentUser.gender,
            age: currentUser.age,
        },
        // validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch(`http://127.0.0.1:5555/profile`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => res.json())
            .then(editedUser => setCurrentUser(editedUser))
            onToggleForm()
        }
    })

    return (
        <div className="form-popup" id="profileForm">
            <h2>Edit Profile</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <input type="text" placeholder ="First Name" name="first_name" value={values.first_name} onChange={handleChange} required/>

                <input type="text" placeholder ="Last Name" name="last_name" value={values.last_name} onChange={handleChange} required/>
            
                <input type="radio" id="f" name="gender" value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                <label for="f">Female</label>

                <input type="radio" id="m" name="gender" value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                <label for="m">Male</label>

                <input type="radio" id="pnta" name="gender" value="PNTA" onChange={handleChange} required/>
                <label for="pnta">Prefer Not To Answer</label>

                <input type="number" placeholder ="Age" name="age" value={values.age} onChange={handleChange} required/>

                <button type="submit">Confirm</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    )

}

export default ProfileForm;