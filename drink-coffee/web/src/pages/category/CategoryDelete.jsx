import React, { useState, useEffect } from "react";

export default function CategoryDelete(props) {
	const [category, setCategory] = useState({});
	useEffect(() => {
		if (props.removingId == "") return;
		setCategory(props.categories.find((c) => c.id === props.removingId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.removingId]);

	const confirm = async () => {
		const res = await fetch(`http://localhost:8080/api/category/delete/${category.id}`)
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			props.setFeedback("Something went wrong. Please, try again later.");
		}

		props.flush();
		props.getCategories();
		props.setRoute("list");
	};

	const cancel = () => {
		props.setRemovingId("");
		props.setRoute("list");
	};

	return (
		<div className="crud_delete">
			<div className="container category_delete">
				<p className="crud_delete__desc">
					Are you sure you wanna remove <strong>{category.name}</strong> permanently?
				</p>
				<div className="crud_delete__bottom">
					<button className="button danger" type="button" onClick={() => cancel()}>
						cancel
					</button>
					<button className="button success" type="button" onClick={() => confirm()}>
						confirm
					</button>
				</div>
			</div>
		</div>
	);
}
