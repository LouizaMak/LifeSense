import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import style from "./statusesStyle.css"

function Statuses() {
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/statuses`)
        .then(res => res.json())
        .then(statuses => setStatuses(statuses))
    }, [])
    
    return(
        <div className="statuses-container">
            <h1>Statuses</h1>
            <p>Most recent readings that fall under each status category.</p>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Status</TableCell>
                            <TableCell align="left">Range (mg/dL)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statuses.map(status => <StatusCard key={status.id} status={status}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Statuses;