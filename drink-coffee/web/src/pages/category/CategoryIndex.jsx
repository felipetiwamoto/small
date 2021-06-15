import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isLogged } from "./../../helper";

import Menu from "./../../components/Menu";
import CategoryList from "./CategoryList";
import CategoryAdd from "./CategoryAdd";
import CategoryShow from "./CategoryShow";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";

export default function CategoryIndex(props) {
	const history = useHistory();

	const [route, setRoute] = useState("list");
	const [categories, setCategories] = useState([]);
	const [count, setCount] = useState(null);
	const [pagination, setPagination] = useState(1);
	const [showingId, setShowingId] = useState("");
	const [editingId, setEditingId] = useState("");
	const [removingId, setRemovingId] = useState("");

	const getCategories = async () => {
		const res = await fetch(`http://localhost:8080/api/category?page=${pagination}`)
			.then((res) => res.json())
			.then((res) => res);

		setCategories(res.categories);
		setCount(res.count);
	};

	const show = (id) => {
		setShowingId(id);
		return setRoute("show");
	};
	const edit = (id) => {
		setEditingId(id);
		return setRoute("edit");
	};
	const remove = (id) => {
		setRemovingId(id);
		return setRoute("remove");
	};

	const flush = () => {
		setShowingId("");
		setEditingId("");
		setRemovingId("");
	};

	useEffect(() => {
		!isLogged() && history.push("/");
		getCategories();
	}, [pagination]);

	const clonedProps = {
		getCategories,
		route,
		setRoute,
		categories,
		setCategories,
		pagination,
		setPagination,
		count,
		setCount,
		editingId,
		setEditingId,
		showingId,
		setShowingId,
		removingId,
		setRemovingId,
		flush,
		show,
		edit,
		remove,
	};

	return (
		<div className="crud_index">
			<div className="container category_index">
				<Menu />
				<div className="content">
					<ul className="tab">
						<li
							className={`tab__item list ${route === "list" ? `tab__item--active` : ``}`}
							onClick={() => setRoute("list")}
						>
							List
						</li>
						<li
							className={`tab__item new ${route === "new" ? `tab__item--active` : ``}`}
							onClick={() => setRoute("new")}
						>
							New
						</li>

						{showingId && (
							<li
								className={`tab__item show ${showingId !== "" ? `tab__item--show` : ``} ${
									route === "show" ? `tab__item--active` : ``
								}`}
								onClick={() => setRoute("show")}
							>
								Information
							</li>
						)}
						{editingId && (
							<li
								className={`tab__item edit ${editingId !== "" ? `tab__item--show` : ``} ${
									route === "edit" ? `tab__item--active` : ``
								}`}
								onClick={() => setRoute("edit")}
							>
								Edit
							</li>
						)}
						{removingId && (
							<li
								className={`tab__item remove ${removingId !== "" ? `tab__item--show` : ``} ${
									route === "remove" ? `tab__item--active` : ``
								}`}
								onClick={() => setRoute("remove")}
							>
								Remove
							</li>
						)}
					</ul>
					<div className="tab_content">
						{route === "list" && count !== null && (
							<div className="tab_content__item">
								<CategoryList {...clonedProps} />
							</div>
						)}
						{route === "new" && (
							<div className="tab_content__item">
								<CategoryAdd {...clonedProps} />
							</div>
						)}
						{route === "show" && (
							<div className="tab_content__item">
								<CategoryShow {...clonedProps} />
							</div>
						)}
						{route === "edit" && (
							<div className="tab_content__item">
								<CategoryEdit {...clonedProps} />
							</div>
						)}
						{route === "remove" && (
							<div className="tab_content__item">
								<CategoryDelete {...clonedProps} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
