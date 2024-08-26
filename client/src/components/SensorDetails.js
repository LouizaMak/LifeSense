import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SensorDetails() {
    const [sensor, setSensor] = useState("")
    const { id } = useParams()
    const [bglData, setBglData] = useState([])
    const [aiAnalysis, setAiAnalysis] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch(`/sensors/${id}`)
        .then(res => res.json())
        .then(sensor => {
            setSensor(sensor)
            setBglData(sensor.datapoints.map(datapoint => datapoint.bgl))
        })
        handleAIData()
    }, [id])

    function handleAIData() {
        setIsLoading(true)
        fetch(`/ai_analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bgl_data: bglData})
        })
        .then(res => res.json())
        .then(data => {
            setAiAnalysis(data)
            setIsLoading(false)
        })
    }

    return(
        <>
            <h1>Sensor Details</h1>
            {typeof sensor === 'object' ? 
            <>
                <h2>{sensor.model} {sensor.manufacturer} Hi</h2>
                <h3>{sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)}</h3>
                {bglData.map(bgl => <p>{bgl}</p>)}
            </>
            : 
            <p>Loading...</p>}

            {isLoading ? "Loading..." : ""}
            {aiAnalysis ? 
                <div>
                    <p>{aiAnalysis['recommendations']}</p>
                    <p>{aiAnalysis['lifestyle_changes']}</p>
                </div>
             : ""}
        </>
    )
}

export default SensorDetails;