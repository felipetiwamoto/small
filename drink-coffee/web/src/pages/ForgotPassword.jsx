import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import validate from "./../validator";
import { isLogged } from "./../helper";

import Feedback from "./../components/Feedback";

export default function ForgotPassword(props) {
	const history = useHistory();

	useEffect(() => {
		isLogged() && history.push("/product");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		email: {
			feedback: "",
			value: "",
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
			return setFeedback("Please fill the form currectly.");
		}

		let form = new FormData();
		form.append("email", fields.email.value);

		let res = await fetch(`http://localhost:8080/api/employee/forgot-password`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		return setFeedback(res.message);
	};

	return (
		<div className="forgot_password">
			<h1 className="forgot_password__title">Forgot Password</h1>
			<div className="feedback">
				{feedback.length > 0 && <Feedback setFeedback={setFeedback} message={feedback} type="error" />}
			</div>
			<form className="forgot_password__form" onSubmit={handleSubmit}>
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
				<button className="button forgot_password__button">Recovery password</button>
			</form>
			<div className="forgot_password__bottom">
				<span onClick={() => props.setTab("register")}>Sign up</span>
				<span onClick={() => props.setTab("login")}>Sign in</span>
			</div>
		</div>
	);
}
