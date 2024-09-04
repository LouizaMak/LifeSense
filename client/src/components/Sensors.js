import React, { useEffect, useState } from "react";
import SensorDetailBox from "./SensorDetailBox";
import style from "./sensorsStyle.css";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function Sensors() {
    const [displaySensors, setDisplaySensors] = useState([])
    const [isLoading, setIsLoading] = useState("Loading...")
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        fetch("/sensors")
        .then(res => res.json())
        .then(sensors => {
            setIsLoading("")
            if (sensors.length > 0) {
                setDisplaySensors(sensors)
            } else {
                setIsEmpty(true)
            }
        })
    }, [])

    return (
        <>
            {isEmpty ?
                <div className="empty-sensors">
                    <h2>Data not found. Please sync your device to begin uploading.</h2>
                    <button>Sync Device</button>
                </div> :
                <div className="sensors-page">
                    <div className="device-panel">
                        {displaySensors.length > 0 ?
                        <>
                            <h2>Sensors Panel</h2> 
                            <p>Manufacturer: {displaySensors[0].manufacturer}</p>
                            <p>Model: {displaySensors[0].model}</p>
                            <p>Recommended Sensor Change: 2 Weeks</p>
                        </>
                        : isLoading}
                    </div>
                    <div className="sensors-container">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Date (Application-Removal)</TableCell>
                                        <TableCell align="left">Serial No.</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displaySensors.map(sensor => <SensorDetailBox key={sensor.id} sensor={sensor} />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            }
        </>
    )
}

export default Sensors;