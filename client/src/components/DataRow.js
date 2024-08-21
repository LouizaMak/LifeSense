function DataRow({ data }) {
    return(
        <div>
            <p>{data.date_time}</p>
            <p>BGL (mg/dL): {data.bgl} [{data.status.severity}]</p>
        </div>
    )
}

export default DataRow;