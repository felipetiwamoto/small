import React, { useState, useEffect } from "react";

import Menu from "./../../components/Menu";
import ClientList from "./ClientList";
import ClientAdd from "./ClientAdd";
import ClientShow from "./ClientShow";
import ClientEdit from "./ClientEdit";
import ClientDelete from "./ClientDelete";

export default function ClientIndex(props) {
    const [route, setRoute] = useState("list");
    const [clients, setClients] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getClients = async () => {
        const res = await fetch(`http://localhost:8080/api/client`)
            .then((res) => (res.json())).then((res) => (res));

        setClients(res);
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
        getClients,
        route, setRoute,
        clients, setClients,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    useEffect(() => { getClients(); }, []);

    return (
        <div className="client_index">
			<Menu />
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <ClientList {...clonedProps} />}
            {route === "new" && <ClientAdd {...clonedProps} />}
            {route === "show" && <ClientShow {...clonedProps} />}
            {route === "edit" && <ClientEdit {...clonedProps} />}
            {route === "remove" && <ClientDelete {...clonedProps} />}
        </div>
    );
}