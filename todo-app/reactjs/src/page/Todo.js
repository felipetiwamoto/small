import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import todosAction from "./../redux/action/todos";

import { MdDone, MdRemove, MdAdd, MdEdit } from "react-icons/md";

import "./../page/Todo.css";

export default function Todo(props) {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		title: "",
		completed: false,
	});

	function handleFormChange(e, key) {
		setForm({
			...form,
			title: e.target.value,
		});
	}

	function handleForm() {
		if (form.title.trim().length <= 0) return;
		editing === null ? store(form) : update(form);
		flush();
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleForm();
	}

	function flush() {
		setEditing(null);
		setForm({ title: "", completed: false });
	}

	function setEditingForm(todo) {
		setEditing(todo);
		setForm({ ...todo });
	}

	function renderTodos() {
		return (
			todos.length > 0 &&
			todos.map(
				(todo) =>
					!todo.completed && (
						<tr className="todo__tr">
							<td className="todo__td" onClick={() => setEditingForm(todo)}>
								{todo.title}
							</td>
							<td className="todo__td">
								<button className="todo__button todo__complete" onClick={() => done(todo)}>
									<MdDone color="#fff" size={20} />
								</button>
								<button className="todo__button todo__remove" onClick={() => remove(todo)}>
									<MdRemove color="#fff" size={20} />
								</button>
							</td>
						</tr>
					)
			)
		);
	}

	async function index() {
		const res = await fetch(`http://localhost:3000/todo`)
			.then((res) => res.json())
			.then((res) => res);

		dispatch(todosAction().set(res));
		flush();
	}

	async function store(todo) {
		await fetch(`http://localhost:3000/todo`, {
			method: "post",
			body: JSON.stringify({ ...todo }),
			headers: {
				"Content-Type": "application/json",
				accept: "application/json, text/plain, */*",
			},
		})
			.then((res) => res.json())
			.then((res) => res);

		index();
	}

	async function update(todo) {
		await fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "put",
			body: JSON.stringify({ ...todo, title: form.title }),
			headers: {
				"Content-Type": "application/json",
				accept: "application/json, text/plain, */*",
			},
		})
			.then((res) => res.json())
			.then((res) => res);

		index();
	}

	async function done(todo) {
		await fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "put",
			body: JSON.stringify({ ...todo, completed: true }),
			headers: {
				"Content-Type": "application/json",
				accept: "application/json, text/plain, */*",
			},
		})
			.then((res) => res.json())
			.then((res) => res);

		index();
	}

	async function remove(todo) {
		await fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((res) => res);

		index();
	}

	useEffect(() => {
		index();
	}, []);

	return (
		<div className="todo">
			<h1 className="todo__title">Todo App (ReactJS)</h1>
			<a target="_blank" href="https://github.com/felipetiwamoto" className="todo__made_by">
				Made by Felipe T. Iwamoto
			</a>
			<div className="todo__content">
				<form onSubmit={(e) => handleSubmit(e)} className="todo__form">
					<input
						type="text"
						className="todo__field"
						placeholder="Ex: Study..."
						value={form.title}
						onChange={(e) => handleFormChange(e, "title")}
					/>
					<button type="button" className="todo__button" onClick={() => handleForm()}>
						{editing === null ? <MdAdd color="#fff" size={24} /> : <MdEdit color="#fff" size={24} />}
					</button>
				</form>
				<table className="todo__table">
					<thead className="todo__thead">
						<tr className="todo__tr">
							<th className="todo__th">Title</th>
							<th className="todo__th">Action</th>
						</tr>
					</thead>
					<tbody className="todo__tbody">{renderTodos()}</tbody>
				</table>
			</div>
		</div>
	);
}
