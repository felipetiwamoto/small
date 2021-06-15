import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import validate from "./../validator";

import Feedback from "./../components/Feedback";

export default function ResetPassword(props) {
	const history = useHistory();

	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
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
		form.append("forgot_password_token", props.match.params.token);
		form.append("password", fields.password.value);

		let res = await fetch(`http://localhost:8080/api/employee/reset-password`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		return setFeedback(res.message);
	};

	async function checkToken() {
		const token = props.match.params.token;

		let form = new FormData();
		form.append("forgot_password_token", token);

		const res = await fetch(`http://localhost:8080/api/employee/check-forgot-password-token`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			setFeedback(res.message);
			return setTimeout(() => {
				history.push("/");
			}, 5000);
		}
	}

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<div className="reset_password_initial">
			<div className="reset_password">
				<h1 className="forgot_password__title">Reset Password</h1>
				<div className="feedback">
					{feedback.length > 0 && <Feedback setFeedback={setFeedback} message={feedback} type="error" />}
				</div>
				<form className="forgot_password__form" onSubmit={handleSubmit}>
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
					<button className="button forgot_password__button">Reset password</button>
				</form>
				<div className="forgot_password__bottom">
					<Link to="/">Sign in</Link>
				</div>
			</div>
		</div>
	);
}
