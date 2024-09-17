import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { dataPointSchema } from "../schemas/schemas";
import style from "./sensorsStyle.css";
import { useEffect } from "react";

function EditDataPointForm({ data, sensor, onToggle, bglData, setBglData }) {

    function handleDeletePoint() {
        fetch(`${process.env.REACT_APP_API_URL}/data_points/${data.id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                res.json()
                const updatedBglData = bglData.filter(dataObj => dataObj.id !== data.id)
                setBglData(updatedBglData)
                onToggle()
            }
        })
    }

    const { values, setFieldValue, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            date_time: data.name,
            bgl: data.bgl,
            sensor_id: sensor.id,
            status_id: ""
        },
        validationSchema: dataPointSchema,
        onSubmit: (values) => {
            fetch(`${process.env.REACT_APP_API_URL}/data_points/${data.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        const updatedBglData = bglData.map(dataObj => dataObj.id === data.id
                            ? {...dataObj, bgl: data.bgl, date_time: data.date_time}
                            : dataObj
                        )
                        setBglData(updatedBglData)
                    })
                }
            })  
        }
    })

    function assignStatusId(bgl) {
        if (bgl < 49) {
            return 1
        } else if (bgl >= 49 && bgl <= 115) {
            return 2
        } else if (bgl > 115 && bgl <= 180) {
            return 3
        } else if (bgl > 180 && bgl <= 214) { 
            return 4
        } else {
            return 5
        }
    }

    useEffect(() => {
        if (values.bgl) {
            const statusId = assignStatusId(values.bgl);
            setFieldValue('status_id', statusId); 
        }
    }, [values.bgl, setFieldValue]);

    return(
        <div className="add-popup">
            <div className="popup-header">
                <h2>Update Data Point</h2>
                <button onClick={onToggle}>X</button>
            </div>
            <form className="datapoint-form" onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField']}>
                        <DateTimeField label="Date & Time" value={dayjs(values.date_time)} onChange={(newValue) => setFieldValue('date_time', newValue)} maxDate={dayjs()} />
                    </DemoContainer>
                </LocalizationProvider>

                <div>
                    <label for="bgl">BGL:  </label>
                    <input type="number" placeholder="BGL" name="bgl" value={values.bgl} onChange={handleChange} className={errors.bgl && touched.bgl ? 'input-error' : null} required />
                    {errors.bgl && touched.bgl && (<span className="error">{errors.bgl}</span>)}
                </div>

                <input type="hidden" name="status_id" value={values.status_id}/>

                <div className="edit-buttons">
                    <button className="add-data-button" type="submit">Update Data Point</button>
                    <button className="add-data-button" onClick={handleDeletePoint}>Delete Data Point</button>
                </div>
            </form>
        </div>
    )
}

export default EditDataPointForm;