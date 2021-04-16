import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import DashboardList from "./DashboardList";
import DashboardAdd from "./DashboardAdd";
import DashboardShow from "./DashboardShow";
import DashboardEdit from "./DashboardEdit";
import DashboardDelete from "./DashboardDelete";

export default function DashboardIndex(props) {
    const [route, setRoute] = useState("list");
    const [dashboards, setDashboards] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getDashboards = async () => {
        const res = await fetch(`http://localhost:8080/api/dashboard`)
            .then((res) => (res.json())).then((res) => (res));

        setDashboards(res);
    }

    const show = (id) => {
        setShowingId(id);
        return setRoute("show");
    }
    const edit = (id) => {
        setEditingId(id);
        return setRoute("edit");
    }
    const remove = (id) => {
        setRemovingId(id);
        return setRoute("remove");
    }

    const clonedProps = {
        getDashboards,
        route, setRoute,
        dashboards, setDashboards,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    useEffect(() => { getDashboards(); }, []);

    return (
        <div className="dashboard_index">
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <DashboardList {...clonedProps} />}
            {route === "new" && <DashboardAdd {...clonedProps} />}
            {route === "show" && <DashboardShow {...clonedProps} />}
            {route === "edit" && <DashboardEdit {...clonedProps} />}
            {route === "remove" && <DashboardDelete {...clonedProps} />}
        </div>
    );
}