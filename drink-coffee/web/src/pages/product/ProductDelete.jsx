import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductDelete(props) {
    const [product, setProduct] = useState({});
    useEffect(() => {
        setProduct(props.products.find((c) => (c.id === props.removingId)));
    }, [props.removingId])

    const confirm = async () => {
        const res = await fetch(`http://localhost:8080/api/product/delete/${product.id}`)
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            props.setFeedback("Something went wrong. Please, try again later.");
        }

        props.getProducts();
        props.setRoute("list");
    }

    return (
        <div className="product_delete">
            Are you sure you wanna remove <strong>{product.name}</strong> permanently?
            <button type="button" onClick={() => confirm()}>confirm</button>
            <button type="button" onClick={() => props.setRoute("list")}>cancel</button>
        </div>
    );
}