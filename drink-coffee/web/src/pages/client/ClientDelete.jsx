import React, { useState, useEffect } from "react";

export default function ClientDelete(props) {
    const [client, setClient] = useState({});
    useEffect(() => {
        setClient(props.clients.find((c) => (c.id === props.removingId)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/client/delete/${client.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getClients();
        props.setRoute("list");
    }

    return (
        <div className="client_delete">
            Are you sure you wanna remove <strong>{client.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}