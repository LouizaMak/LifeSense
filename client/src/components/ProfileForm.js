import { useContext } from "react"
import { AppContext } from "./AppContext"
import { useFormik } from "formik"
import { editProfileSchema } from "../schemas/schemas"

function ProfileForm({ onToggleForm }) {
    const { currentUser, setCurrentUser } = useContext(AppContext)

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            gender: currentUser.gender,
            age: currentUser.age,
        },
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            fetch(`/profile`, {
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
        <>
            <div className="form-popup" id="profileForm">
                <form className="edit-form" onSubmit={handleSubmit}>
                    <h1>Edit Profile</h1>
                    <div className="edit-text-fields">
                        <label for="first_name">First Name</label>
                        <input type="text" placeholder="First Name" name="first_name" value={values.first_name} onChange={handleChange} className={errors.first_name && touched.first_name ? 'input-error' : null} required/>
                        {errors.first_name && touched.first_name && (<span className="error">{errors.first_name}</span>)}

                        <label for="last_name">Last Name</label>
                        <input type="text" placeholder="Last Name" name="last_name" value={values.last_name} onChange={handleChange} className={errors.last_name && touched.last_name_name ? 'input-error' : null} required/>
                        {errors.last_name && touched.last_name && (<span className="error">{errors.last_name}</span>)}

                        <label for="age">Age</label>
                        <input type="number" placeholder="Age" name="age" value={values.age} onChange={handleChange} className={errors.age && touched.age ? 'input-error' : null} required/>
                        {errors.age && touched.age && (<span className="error">{errors.age}</span>)}
                    </div>

                    <div className="edit-radio-buttons">
                        <input type="radio" id="f" name="gender" value="F" onChange={handleChange} checked={values.gender === 'F'} required/>
                        <label for="f">Female</label>

                        <input type="radio" id="m" name="gender" value="M" onChange={handleChange} checked={values.gender === 'M'} required/>
                        <label for="m">Male</label>

                        <input type="radio" id="pnta" name="gender" value="PNTA" onChange={handleChange} required/>
                        <label for="pnta">Prefer Not To Answer</label>
                    </div>
                    <button type="submit">Confirm</button>
                    <button type="button" onClick={onToggleForm}>Cancel</button>
                </form>
        </div>
        </>
    )

}

export default ProfileForm;