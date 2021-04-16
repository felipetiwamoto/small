import React, { useState } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import RecoveryPasswordFeedback from "./RecoveryPasswordFeedback";

export default function Initial() {
	const [tab, setTab] = useState("login");

	const renderTab = (tab) => {
		const tabs = {
			login: <Login setTab={setTab} />,
			register: <Register setTab={setTab} />,
			forgot_password: <ForgotPassword setTab={setTab} />,
			password_recovery_feedback: <RecoveryPasswordFeedback setTab={setTab} />,
		};

		return tabs[tab];
	}
	return (
		<div className="initial">
			{renderTab(tab)}
		</div>
	);
}