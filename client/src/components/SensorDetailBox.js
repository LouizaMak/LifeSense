import React, { useState } from "react";
import DataRow from "./DataRow";
import { useNavigate } from "react-router-dom";
import { Collapse, IconButton, TableCell, TableRow, Box, Typography, Table, TableHead, TableBody } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import style from "./sensorsStyle.css";

function SensorDetailBox({ sensor }) {
    const dataPreviewArray = sensor.datapoints.slice(0, 5)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    function handleDetailsClick(event) {
        navigate(`/sensors/${sensor.id}`)
    }

    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{sensor.application_date.slice(0, 10)} - {sensor.removal_date.slice(0,10)}</TableCell>
                <TableCell align="left">{sensor.serial}</TableCell>
                <TableCell>
                    <button className="details-button" onClick={handleDetailsClick}>Details</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}></Box>
                        <Typography variant="h6" gutterBottom component="div">
                            Data Preview
                        </Typography>
                        <Table size="small" aria-label="dataPoints">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell align="right">BGL</TableCell>
                                    <TableCell align="right">Risk</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataPreviewArray.map(data => (
                                    <TableRow key={data.id}>
                                        <TableCell component="th" scope="row">{data.date_time.slice(0,10)}</TableCell>
                                        <TableCell>{data.date_time}</TableCell>
                                        <TableCell align="right">{data.bgl}</TableCell>
                                        <TableCell align="right">{data.status_id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default SensorDetailBox;