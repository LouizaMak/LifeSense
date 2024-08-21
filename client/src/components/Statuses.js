import { useEffect, useState } from "react";
import StatusCard from "./StatusCard";

function Statuses() {
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        fetch("/statuses")
        .then(res => res.json())
        .then(statuses => setStatuses(statuses))
    }, [])
    
    return(
        <>
            <h1>Statuses</h1>
            <p>Most recent readings that fall under each status category.</p>
            <div>
                {statuses.map(status => <StatusCard key={status.id} status={status}/>)}
            </div>
        </>
    )
}

export default Statuses;