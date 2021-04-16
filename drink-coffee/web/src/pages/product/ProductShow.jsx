import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductShow(props) {
    const [product, setProduct] = useState({});
    useEffect(() => {
        setProduct(props.products.find((c) => (c.id === props.showingId)));
    }, [props.showingId])

    return (
        <div className="product_show">
            {product.id}<br/>
            {product.name}<br/>
            <br/>
            <button type="button" onClick={() => props.edit(product.id)}>edit</button>
            <button type="button" onClick={() => props.remove(product.id)}>remove</button>
        </div>
    );
}