import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, IconButton, TableCell, TableRow, Box, Typography, Table, TableHead, TableBody, tableCellClasses } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { styled } from '@mui/material/styles';
import style from "./sensorsStyle.css";

function SensorDetailBox({ sensor }) {
    const dataPreviewArray = sensor.datapoints.slice(0, 5)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    function handleDetailsClick(event) {
        navigate(`/sensors/${sensor.id}`)
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#0097B2",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

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
                                    <StyledTableCell>Date</StyledTableCell>
                                    <StyledTableCell>Time</StyledTableCell>
                                    <StyledTableCell align="right">BGL</StyledTableCell>
                                    <StyledTableCell align="right">Risk</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataPreviewArray.map(data => (
                                    <StyledTableRow key={data.id}>
                                        <TableCell component="th" scope="row">{data.date_time.slice(0,10)}</TableCell>
                                        <TableCell>{data.date_time.slice(10)}</TableCell>
                                        <TableCell align="right">{data.bgl}</TableCell>
                                        <TableCell align="right">{data.status_id}</TableCell>
                                    </StyledTableRow>
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