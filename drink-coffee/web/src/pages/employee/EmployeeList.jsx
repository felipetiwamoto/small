import React, { useState, useEffect } from "react";

export default function EmployeeList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth()+1)) + '/' + d.getFullYear();
    }
    return (
        <div className="employee_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.map((employee) => (
                        <tr>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{timestamps(employee.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(employee.id)}>show</button>
                                <button type="button" onClick={() => props.edit(employee.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(employee.id)}>remove</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );
}