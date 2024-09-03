import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, YAxis, XAxis, ResponsiveContainer } from 'recharts';

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
            generateDataArray(sensor.datapoints)
            handleAIData()
        })
    }, [id])

    function generateDataArray(dataPoints) {
        console.log(dataPoints[0].date_time.slice(5,10))
        let i = 0
        const dataArray = []
        dataPoints.map(datapoint => dataArray.push({name: datapoint.date_time.slice(5,10), value: datapoint.bgl}))
        setBglData(dataArray)
        console.log(dataArray)
    }

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

    const renderLineChart = (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bglData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                    <XAxis dataKey="name" />
                    <YAxis tickCount={40} domain={[0,220]} />
            </LineChart>
        </ResponsiveContainer>
    )

    return(
        <div className="sensor-details">
            <div className="graph-ai-block">
                {typeof sensor === 'object' ? 
                <div className="graph-panel">
                    <h1>Sensor Details</h1>
                    <h2>{sensor.model} {sensor.manufacturer}</h2>
                    <h3>{sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)}</h3>
                    {renderLineChart}
                </div>
                : 
                <p>Loading...</p>}

                {isLoading ? "Loading..." : ""}
                {aiAnalysis ? 
                    <div className="ai-panel">
                        <h1>Analysis</h1>
                        <p>{aiAnalysis['recommendations']}</p>
                        <p>{aiAnalysis['lifestyle_changes']}</p>
                    </div>
                : ""}
            </div>
            <div className="analytics-panel">
                <h1>Analytics</h1>
                <p>Average BGL: </p>
                <p>Highest BGL:</p>
                <p>Lowest BGL:</p>
            </div>
        </div>
    )
}

export default SensorDetails;