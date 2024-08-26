import DataRow from "./DataRow";
import { useNavigate } from "react-router-dom";

function SensorDetailBox({ sensor }) {
    const dataPreviewArray = sensor.datapoints.slice(0, 5)
    const navigate = useNavigate();

    function handleDetailsClick(event) {
        navigate(`/sensors/${sensor.id}`)
    }

    return(
        <div>
            <p>{sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)}</p>
            {dataPreviewArray.map(data => <DataRow key={data.id} data={data} />)}
            <button onClick={handleDetailsClick}>Details</button>
        </div>
    )
}

export default SensorDetailBox;