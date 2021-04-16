import React, { useState, useEffect } from "react";

export default function CategoryList(props) {
    const timestamps = (date) => {
        const d = new Date(date * 1000);
        return d.getDate() + '/' + ((d.getMonth()+1)) + '/' + d.getFullYear();
    }
    return (
        <div className="category_list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.categories.map((category) => (
                        <tr>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{timestamps(category.created_at)}</td>
                            <td>
                                <button type="button" onClick={() => props.show(category.id)}>show</button>
                                <button type="button" onClick={() => props.edit(category.id)}>edit</button>
                                <button type="button" onClick={() => props.remove(category.id)}>remove</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );
}