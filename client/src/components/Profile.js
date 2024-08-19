import { AppContext } from "./AppContext"
import { useContext } from "react";

function Profile() {
    const { currentUser } = useContext(AppContext)

    return(
        <h1>{currentUser}'s Page</h1>
    )
}

export default Profile;