import React, { useState, useEffect } from "react";

export default function ClientList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth()+1)) + '/' + d.getFullYear();
    }
    return (
        <div className="client_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.clients.map((client) => (
                        <tr>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{timestamps(client.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(client.id)}>show</button>
                                <button type="button" onClick={() => props.edit(client.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(client.id)}>remove</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );
}