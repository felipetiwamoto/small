import React, { useState, useEffect } from "react";
import validate from "./../../validator";

export default function ProductAdd(props) {
	useEffect(() => {
		if (props.editingId == "") return;
		const product = props.products.find((c) => c.id === props.editingId);
		const state = { ...fields };
		state.category_id.value = product.category_id;
		state.name.value = product.name;
		state.price.value = product.price;
		setFields(state);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editingId]);

	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		category_id: {
			value: "",
			feedback: "",
			isValid: true,
			validations: { required: true, length: 19 },
		},
		name: {
			value: "",
			feedback: "",
			isValid: true,
			validations: { required: true },
		},
		price: {
			value: "",
			feedback: "",
			isValid: true,
			validations: { required: true, isNumeric: true },
		},
	});

	const handleChange = (e, key) => {
		console.log(e.target.value);
		let state = { ...fields };
		state[key].value = e.target.value;
		setFields(state);
		console.log(state);

		handleBlur(e, key);
	};

	const handleBlur = async (e, key) => {
		let message = ``;
		console.log("pao", e.target.value);
		message = validate(e.target.value, fields[key].validations);

		let state = { ...fields };
		state[key].isValid = message.length <= 0;
		state[key].feedback = message;
		setFields(state);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasError = Object.keys(fields).find((field) => !fields[field].isValid);
		if (hasError) {
			return;
		}

		let form = new FormData();
		form.append("category_id", fields.category_id.value);
		form.append("name", fields.name.value);
		form.append("price", fields.price.value);

		let res = await fetch(`http://localhost:8080/api/product/${props.editingId}`, { method: "post", body: form })
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			return setFeedback(res.message);
		}

		props.getProducts();

		props.flush();
		return props.setRoute("list");
	};

	return (
		<div className="product_add">
			<form onSubmit={handleSubmit}>
				{feedback}
				<div className="text_field">
					<select
						id="category_id"
						className="text_field__field"
						value={fields.category_id.value}
						onBlur={(e) => handleBlur(e, "category_id")}
						onChange={(e) => handleChange(e, "category_id")}
					>
						<option value="">Select a category</option>
						{props.categories && props.categories.map((c) => <option value={c.id}>{c.name}</option>)}
					</select>
					<label htmlFor="category_id" className="text_field__label">
						Name <span className="text_field__feedback">{fields.category_id.feedback}</span>
					</label>
				</div>
				<div className="text_field">
					<input
						type="text"
						id="name"
						className="text_field__field"
						value={fields.name.value}
						onBlur={(e) => handleBlur(e, "name")}
						onChange={(e) => handleChange(e, "name")}
					/>
					<label htmlFor="name" className="text_field__label">
						Name <span className="text_field__feedback">{fields.name.feedback}</span>
					</label>
				</div>
				<div className="text_field">
					<input
						type="number"
						id="price"
						className="text_field__field"
						value={fields.price.value}
						onBlur={(e) => handleBlur(e, "price")}
						onChange={(e) => handleChange(e, "price")}
					/>
					<label htmlFor="price" className="text_field__label">
						Price <span className="text_field__feedback">{fields.price.feedback}</span>
					</label>
				</div>
				<button className="button">Edit</button>
			</form>
		</div>
	);
}
