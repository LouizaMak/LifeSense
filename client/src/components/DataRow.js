function DataRow({ data }) {
    return(
        <div>
            <p>{data.date_time}</p>
            <p>BGL (mg/dL): {data.bgl}</p>
        </div>
    )
}

export default DataRow;