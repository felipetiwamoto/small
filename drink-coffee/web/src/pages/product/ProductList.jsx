import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { timestamps, money } from "./../../helper";

export default function ProductList(props) {
	const handlePaginationChange = (e) => {
		props.setPagination(e.target.value || 1);
	};

	const handleChange = (e) => {
		props.setCategoryId(e.target.value);
	};

	const renderPagination = () => {
		const maxPagination = Math.ceil(props.count / 10);
		let page = props.pagination;

		return (
			<div className="pagination">
				<div className="pagination__prev" onClick={() => props.setPagination(page > 1 ? --page : 1)}>
					<MdChevronLeft />
				</div>
				<div className="pagination__field">
					<input
						type="number"
						min={1}
						max={maxPagination}
						value={props.pagination}
						onChange={(e) => handlePaginationChange(e)}
					/>
				</div>
				<div
					className="pagination__next"
					onClick={() => props.setPagination(page < maxPagination ? ++page : maxPagination)}
				>
					<MdChevronRight />
				</div>
			</div>
		);
	};
	return (
		<div className="crud_list">
			<div className="product_list">
				<div className="text_field filter">
					<select
						id="category_id"
						className="text_field__field"
						value={props.categoryId}
						onChange={(e) => handleChange(e)}
					>
						<option value="">Select a category</option>
						{props.categories && props.categories.map((c) => <option value={c.id}>{c.name}</option>)}
					</select>
					<label htmlFor="category_id" className="text_field__label">
						Category Filter
					</label>
				</div>
				<table className="table">
					<thead className="table__thead">
						<tr className="table__tr">
							{/* <th className="table__th">#</th> */}
							<th className="table__th">Category</th>
							<th className="table__th">Name</th>
							<th className="table__th">Price</th>
							<th className="table__th">Created at</th>
							{/* <th className="table__th">Amount</th> */}
							<th className="table__th">Actions</th>
						</tr>
					</thead>
					<tbody className="table__tbody">
						{props.products.map((product, index) => (
							<tr className="table__tr" key={index}>
								{/* <td className="table__td">{product.id}</td> */}
								<td className="table__td">{product.category.name}</td>
								<td className="table__td">{product.name}</td>
								<td className="table__td">{money(product.price)}</td>
								{/* <td className="table__td">{product.amount}</td> */}
								<td className="table__td">{timestamps(product.created_at)}</td>
								<td className="table__td">
									{/* <button className="table__button button show" type="button" onClick={() => props.show(product.id)}>show</button> */}
									<button
										className="table__button button edit"
										type="button"
										onClick={() => props.edit(product.id)}
									>
										edit
									</button>
									<button
										className="table__button button remove"
										type="button"
										onClick={() => props.remove(product.id)}
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
