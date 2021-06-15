import React, { useState, useEffect } from "react";

export default function CategoryShow(props) {
	const [category, setCategory] = useState({});
	useEffect(() => {
		if (props.showingId == "") return;
		setCategory(props.categories.find((c) => c.id === props.showingId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.showingId]);

	return (
		<div className="category_show">
			{category.id}
			<br />
			{category.name}
			<br />
			<br />
			<button type="button" onClick={() => props.edit(category.id)}>
				edit
			</button>
			<button type="button" onClick={() => props.remove(category.id)}>
				remove
			</button>
		</div>
	);
}
