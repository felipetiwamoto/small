import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import EmployeeList from "./EmployeeList";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeShow from "./EmployeeShow";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDelete from "./EmployeeDelete";

export default function EmployeeIndex(props) {
    const [route, setRoute] = useState("list");
    const [employees, setEmployees] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getEmployees = async () => {
        const res = await fetch(`http://localhost:8080/api/employee`)
            .then((res) => (res.json())).then((res) => (res));

        setEmployees(res);
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
        getEmployees,
        route, setRoute,
        employees, setEmployees,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    useEffect(() => { getEmployees(); }, []);

    return (
        <div className="employee_index">
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <EmployeeList {...clonedProps} />}
            {route === "new" && <EmployeeAdd {...clonedProps} />}
            {route === "show" && <EmployeeShow {...clonedProps} />}
            {route === "edit" && <EmployeeEdit {...clonedProps} />}
            {route === "remove" && <EmployeeDelete {...clonedProps} />}
        </div>
    );
}