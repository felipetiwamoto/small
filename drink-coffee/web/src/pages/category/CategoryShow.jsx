import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CategoryShow(props) {
    const [category, setCategory] = useState({});
    useEffect(() => {
        setCategory(props.categories.find((c) => (c.id === props.showingId)));
    }, [props.showingId])

    return (
        <div className="category_show">
            {category.id}<br/>
            {category.name}<br/>
            <br/>
            <button type="button" onClick={() => props.edit(category.id)}>edit</button>
            <button type="button" onClick={() => props.remove(category.id)}>remove</button>
        </div>
    );
}