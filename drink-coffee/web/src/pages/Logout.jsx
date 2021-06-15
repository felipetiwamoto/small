import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function Logout(props) {
	const history = useHistory();

	useEffect(() => {
		localStorage.removeItem("logged");
		return history.push("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}
