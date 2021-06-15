import React from "react";
import { timestamps } from "./../../helper";

export default function ClientList(props) {
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
                    {props.clients.map((client, index) => (
                        <tr key={index}>
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