function todo() {
	function init() {
		if (!this.get()) this.set([]);
	}
	function get() {
		const todos = JSON.parse(localStorage.getItem("todos"));
		return todos ? todos : false;
	}
	function set(todos) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
	function done(id) {
		const todos = this.get().map((row) => (row.id != id ? { ...row } : { ...row, done: true }));
		this.set(todos);
	}
	function remove(id) {
		const todos = this.get().filter((row) => row.id != id);
		this.set(todos);
	}
	function insert(todo) {
		this.set([...this.get(), { ...todo, id: Math.random(), done: false }]);
	}
	function update(todo, id) {
		const todos = this.get().map((row) => (row.id != id ? { ...row } : { ...row, ...todo }));
		this.set(todos);
	}

	return {
		init,
		get,
		set,
		done,
		remove,
		insert,
		update,
	};
}
