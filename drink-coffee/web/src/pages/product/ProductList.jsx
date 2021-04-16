import React, { useState, useEffect } from "react";

export default function ProductList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth() + 1)) + '/' + d.getFullYear();
    }
    return (
        <div className="product_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((product) => (
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.category.name}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.amount}</td>
                            <td>{timestamps(product.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(product.id)}>show</button>
                                <button type="button" onClick={() => props.edit(product.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(product.id)}>remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}