import familyTrip from "../images/family_trip.jpg";
import girlStretching from "../images/girl_stretching.png";
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
        </>
    )
}

export default Home