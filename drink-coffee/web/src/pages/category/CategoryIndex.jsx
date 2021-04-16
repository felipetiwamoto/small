import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import CategoryList from "./CategoryList";
import CategoryAdd from "./CategoryAdd";
import CategoryShow from "./CategoryShow";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";

export default function CategoryIndex(props) {
    const [route, setRoute] = useState("list");
    const [categories, setCategories] = useState([]);
    const [showingId, setShowingId] = useState("");
    const [editingId, setEditingId] = useState("");
    const [removingId, setRemovingId] = useState("");

    const getCategories = async () => {
        const res = await fetch(`http://localhost:8080/api/category`)
            .then((res) => (res.json())).then((res) => (res));

        setCategories(res);
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

    const clonedProps = {
        getCategories,
        route, setRoute,
        categories, setCategories,
        editingId, setEditingId,
        showingId, setShowingId,
        removingId, setRemovingId,
        show, edit, remove
    };

    useEffect(() => { getCategories(); }, []);

    return (
        <div className="category_index">
            <button type="button" onClick={() => setRoute("list")}>List</button>
            <button type="button" onClick={() => setRoute("new")}>New</button>

            {route === "list" && <CategoryList {...clonedProps} />}
            {route === "new" && <CategoryAdd {...clonedProps} />}
            {route === "show" && <CategoryShow {...clonedProps} />}
            {route === "edit" && <CategoryEdit {...clonedProps} />}
            {route === "remove" && <CategoryDelete {...clonedProps} />}
        </div>
    );
}