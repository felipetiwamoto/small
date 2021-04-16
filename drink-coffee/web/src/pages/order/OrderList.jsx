import React, { useState, useEffect } from "react";

export default function OrderList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth()+1)) + '/' + d.getFullYear();
    }
    return (
        <div className="order_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.orders.map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{timestamps(order.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(order.id)}>show</button>
                                <button type="button" onClick={() => props.edit(order.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(order.id)}>remove</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );
}