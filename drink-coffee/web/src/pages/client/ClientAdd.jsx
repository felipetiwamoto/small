import React, { useState } from "react";
import validate from "./../../validator";

export default function ClientAdd(props) {
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
			validations: { required: false },
		},
		cpf: {
            value: "",
            feedback: "",
            isValid: false,
            validations: { required: true, length:11 },
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

		const hasError = Object.keys(fields).find(
			(field) => !fields[field].isValid
		);
		if (hasError) {
			return;
		}

		let form = new FormData();
		form.append("name", fields.name.value);
		form.append("surname", fields.surname.value);
		form.append("email", fields.email.value);
		form.append("cpf", fields.cpf.value);
		form.append("password", fields.password.value);

		let res = await fetch(`http://localhost:8080/api/client`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			return setFeedback(res.message);
		}

		props.getClients();

		return props.setRoute("list");
	};

	return (
		<div className="client_add">
			<form onSubmit={handleSubmit}>
				{feedback}
				<div className="text_field">
					<label htmlFor="name">Name <span style={{ display: "block" }}>{fields.name.feedback}</span></label>
					<input type="text" id="name" className="field" value={fields.name.value} onBlur={(e) => handleBlur(e, "name")} onChange={(e) => handleChange(e, "name")} />
				</div>
				<div className="text_field">
					<label htmlFor="surname">Surname <span style={{ display: "block" }}>{fields.surname.feedback}</span></label>
					<input type="text" id="surname" className="field" value={fields.surname.value} onBlur={(e) => handleBlur(e, "surname")} onChange={(e) => handleChange(e, "surname")} />
				</div>
				<div className="text_field">
					<label htmlFor="email">E-mail <span style={{ display: "block" }}>{fields.email.feedback}</span></label>
					<input type="text" id="email" className="field" value={fields.email.value} onBlur={(e) => handleBlur(e, "email")} onChange={(e) => handleChange(e, "email")} />
				</div>
				<div className="text_field">
					<label htmlFor="cpf">CPF <span style={{ display: "block" }}>{fields.cpf.feedback}</span></label>
					<input type="text" id="cpf" className="field" value={fields.cpf.value} onBlur={(e) => handleBlur(e, "cpf")} onChange={(e) => handleChange(e, "cpf")} />
				</div>
				<div className="text_field">
					<label htmlFor="password">Password <span style={{ display: "block" }}>{fields.password.feedback}</span></label>
					<input type="password" id="password" className="field" value={fields.password.value} onBlur={(e) => handleBlur(e, "password")} onChange={(e) => handleChange(e, "password")} />
				</div>
				<button>Create</button>
			</form>
		</div>
	);
}