import React, { useEffect, useState } from "react";

export default function Feedback(props) {
	const [enable, setEnable] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setEnable(false);
			props.setFeedback("");
		}, props.timer || 5000);
	}, []);
	return (
		enable && (
			<div className={`feedback__item ${props.type || ``}`}>
				<span className="feedback__message">{props.message}</span>
			</div>
		)
	);
}
