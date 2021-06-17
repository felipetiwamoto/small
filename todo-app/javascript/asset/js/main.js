(async () => {
	let editing = null;

	todo().init();
	list();

	// START: LIST
	async function list() {
		const todoTbody = document.querySelector(".todo .todo__tbody");
		let html = ``;

		const todos = await todo().get();
		todos.length > 0 &&
			todos.forEach((row) => {
				if (!row.completed) {
					html += `
						<tr class="todo__tr" data-id="${row.id}">
							<td class="todo__td">${row.title}</td>
							<td class="todo__td">
								<button class="todo__button todo__complete"><i class="material-icons">done</i></button>
								<button class="todo__button todo__remove"><i class="material-icons">remove</i></button>
							</td>
						</tr>
					`;
				}
			});

		todoTbody.innerHTML = html;
		actionEvents();
		updateTableEvents();
	}
	// END: LIST

	// START: FORM
	const todoForm = document.querySelector(".todo .todo__form");
	const todoFormButton = document.querySelector(".todo .todo__form .todo__button");
	const todoDescriptionField = document.querySelector(".todo .todo__form .title");

	todoForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (todoDescriptionField.value.trim().length <= 0) return;

		console.log(editing);
		editing === null
			? await todo().insert({ title: todoDescriptionField.value, completed: false })
			: await todo().update({ ...editing, title: todoDescriptionField.value });

		await list();
		editing = null;
		todoFormButton.innerHTML = `<i class="material-icons">add</i>`;
		todoDescriptionField.value = "";
		todoDescriptionField.focus;
	});
	// END: FORM

	// START: UPDATE
	function updateTableEvents() {
		const todoTrs = document.querySelectorAll(".todo .todo__tbody .todo__td:not(:last-child)");

		todoTrs.forEach((item) => {
			item.addEventListener("click", async () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				const todos = await todo().get();
				editing = todos.find((row) => row.id == id);
				todoDescriptionField.value = editing.title;
				todoFormButton.innerHTML = `<i class="material-icons">edit</i>`;
			});
		});
	}
	// END: UPDATE

	// START: ACTION
	function actionEvents() {
		const todoDones = document.querySelectorAll(".todo .todo__complete");
		const todoRemoves = document.querySelectorAll(".todo .todo__remove");

		todoDones.forEach((item) => {
			item.addEventListener("click", async () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				const todos = await todo().get();
				const founded = todos.find((row) => row.id == id);
				await todo().complete(founded);
				list();
			});
		});

		todoRemoves.forEach((item) => {
			item.addEventListener("click", async () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				const todos = await todo().get();
				const founded = todos.find((row) => row.id == id);
				await todo().remove(founded);
				list();
			});
		});
	}
	// END: ACTION
})();
