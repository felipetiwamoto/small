import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import validate from "./../validator";

// import TextField from "./../components/TextField";

export default function Login(props) {
	const [feedback, setFeedback] = useState("");
	const history = useHistory();

	const [fields, setFields] = useState({
		username: {
			feedback: "",
			value: "",
			isValid: false,
			validations: { required: true }
		},
		password: {
			feedback: "",
			value: "",
			isValid: false,
			validations: { required: true, minLength: 6 }
		}
	});

	const handleChange = (e, key) => {
		let state = { ...fields };
		state[key].value = e.target.value;
		setFields(state);

		handleBlur(e, key);
	}

	const handleBlur = async (e, key) => {
		let message = ``;
		message = validate(e.target.value, fields[key].validations);

		let state = { ...fields };
		state[key].isValid = (message.length <= 0);
		state[key].feedbacl = message;
		setFields(state);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasError = Object.keys(fields).find((field) => (!fields[field].isValid));
		if (hasError) { return; }

		let form = new FormData();
		form.append("username", fields.username.value);
		form.append("password", fields.password.value);

		let res = await fetch(`http://localhost:8080/api/employee/login`, { method: "post", body: form })
			.then((res) => (res.json())).then((res) => (res));
		
		if(res.status !== "success"){ 
			return setFeedback(res.message);
		}

		localStorage.setItem("logged", JSON.stringify(res.employee));
		return history.push("/dashboard");
	}

	return (
		<div className="login">
			<h3>Component: Login</h3>
			<form onSubmit={handleSubmit}>
				{feedback}
				<div className="text_field">
					<label htmlFor="username">Username <span style={{ display: "block" }}>{fields.username.feedback}</span></label>
					<input type="text" id="username" className="field" value={fields.username.value} onBlur={(e) => handleBlur(e, "username")} onChange={(e) => handleChange(e, "username")} />
				</div>
				<div className="text_field">
					<label htmlFor="password">Password <span style={{ display: "block" }}>{fields.password.feedback}</span></label>
					<input type="password" id="password" className="field" value={fields.password.value} onBlur={(e) => handleBlur(e, "password")} onChange={(e) => handleChange(e, "password")} />
				</div>
				<button>Login</button>
			</form>
			<button type="button" onClick={() => props.setTab("register")}>Sign up</button>
			<button type="button" onClick={() => props.setTab("forgot_password")}>Forgot my password</button>
		</div>
	);
}