import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OrderShow(props) {
    const [order, setOrder] = useState({});
    useEffect(() => {
        setOrder(props.orders.find((c) => (c.id === props.showingId)));
    }, [props.showingId])

    return (
        <div className="order_show">
            {order.id}<br/>
            {order.name}<br/>
            <br/>
            <button type="button" onClick={() => props.edit(order.id)}>edit</button>
            <button type="button" onClick={() => props.remove(order.id)}>remove</button>
        </div>
    );
}