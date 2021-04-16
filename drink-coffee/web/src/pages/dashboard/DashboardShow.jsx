import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardShow(props) {
    const [dashboard, setDashboard] = useState({});
    useEffect(() => {
        setDashboard(props.dashboards.find((c) => (c.id === props.showingId)));
    }, [props.showingId])

    return (
        <div className="dashboard_show">
            {dashboard.id}<br/>
            {dashboard.name}<br/>
            <br/>
            <button type="button" onClick={() => props.edit(dashboard.id)}>edit</button>
            <button type="button" onClick={() => props.remove(dashboard.id)}>remove</button>
        </div>
    );
}