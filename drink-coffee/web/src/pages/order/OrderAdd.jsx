import React, { useState } from "react";
import validate from "./../../validator";

export default function OrderAdd(props) {
	const [orderItems, setOrderItems] = useState([]);
	const [feedback, setFeedback] = useState("");

	const [fields, setFields] = useState({
		status: {
			value: "",
			feedback: "",
			isValid: false,
			validations: { required: true },
		},
	});

	const handleChange = (e, key) => {
		let state = { ...fields };
		state[key].value = e.target.value;
		setFields(state);

		handleBlur(e, key);
	};

	const handleBlur = async (e, key) => {
		let message = ``;
		message = validate(e.target.value, fields[key].validations);

		let state = { ...fields };
		state[key].isValid = message.length <= 0;
		state[key].feedback = message;
		setFields(state);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasError = Object.keys(fields).find((field) => !fields[field].isValid);
		if (hasError) {
			return setFeedback("Fill the form.");
		}

		if (orderItems.length <= 0) return setFeedback(`Order must have at least 1 item.`);

		let form = new FormData();
		const logged = JSON.parse(localStorage.getItem("logged"));
		form.append("status", fields.status.value);
		form.append("employee_id", logged.id);
		form.append("order_item", JSON.stringify(orderItems));

		let res = await fetch(`http://localhost:8080/api/order`, {
			method: "post",
			body: form,
		})
			.then((res) => res.json())
			.then((res) => res);

		if (res.status !== "success") {
			return setFeedback(res.message);
		}

		props.getOrders();

		return props.setRoute("list");
	};

	const add = (product) => {
		// if(product.amount > 0){
		let productsState = props.products.map((p) => {
			return p.id === product.id ? { ...p, amount: --p.amount } : { ...p };
		});

		props.setProducts(productsState);

		const hasAddedAlready = orderItems.find((p) => p.product_id === product.id);

		let state = [];

		if (hasAddedAlready) {
			state = orderItems.map((p) => {
				return p.product_id === product.id
					? {
							name: p.name,
							product_id: p.product_id,
							added: ++p.added,
							each_price: p.each_price,
							total: p.each_price * p.added,
					  }
					: { ...p };
			});
		} else {
			let newOrderItem = props.products.find((p) => p.id === product.id);
			state = [
				...orderItems,
				{
					name: newOrderItem.name,
					product_id: newOrderItem.id,
					added: 1,
					each_price: newOrderItem.price,
					total: newOrderItem.price,
				},
			];
		}

		setOrderItems(state);
		// }
	};

	const remove = (product) => {
		let state = [...orderItems];

		state = orderItems.map((p) => {
			return p.product_id === product.product_id
				? { ...p, added: --p.added, total: p.total - p.each_price }
				: { ...p, total: p.each_price * p.added };
		});
		state = state.filter((p) => p.added > 0);
		setOrderItems(state);
	};

	return (
		<div className="order_add">
			{feedback && <span className="callback">{feedback}</span>}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-4">
						<div className="text_field">
							<select
								id="status"
								className="text_field__field"
								value={fields.status.value}
								onBlur={(e) => handleBlur(e, "status")}
								onChange={(e) => handleChange(e, "status")}
							>
								<option value="">Selecione um status</option>
								{props.status && props.status.map((s) => <option value={s.id}>{s.label}</option>)}
							</select>
							<label htmlFor="category_id" className="text_field__label">
								Status
								<span className="text_field__feedback">{fields.status.feedback}</span>
							</label>
						</div>
					</div>
				</div>
				<h3>Cardápio</h3>
				<div className="product_list_row">
					{props.products.length > 0 ? (
						props.products.map((p) => {
							return (
								<div className="product_list_row__col">
									<div className="product_list_row__item">
										<span className="product_list_row__name">{p.name}</span>
										<span className="product_list_row__price">
											$ {parseFloat(p.price).toFixed(2)}{" "}
										</span>
										<button
											className="button success product_list_row__button"
											type="button"
											onClick={() => add(p)}
										>
											Add
										</button>
									</div>
								</div>
							);
						})
					) : (
						<h3 className="product_list_row__not_found">Não há nenhum produto cadastrado.</h3>
					)}
				</div>
				<h3>
					Adicionados{" "}
					{orderItems.length > 0 &&
						`Total: $ ${parseFloat(
							orderItems.reduce((acc, obj) => {
								return acc + obj.each_price * obj.added;
							}, 0)
						).toFixed(2)}`}
				</h3>
				<div className="product_list_row">
					{orderItems.length > 0 ? (
						orderItems.map((p) => {
							return (
								<div className="product_list_row__col">
									<div className="product_list_row__item">
										<span className="product_list_row__name">{p.name}</span>
										<span className="product_list_row__price">
											{parseFloat(p.each_price).toFixed(2)}
										</span>
										<span className="product_list_row__cart">Cart: {p.added}</span>
										<span className="product_list_row__total">
											Total: $ {parseFloat(p.total).toFixed(2)}
										</span>
										<button
											className="button danger product_list_row__button"
											type="button"
											onClick={() => remove(p)}
										>
											Remove
										</button>
									</div>
								</div>
							);
						})
					) : (
						<h3 className="product_list_row__not_found">Não há nenhum produto no carrinho ainda.</h3>
					)}
				</div>
				<button className="button success">Create</button>
			</form>
		</div>
	);
}
