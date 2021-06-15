import React, { useState, useEffect } from "react";

export default function ProductShow(props) {
	const [product, setProduct] = useState({});
	useEffect(() => {
		if (props.showingId == "") return;
		setProduct(props.products.find((c) => c.id === props.showingId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.showingId]);

	return (
		<div className="product_show">
			{product.id}
			<br />
			{product.name}
			<br />
			<br />
			<button type="button" onClick={() => props.edit(product.id)}>
				edit
			</button>
			<button type="button" onClick={() => props.remove(product.id)}>
				remove
			</button>
		</div>
	);
}
