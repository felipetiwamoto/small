import React, { useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import PasswordRecoveryFeedback from "./PasswordRecoveryFeedback";

export default function Initial() {
	
	const [animationController, setAnimationController] = useState(false);
	const [tab, setTab] = useState("login");

	return (
		<div className={`initial`}>
			<div className={`slider ${animationController ? `no-animation` : ``}`} onClick={() => setAnimationController(true)}>
				<div className={`slider__item ${tab === "login" ? `slider__item--active` : ``}`}>
					<Login setTab={setTab} />
				</div>
				<div className={`slider__item ${tab === "register" ? `slider__item--active` : ``}`}>
					<Register setTab={setTab} />
				</div>
				<div className={`slider__item ${tab === "forgot_password" ? `slider__item--active` : ``}`}>
					<ForgotPassword setTab={setTab} />
				</div>
				<div className={`slider__item ${tab === "password_recovery_feedback" ? `slider__item--active` : ``}`}>
					<PasswordRecoveryFeedback setTab={setTab} />
				</div>
			</div>
		</div>
	);
}
