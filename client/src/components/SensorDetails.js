import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { AIContext } from "./AIProvider";
import AddDataPointForm from "./AddDataPointForm";
import EditDataPointForm from "./EditDataPointForm";

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
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/sensors/${id}`)
        .then(res => res.json())
        .then(sensor => {
            setSensor(sensor)
            handleAIData()
            analyzeData()
        })
        fetch(`${process.env.REACT_APP_API_URL}/data_points/${id}`)
        .then(res => res.json())
        .then(datapoints => generateDataArray(datapoints))
    }, [id, dataReady])

    function generateDataArray(dataPoints) {
        const dataArray = dataPoints.map(datapoint => ({
            id: datapoint.id,
            name: datapoint.date_time,
            BGL: datapoint.bgl,
            status_id: datapoint.status_id
        }));
        
        dataArray.sort((a, b) => new Date(a.name) - new Date(b.name));
    
        setBglData(dataArray);
    }

    function handleAIData() {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/ai_analyze`, {
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

    const renderCustomDot = (props) => {
        const { cx, cy, payload } = props;
        let dotColor = statusColorMap.find(status => status.id === payload.status_id)?.color || 'gray';
    
        return (
            <circle 
            cx={cx} cy={cy} r={8} 
            stroke="none" 
            fill={dotColor} 
            onClick={() => handleDotClick(payload)}
            style={{cursor: 'pointer', pointerEvents: 'auto'}}
            />
        );
    };

    const statusColorMap = [
        { id: 1, color: 'red', label: 'Low BGL' },
        { id: 2, color: 'green', label: 'Excellent BGL' },
        { id: 3, color: 'blue', label: 'Good BGL' },
        { id: 4, color: 'orange', label: 'Elevated BGL' },
        { id: 5, color: 'purple', label: 'Action Suggested BGL' },
    ];

    const renderCustomLegend = () => {
        return (
            <ul style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
                {statusColorMap.map((status) => (
                    <li key={status.id} style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: 12,
                                height: 12,
                                backgroundColor: status.color,
                                marginRight: 6,
                                borderRadius: '50%'
                            }}
                        />
                        <span>{status.label}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0];
            return (
                <div className="custom-tooltip" style={{ pointerEvents: 'none' }}>
                    <p>{`${name}: ${value}`}</p>
                </div>
            );
        }
        return null;
    };

    const renderLineChart = (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={bglData}>
                    <Line type="monotone" dataKey="BGL" stroke="#8884d8" dot={renderCustomDot}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{value: "Date", position: "insideBottom"}} height={50}/>
                    <YAxis tickCount={40} domain={[0,220]} label={{value: "BGL (mg/dL)", angle: -90, position: 'insideLeft'}} width={70}/>
                    <Tooltip content={renderCustomTooltip}/>
                    <Legend content={renderCustomLegend} />
            </LineChart>
        </ResponsiveContainer>
    )

    const handleDotClick = (data) => {
        setIsEditing(!isEditing)
        setEditData(data)
    };

    function toggleEditForm(event) {
        setIsEditing(!isEditing)
    }

    function toggleAddForm(event) {
        setIsAdding(!isAdding)
    }

    return(
        <>
            <div className="sensor-details">
                <div className="graph-ai-block">
                    {typeof sensor === 'object' ? 
                    <div className="graph-panel">
                        <h1>Sensor Data ({sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)})</h1>
                        {renderLineChart}
                        <div>
                            <button onClick={e => setIsAdding(!isAdding)}>Add Data Point</button>
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
            {isAdding ? <AddDataPointForm 
            sensor={sensor} 
            onDataAdded={() => setDataReady(!dataReady)} 
            onToggle={toggleAddForm}/> 
            : ""}
            {isEditing ? <EditDataPointForm 
            data={editData} 
            sensor={sensor} 
            onDataAdded={() => setDataReady(!dataReady)}
            onToggle={toggleEditForm}
            setBglData={setBglData}
            bglData={bglData}/> 
            : ""}
        </>
    )
}

export default SensorDetails;