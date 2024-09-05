import React, { useContext, useState } from "react";
import style from "./profileStyle.css"
import ToggleButton from '@mui/material/ToggleButton';
import { FaCheck } from "react-icons/fa";
import { grey } from '@mui/material/colors';

function Settings({ onToggleForm, aiAnalysisEnabled, setAiAnalysisEnabled }) {
    
    const primary = grey[50]

    return (
        <div className="settings-modal">
            <h1>Settings</h1>
            <div className="ai-toggle">
                <ToggleButton
                value="check"
                selected={aiAnalysisEnabled}
                color="primary"
                onChange={() => {
                    setAiAnalysisEnabled(!aiAnalysisEnabled);
                }}
                >
                    <FaCheck />
                </ToggleButton>
                {aiAnalysisEnabled ? <p>AI Analysis ON</p> : <p>AI Analysis OFF</p>}
            </div>
            <button className="cancel-button" onClick={onToggleForm}>Cancel</button>
        </div>
    )
}

export default Settings;