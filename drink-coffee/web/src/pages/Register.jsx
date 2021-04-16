import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
	return (
		<div className="register">
			<h3>Component: Register</h3>
			<button type="button" onClick={() => props.setTab("login")}>Sign in</button>
		</div>
	);
}
