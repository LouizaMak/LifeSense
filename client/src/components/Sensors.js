import { useEffect, useState } from "react"
import SensorDetailBox from "./SensorDetailBox"

function Sensors() {
    const [displaySensors, setDisplaySensors] = useState([])

    useEffect(() => {
        fetch("/sensors")
        .then(res => res.json())
        .then(sensors => setDisplaySensors(sensors))
    }, [])

    return (
        <>
            {displaySensors.length > 0 ?
            <h1>{displaySensors[0].manufacturer} {displaySensors[0].model} Sensors</h1> 
            : <p>Loading</p>}
            <div className="sensor-boxes">
                {displaySensors.map(sensor => <SensorDetailBox key={sensor.id} sensor={sensor} />)} 
            </div>
        </>
    )
}

export default Sensors;