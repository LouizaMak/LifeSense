import { AppContext } from "./AppContext"
import { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";

function Profile() {
    const { currentUser } = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    function handleToggleForm(e) {
        setIsEditing(!isEditing)
    }

    return(
        <>
            <div>
                <h1>[Pic Here]</h1>
                <button onClick={handleToggleForm}>Edit</button>
                <h1>{currentUser.username}</h1>
                <p>{currentUser.first_name} {currentUser.last_name}</p>
                <h2>Joined: {currentUser.date_joined.slice(0,10)}</h2>
                <p>Age: {currentUser.age}</p>
                <p>Gender: {currentUser.gender}</p>
                <button>Settings</button>
            </div>
            {isEditing ? <ProfileForm onToggleForm={handleToggleForm} /> : ""}
        </>
    )
}

export default Profile;