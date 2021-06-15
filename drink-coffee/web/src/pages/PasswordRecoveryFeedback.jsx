import React from "react";

export default function PasswordRecoveryFeedback(props) {
	return (
		<div className="password_recovery_feedback">
			<p class="password_recovery_feedback__desc">
				We've sent a e-mail to <strong>[************moto@gmail.com]</strong>.<br />
				Click on the link on the e-mail to change your password.
			</p>
			<div className="password_recovery_feedback__bottom">
				<span onClick={() => props.setTab("register")}>Sign up</span>
				<span onClick={() => props.setTab("login")}>Sign in</span>
			</div>
		</div>
	);
}
