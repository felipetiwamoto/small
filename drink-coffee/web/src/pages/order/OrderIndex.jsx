import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import OrderShow from "./OrderShow";
import OrderEdit from "./OrderEdit";
import OrderDelete from "./OrderDelete";

export default function OrderIndex(props) {
    const [route, setRoute] = useState("list");
    const [orders, setOrders] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getOrders = async () => {
        const res = await fetch(`http://localhost:8080/api/order`)
            .then((res) => (res.json())).then((res) => (res));

        setOrders(res);
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
        getOrders,
        route, setRoute,
        orders, setOrders,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    useEffect(() => { getOrders(); }, []);

    return (
        <div className="order_index">
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <OrderList {...clonedProps} />}
            {route === "new" && <OrderAdd {...clonedProps} />}
            {route === "show" && <OrderShow {...clonedProps} />}
            {route === "edit" && <OrderEdit {...clonedProps} />}
            {route === "remove" && <OrderDelete {...clonedProps} />}
        </div>
    );
}