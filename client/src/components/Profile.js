import { AppContext } from "./AppProvider";
import React, { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";
import style from "./profileStyle.css"
import Avatar from '@mui/material/Avatar';

function Profile() {
    const { currentUser } = useContext(AppContext)
    const [isEditing, setIsEditing] = useState(false)

    function handleToggleForm(e) {
        setIsEditing(!isEditing)
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
      
        return color;
      }

    function stringAvatar(name, additionalSx = {}) {
        return {
          sx: {
            ...additionalSx,
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    if (!currentUser) {
        return <div>Loading...</div>
    }

    return(
        <>
            <div className="profile-block">
                <div className="profile-intro">
                    <div className="image-button">
                        <Avatar {...stringAvatar(`${currentUser.first_name} ${currentUser.last_name}`, { width: 200, height: 200, fontSize: '90px' })} />
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