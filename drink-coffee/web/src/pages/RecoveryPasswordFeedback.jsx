import React from "react";
import { Link } from "react-router-dom";

export default function RecoveryPasswordFeedback(props) {
	return (
		<div className="recovery_password_feedback">
			<h3>Component: RecoveryPasswordFeedback</h3>
			<button type="button" onClick={() => props.setTab("register")}>Sign up</button>
			<button type="button" onClick={() => props.setTab("login")}>Sign in</button>
		</div>
	);
}
