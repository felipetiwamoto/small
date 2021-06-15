import React, { useState, useEffect } from "react";
import validate from "./../../validator";

export default function CategoryEdit(props) {
	useEffect(() => {
		if (props.editingId == "") return;
		const category = props.categories.find((c) => c.id === props.editingId);
		const state = { ...fields };
		state.name.value = category.name;
		state.name.isValid = true;
		setFields({ ...state });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editingId]);

	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		name: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true },
		},
	});

	const handleChange = (e, key) => {
		let state = { ...fields };
		state[key].value = e.target.value;
		setFields(state);

		handleBlur(e, key);
	};

	const handleBlur = async (e, key) => {
		let message = ``;
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
		form.append("name", fields.name.value);

		let res = await fetch(`http://localhost:8080/api/category/${props.editingId}`, { method: "post", body: form })
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			return setFeedback(res.message);
		}

		props.flush();
		props.getCategories();
		return props.setRoute("list");
	};

	return (
		<div className="category_edit">
			<form onSubmit={handleSubmit}>
				{feedback}
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
				<button className="button">Edit</button>
			</form>
		</div>
	);
}
