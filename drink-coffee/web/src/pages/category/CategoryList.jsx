import React from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { timestamps } from "./../../helper";

export default function CategoryList(props) {
	const handleChange = (e) => {
		props.setPagination(e.target.value || 1);
	};

	const renderPagination = () => {
		const maxPagination = Math.ceil(props.count / 10);
		let page = props.pagination;

		return (
			<div className="pagination">
				<div
					className="pagination__prev"
					onClick={() => props.setPagination(page > 1 ? --page : 1)}
				>
					<MdChevronLeft />
				</div>
				<div className="pagination__field">
					<input
						type="number"
						min={1}
						max={maxPagination}
						value={props.pagination}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div
					className="pagination__next"
					onClick={() =>
						props.setPagination(
							page < maxPagination ? ++page : maxPagination
						)
					}
				>
					<MdChevronRight />
				</div>
			</div>
		);
	};
	return (
		<div className="crud_list">
			<div className="category_list">
				<table className="table">
					<thead className="table__thead">
						<tr className="table__tr">
							{/* <th className="table__th">#</th> */}
							<th className="table__th">Name</th>
							<th className="table__th">Created at</th>
							<th className="table__th">Actions</th>
						</tr>
					</thead>
					<tbody className="table__tbody">
						{props.categories.map((category, index) => (
							<tr className="table__tr" key={index}>
								{/* <td className="table__td">{category.id}</td> */}
								<td className="table__td">{category.name}</td>
								<td className="table__td">
									{timestamps(category.created_at)}
								</td>
								<td className="table__td">
									{/* <button className="table__button button show" type="button" onClick={() => props.show(category.id)}>show</button> */}
									<button
										className="table__button button edit"
										type="button"
										onClick={() => props.edit(category.id)}
									>
										edit
									</button>
									<button
										className="table__button button remove"
										type="button"
										onClick={() => props.remove(category.id)}
									>
										remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{renderPagination()}
			</div>
		</div>
	);
}
