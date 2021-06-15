import React, { useState, useEffect } from "react";

export default function OrderShow(props) {
    const [order, setOrder] = useState({});
    useEffect(() => {
        setOrder(props.orders.find((c) => (c.id === props.showingId)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.showingId])

    return (
        <div className="order_show">
            {order.order_items && order.order_items.length > 0 && order.order_items.map((oi) => (
				<div className="product">
					Product: {oi.product.name}<br/>
					Added: {oi.added}<br/>
					Each price: $ {parseFloat(oi.each_price).toFixed(2)}<br/>
					Total: $ {parseFloat(oi.total).toFixed(2)}<br/>
					<br/>
				</div>
			))}
            <br/>
            <button type="button" onClick={() => props.edit(order.id)}>edit</button>
            <button type="button" onClick={() => props.remove(order.id)}>remove</button>
        </div>
    );
}