import React, { useState, useEffect } from "react";

export default function DashboardList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth()+1)) + '/' + d.getFullYear();
    }
    return (
        <div className="dashboard_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dashboards.map((dashboard) => (
                        <tr>
                            <td>{dashboard.id}</td>
                            <td>{dashboard.name}</td>
                            <td>{timestamps(dashboard.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(dashboard.id)}>show</button>
                                <button type="button" onClick={() => props.edit(dashboard.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(dashboard.id)}>remove</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );
}