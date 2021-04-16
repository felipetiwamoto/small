import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";
import ProductShow from "./ProductShow";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";

export default function ProductIndex(props) {
    const [route, setRoute] = useState("list");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getCategories = async () => {
        const res = await fetch(`http://localhost:8080/api/category`)
            .then((res) => (res.json())).then((res) => (res));

        setCategories(res);
    }

    const getProducts = async () => {
        const res = await fetch(`http://localhost:8080/api/product`)
            .then((res) => (res.json())).then((res) => (res));

        setProducts(res);
    }

    const show = (id) => {
        setShowingId(id);
        return setRoute("show");
    }
    const edit = (id) => {
        setEditingId(id);
        return setRoute("edit");
    }
    const remove = (id) => {
        setRemovingId(id);
        return setRoute("remove");
    }

    useEffect(async () => {
        getProducts();
        getCategories();
    }, []);

    const clonedProps = {
        getProducts,
        route, setRoute,
        products, setProducts,
        categories, setCategories,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    return (
        <div className="product_index">
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <ProductList {...clonedProps} />}
            {route === "new" && <ProductAdd {...clonedProps} />}
            {route === "show" && <ProductShow {...clonedProps} />}
            {route === "edit" && <ProductEdit {...clonedProps} />}
            {route === "remove" && <ProductDelete {...clonedProps} />}
        </div>
    );
}