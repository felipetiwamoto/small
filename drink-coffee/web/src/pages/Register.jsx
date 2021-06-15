import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import validate from "./../validator";
import { isLogged } from "./../helper";

import Feedback from "./../components/Feedback";

export default function Register(props) {
	const history = useHistory();

	useEffect(() => {
		isLogged() && history.push("/product");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		name: {
			feedback: "",
			value: "",
			isValid: false,
			validations: { required: true },
		},
		surname: {
			feedback: "",
			value: "",
			isValid: false,
			validations: { required: true },
		},
		email: {
			feedback: "",
			value: "",
			isValid: false,
			validations: { required: true },
		},
		password: {
			feedback: "",
			value: "",
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
			return setFeedback("Please fill the form currectly.");
		}

		let form = new FormData();
		form.append("name", fields.name.value);
		form.append("surname", fields.surname.value);
		form.append("email", fields.email.value);
		form.append("password", fields.password.value);

		let res = await fetch(`http://localhost:8080/api/employee/register`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		return setFeedback(res.message);
	};

	return (
		<div className="register">
			<h1 className="register__title">Register</h1>
			<div className="feedback">
				{feedback.length > 0 && <Feedback setFeedback={setFeedback} message={feedback} type="error" />}
			</div>
			<form className="register__form" onSubmit={handleSubmit}>
				<div className="register__row">
					<div className="register__row__item">
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
					</div>
					<div className="register__row__item">
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
					</div>
				</div>
				<div className="register__row">
					<div className="register__row__item">
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
					</div>
					<div className="register__row__item">
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
					</div>
				</div>
				<button className="button register__button">Register</button>
			</form>
			<div className="register__bottom">
				<span onClick={() => props.setTab("login")}>Sign in</span>
			</div>
		</div>
	);
}
