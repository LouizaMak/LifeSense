import { AppContext } from "./AppContext"
import { useContext } from "react";

function Profile() {
    const { currentUser } = useContext(AppContext)

    return(
        <>
            <h1>[Pic Here]</h1>
            <button>Upload</button>
            <h1>{currentUser.username}</h1>
            <h2>Joined: {currentUser.date_joined.slice(0,10)}</h2>
            <p>Age: {currentUser.age}</p>
            <p>Gender: {currentUser.gender}</p>
            <button>Settings</button>
        </>
    )
}

export default Profile;