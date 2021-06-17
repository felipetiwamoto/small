function todo() {
	function init() {
		if (!this.get()) this.set([]);
	}
	function get() {
		return fetch(`http://localhost:3000/todo`)
			.then((res) => res.json())
			.then((res) => res);
	}
	function complete(todo) {
		return fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "put",
			body: JSON.stringify({ ...todo, completed: true }),
			headers: {
				"Content-Type": "application/json",
				accept: "application/json, text/plain, */*",
			},
		})
			.then((res) => res.json())
			.then((res) => res);
	}
	function remove(todo) {
		return fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((res) => res);
	}
	async function insert(todo) {
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
	}
	async function update(todo) {
		await fetch(`http://localhost:3000/todo/${todo.id}`, {
			method: "put",
			body: JSON.stringify({ ...todo }),
			headers: {
				"Content-Type": "application/json",
				accept: "application/json, text/plain, */*",
			},
		})
			.then((res) => res.json())
			.then((res) => res);
	}

	return {
		init,
		get,
		complete,
		remove,
		insert,
		update,
	};
}
