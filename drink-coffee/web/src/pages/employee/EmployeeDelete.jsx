import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EmployeeDelete(props) {
    const [employee, setEmployee] = useState({});
    useEffect(() => {
        setEmployee(props.employees.find((c) => (c.id === props.removingId)));
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/employee/delete/${employee.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getEmployees();
        props.setRoute("list");
    }

    return (
        <div className="employee_delete">
            Are you sure you wanna remove <strong>{employee.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}