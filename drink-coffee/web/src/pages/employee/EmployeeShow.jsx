import React, { useState, useEffect } from "react";

export default function EmployeeShow(props) {
	const [employee, setEmployee] = useState({});
	useEffect(() => {
		if (props.showingId == "") return;
		setEmployee(props.employees.find((c) => c.id === props.showingId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.showingId]);

	return (
		<div className="employee_show">
			{employee.id}
			<br />
			{employee.name}
			<br />
			<br />
			<button type="button" onClick={() => props.edit(employee.id)}>
				edit
			</button>
			<button type="button" onClick={() => props.remove(employee.id)}>
				remove
			</button>
		</div>
	);
}
