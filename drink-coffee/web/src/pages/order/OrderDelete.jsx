import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OrderDelete(props) {
    const [order, setOrder] = useState({});
    useEffect(() => {
        setOrder(props.orders.find((c) => (c.id === props.removingId)));
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/order/delete/${order.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getOrders();
        props.setRoute("list");
    }

    return (
        <div className="order_delete">
            Are you sure you wanna remove <strong>{order.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}