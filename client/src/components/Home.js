import React from 'react';
import familyTrip from "../images/family_trip.jpg";
import girlStretching from "../images/girl_stretching.png";
import womanSmiling from "../images/woman_smiling.png";
import dataImage from "../images/data_image.jpg";
import style from './loginStyle.css';

function Home() {
    return(
        <>
            <div className="image-banner">
                <img src={familyTrip} alt="family on a trip"/>  
                <img src={girlStretching} alt="girl stretching her arms"/>  
                <div className="overlay-text">
                    <h1>LIFESENSE</h1>
                    <div className="slogan">
                        <p>Take Control of Your Health</p>
                        <p>Reclaim Your Life</p>
                        <p>Empower Your Journey</p>
                        <p>LifeSense is Here to Help</p>
                    </div>
                </div>
            </div>
            <div className="panel-container">
                <div className="panel-1">
                    <div className="welcome-text">
                        <h1>Welcome to your new HQ</h1>
                        <p>Getting ahead of your diabetes can be hard, complicated, and time-consuming. That's why we made LifeSense - a tracker with all the fundamentals and data analysis powered by OpenAI.</p>
                    </div>
                    <div className="woman-smiling-image">
                        <img src={womanSmiling} alt="professional woman smiling"/>
                    </div>
                </div>
                <div className="panel-2">
                    <div className="data-image">
                        <img src={dataImage} alt="data image"/>
                    </div>
                    <div className="ai-text">
                        <h1>AI Assistance</h1>
                        <p>We're empowering health using AI-driven insights for smarter, personalized medical guidance in the comfort of your own home.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home