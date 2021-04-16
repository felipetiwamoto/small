import React, { useEffect, useState } from "react";
import validate from "./../validator";

export default function TextField(props) {
	const [error, setError] = useState("");

	const handleChange = (e) => {
		props.setFields({
			...props.fields,
			[props.id]: {
				...props.fields[props.id],
				value: e.target.value
			}
		});
	}

	const handleBlur = async (e) => {
		let message = ``;
		message = validate(props.fields[props.id].value, props.fields[props.id].validations);
		setError(message);

		props.setFields({
			...props.fields,
			[props.id]: {
				...props.fields[props.id],
				isValid: (message.length <= 0)
			}
		});
	}

	const handleKeyUp = (e) => {
		if (e.key == "Enter") { handleBlur(e); }
	}

	return (
		<div className={`text_field`}>
			<label htmlFor={props.id}>
				{props.label}
				<span className="feedback" style={{ display: "block" }}>{(error) && error}</span>
			</label>
			<input
				className="field"
				type={props.type}
				id={props.id}
				name={props.id}
				value={props.fields[props.id].value}
				onChange={handleChange}
				onBlur={handleBlur}
				onKeyUp={handleKeyUp}
			/>
		</div>
	);
}