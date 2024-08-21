import DataRow from "./DataRow";

function StatusCard({ status }) {
    const datapointsArray = status.datapoints
    const sortedData = datapointsArray.sort((a, b) => new Date(b.date_time) - new Date(a.date_time)).slice(0, 3);

    return(
        <> 
            <h2>{status.severity} ({status.min} - {status.max} mg/dL)</h2>
            {sortedData.map(data => <DataRow key={data.id} data={data}/>)}
        </>
    )
}

export default StatusCard;