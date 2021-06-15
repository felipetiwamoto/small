import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isLogged } from "./../../helper";

import Menu from "./../../components/Menu";
import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import OrderShow from "./OrderShow";
import OrderEdit from "./OrderEdit";
import OrderDelete from "./OrderDelete";

export default function OrderIndex(props) {
	const history = useHistory();

	const [route, setRoute] = useState("list");
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState(null);
	const [pagination, setPagination] = useState(1);
	const [showingId, setShowingId] = useState("");
	const [editingId, setEditingId] = useState("");
	const [removingId, setRemovingId] = useState("");
	const status = [
		{ id: "waiting approval", label: "Waiting approval" },
		{ id: "preparing", label: "Preparing" },
		{ id: "delivered", label: "Delivered" },
		{ id: "finished", label: "Finished" },
		{ id: "canceled", label: "Canceled" },
	];

	const getProducts = async () => {
		const res = await fetch(`http://localhost:8080/api/product/all`)
			.then((res) => res.json())
			.then((res) => res);

		setProducts(res);
	};

	const getOrders = async () => {
		const res = await fetch(`http://localhost:8080/api/order?page=${pagination}`)
			.then((res) => res.json())
			.then((res) => res);

		setOrders(res.orders);
		setCount(res.count);
	};

	const flush = () => {
		setShowingId("");
		setEditingId("");
		setRemovingId("");
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

	const clonedProps = {
		getOrders,
		route,
		setRoute,
		orders,
		setOrders,
		products,
		setProducts,
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
		status,
	};

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		!isLogged() && history.push("/");
		getOrders();
	}, [pagination]);

	return (
		<div className="crud_index">
			<div className="container order_index">
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
								<OrderList {...clonedProps} />
							</div>
						)}
						{route === "new" && (
							<div className="tab_content__item">
								<OrderAdd {...clonedProps} />
							</div>
						)}
						{route === "show" && (
							<div className="tab_content__item">
								<OrderShow {...clonedProps} />
							</div>
						)}
						{route === "edit" && (
							<div className="tab_content__item">
								<OrderEdit {...clonedProps} />
							</div>
						)}
						{route === "remove" && (
							<div className="tab_content__item">
								<OrderDelete {...clonedProps} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
