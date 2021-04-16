import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ClientShow(props) {
    const [client, setClient] = useState({});
    useEffect(() => {
        setClient(props.clients.find((c) => (c.id === props.showingId)));
    }, [props.showingId])

    return (
        <div className="client_show">
            {client.id}<br/>
            {client.name}<br/>
            <br/>
            <button type="button" onClick={() => props.edit(client.id)}>edit</button>
            <button type="button" onClick={() => props.remove(client.id)}>remove</button>
        </div>
    );
}