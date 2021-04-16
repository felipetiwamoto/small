import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CategoryDelete(props) {
    const [category, setCategory] = useState({});
    useEffect(() => {
        setCategory(props.categories.find((c) => (c.id === props.removingId)));
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/category/delete/${category.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getCategories();
        props.setRoute("list");
    }

    return (
        <div className="category_delete">
            Are you sure you wanna remove <strong>{category.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}