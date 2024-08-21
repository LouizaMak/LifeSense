import DataRow from "./DataRow";

function SensorDetailBox({ sensor }) {
    const dataPreviewArray = sensor.datapoints.slice(0, 5)

    return(
        <div>
            <p>{sensor.application_date.slice(0,10)} - {sensor.removal_date.slice(0,10)}</p>
            {dataPreviewArray.map(data => <DataRow data={data} />)}
            <button>Details</button>
        </div>
    )
}

export default SensorDetailBox;