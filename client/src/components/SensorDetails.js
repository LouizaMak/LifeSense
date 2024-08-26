import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SensorDetails() {
    const [sensor, setSensor] = useState("")
    const {id} = useParams();

    useEffect(() => {
        fetch(`/sensors/${id}`)
        .then(res => res.json())
        .then(sensor => {
            setSensor(sensor)
        })
    }, [id])

    console.log(sensor.application_date)

    return(
        <>
            <h1>Sensor Details</h1>
            {typeof sensor === 'object' ? 
            <>
                <h2>{sensor.model} {sensor.manufacturer} Hi</h2>
                <h3>{sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)}</h3>
                {sensor.datapoints.map(datapoint => <p>{datapoint.bgl}</p>)}
            </>
            : 
            <p>Loading...</p>}

            <h2>AI Analysis goes here</h2>
        </>
    )
}

export default SensorDetails;