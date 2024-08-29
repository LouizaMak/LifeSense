import { AppContext } from "./AppContext"
import { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";
import profilePicture from "../images/default_picture.jpg";
import style from "./profileStyle.css"

function Profile() {
    const { currentUser } = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    function handleToggleForm(e) {
        setIsEditing(!isEditing)
    }

    return(
        <>
            <div className="profile-block">
                <div className="profile-intro">
                    <div className="image-button">
                        <img src={profilePicture} alt="default profile picture"/>
                        <button onClick={handleToggleForm}>Edit</button>
                    </div>
                    <div>
                        <h1>{currentUser.username}</h1>
                        <p>{currentUser.first_name} {currentUser.last_name}</p>
                    </div>
                </div>
                <div className="information-section">
                    <h2>Joined: {currentUser.date_joined.slice(0,10)}</h2>
                    <p>Age: {currentUser.age}</p>
                    <p>Gender: {currentUser.gender}</p>
                    <button>Settings</button>
                </div>
            </div>
            {isEditing ? <ProfileForm onToggleForm={handleToggleForm} /> : ""}
        </>
    )
}

export default Profile;