import React, { useState } from "react";
import validate from "./../../validator";

export default function EmployeeAdd(props) {
	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		name: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true },
		},
		surname: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true },
		},
		email: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true },
		},
		password: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true, minLength: 6 },
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
		form.append("surname", fields.surname.value);
		form.append("email", fields.email.value);
		form.append("password", fields.password.value);

		let res = await fetch(`http://localhost:8080/api/employee`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			return setFeedback(res.message);
		}

		props.getEmployees();

		return props.setRoute("list");
	};

	return (
		<div className="employee_add">
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
					<label className="text_field__label" htmlFor="name">
						Name <span className="text_field__feedback">{fields.name.feedback}</span>
					</label>
				</div>
				<div className="text_field">
					<input
						type="text"
						id="surname"
						className="text_field__field"
						value={fields.surname.value}
						onBlur={(e) => handleBlur(e, "surname")}
						onChange={(e) => handleChange(e, "surname")}
					/>
					<label className="text_field__label" htmlFor="surname">
						Surname <span className="text_field__feedback">{fields.surname.feedback}</span>
					</label>
				</div>
				<div className="text_field">
					<input
						type="text"
						id="email"
						className="text_field__field"
						value={fields.email.value}
						onBlur={(e) => handleBlur(e, "email")}
						onChange={(e) => handleChange(e, "email")}
					/>
					<label className="text_field__label" htmlFor="email">
						E-mail <span className="text_field__feedback">{fields.email.feedback}</span>
					</label>
				</div>
				<div className="text_field">
					<input
						type="password"
						id="password"
						className="text_field__field"
						value={fields.password.value}
						onBlur={(e) => handleBlur(e, "password")}
						onChange={(e) => handleChange(e, "password")}
					/>
					<label className="text_field__label" htmlFor="password">
						Password <span className="text_field__feedback">{fields.password.feedback}</span>
					</label>
				</div>
				<button className="button">Create</button>
			</form>
		</div>
	);
}
