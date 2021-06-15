import React, { useState, useEffect } from "react";

import Menu from "./../../components/Menu";
import EmployeeList from "./EmployeeList";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeShow from "./EmployeeShow";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDelete from "./EmployeeDelete";
import { isLogged } from "./../../helper";
import { useHistory } from "react-router";

export default function EmployeeIndex(props) {
	const history = useHistory();

	const [route, setRoute] = useState("list");
	const [employees, setEmployees] = useState([]);
	const [count, setCount] = useState(null);
	const [categoryId, setCategoryId] = useState("");
	const [pagination, setPagination] = useState(1);
	const [showingId, setShowingId] = useState("");
	const [editingId, setEditingId] = useState("");
	const [removingId, setRemovingId] = useState("");

	const getEmployees = async () => {
		const res = await fetch(`http://localhost:8080/api/employee?page=${pagination}`)
			.then((res) => res.json())
			.then((res) => res);

		setEmployees(res.employees);
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
		getEmployees();
		setShowingId("");
		setEditingId("");
		setRemovingId("");
	}, [pagination, categoryId]);

	const clonedProps = {
		getEmployees,
		route,
		setRoute,
		employees,
		setEmployees,
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
			<div className="container employee_index">
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
								<EmployeeList {...clonedProps} />
							</div>
						)}
						{route === "new" && (
							<div className="tab_content__item">
								<EmployeeAdd {...clonedProps} />
							</div>
						)}
						{route === "show" && (
							<div className="tab_content__item">
								<EmployeeShow {...clonedProps} />
							</div>
						)}
						{route === "edit" && (
							<div className="tab_content__item">
								<EmployeeEdit {...clonedProps} />
							</div>
						)}
						{route === "remove" && (
							<div className="tab_content__item">
								<EmployeeDelete {...clonedProps} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
