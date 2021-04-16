import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardDelete(props) {
    const [dashboard, setDashboard] = useState({});
    useEffect(() => {
        setDashboard(props.dashboards.find((c) => (c.id === props.removingId)));
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/dashboard/delete/${dashboard.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getDashboards();
        props.setRoute("list");
    }

    return (
        <div className="dashboard_delete">
            Are you sure you wanna remove <strong>{dashboard.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}