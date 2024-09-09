import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AIContext } from "./AIProvider";
import AddDataPointForm from "./AddDataPointForm";

function SensorDetails() {
    const [sensor, setSensor] = useState("")
    const { id } = useParams()
    const [bglData, setBglData] = useState([])
    const [aiAnalysis, setAiAnalysis] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [dataReady, setDataReady] = useState(false)
    const [dataObj, setDataObj] = useState({})
    const { aiAnalysisEnabled, setAiAnalysisEnabled } = useContext(AIContext)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        fetch(`/sensors/${id}`)
        .then(res => res.json())
        .then(sensor => {
            setSensor(sensor)
            generateDataArray(sensor.datapoints)
            handleAIData()
            analyzeData()
        })
    }, [id, dataReady])

    function generateDataArray(dataPoints) {
        const dataArray = dataPoints.map(datapoint => ({
            name: datapoint.date_time.slice(0, 10),
            BGL: datapoint.bgl
        }));
        
        dataArray.sort((a, b) => new Date(a.name) - new Date(b.name));
    
        setBglData(dataArray);
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

    function analyzeData() {
        const bglRawData = bglData.map(dataObj => dataObj.BGL).sort((a, b) => a - b)
        if (bglRawData.length > 0) {
            const averageBGL = Math.round(bglRawData.reduce((a, b) => a + b)/bglRawData.length)
            setDataObj({averageBGL: averageBGL, highBGL: bglRawData.pop(), lowBGL: bglRawData.shift()})
        } else {
            setDataReady(!dataReady)
        }
    }

    const renderLineChart = (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={bglData}>
                    <Line type="monotone" dataKey="BGL" stroke="#8884d8"/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{value: "Date", position: "insideBottom"}} height={50}/>
                    <YAxis tickCount={40} domain={[0,220]} label={{value: "BGL (mg/dL)", angle: -90, position: 'insideLeft'}} width={70}/>
                    <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )

    return(
        <>
            <div className="sensor-details">
                <div className="graph-ai-block">
                    {typeof sensor === 'object' ? 
                    <div className="graph-panel">
                        <h1>Sensor Data ({sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)})</h1>
                        {renderLineChart}
                        <div>
                            <button onClick={e => setIsAdding(!isAdding)}>Add</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    : 
                    <p>Loading...</p>}
                    {aiAnalysisEnabled && aiAnalysis ? 
                        <div className="ai-panel">
                            <h1>Analysis</h1>
                            <p>{aiAnalysis['recommendations']}</p>
                            <p>{aiAnalysis['lifestyle_changes']}</p>
                        </div>
                    :   <div className="ai-panel">
                            <p>AI Analysis is turned off. It can be turned on in user's settings.</p>
                        </div>
                    } 
                </div>
                <div className="analytics-panel">
                    <h1>Analytics</h1>
                    <h3>{sensor.model} {sensor.manufacturer}</h3>
                    <p>Average BGL: {dataObj.averageBGL}</p>
                    <p>Highest BGL: {dataObj.highBGL}</p>
                    <p>Lowest BGL: {dataObj.lowBGL}</p>
                </div>
            </div>
            {isAdding ? <AddDataPointForm sensor={sensor} onDataAdded={() => setDataReady(!dataReady)} /> : ""}
        </>
    )
}

export default SensorDetails;