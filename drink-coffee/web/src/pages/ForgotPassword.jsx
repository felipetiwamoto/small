import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword(props) {
	return (
		<div className="forgot_password">
			<h3>Component: ForgotPassword</h3>
			<button type="button" onClick={() => props.setTab("register")}>Sign up</button>
			<button type="button" onClick={() => props.setTab("login")}>Sign in</button>
		</div>
	);
}
