(async () => {
	todo().init();
	list();

	// START: LIST
	function list() {
		const todoTbody = document.querySelector(".todo .todo__tbody");
		let html = ``;

		todo().get() &&
			[...todo().get()].forEach((row) => {
				if (!row.done) {
					html += `
						<tr class="todo__tr" data-id="${row.id}">
							<td class="todo__td">${row.description}</td>
							<td class="todo__td">
								<button class="todo__button todo__done btn btn-success btn-sm"><i class="fa fa-check"></i></button>
								<button class="todo__button todo__remove btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
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

	// START: INSERT
	const todoInsertForm = document.querySelector(".todo .todo__insert_form");
	const todoInsertDescriptionField = document.querySelector(".todo .todo__insert_form .description");

	todoInsertForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if (todoInsertDescriptionField.value.trim().length <= 0) return;
		todo().insert({ description: todoInsertDescriptionField.value });
		list();
		todoInsertDescriptionField.value = "";
		todoInsertDescriptionField.focus;
	});
	// END: INSERT

	// START: UPDATE
	function updateTableEvents() {
		const todoTrs = document.querySelectorAll(".todo .todo__tbody .todo__td:not(:last-child)");
		const todoUpdateForm = document.querySelector(".todo .todo__update_form");
		const todoUpdateIdField = document.querySelector(".todo .todo__update_form .id");
		const todoUpdateDescriptionField = document.querySelector(".todo .todo__update_form .description");

		todoTrs.forEach((item) => {
			item.addEventListener("click", () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				const founded = todo().get() && [...todo().get()].find((row) => row.id == id);

				todoUpdateIdField.value = founded.id;
				todoUpdateDescriptionField.value = founded.description;

				todoInsertForm.classList.remove("todo__insert_form--active");
				todoUpdateForm.classList.add("todo__update_form--active");
			});
		});
	}

	const todoUpdateForm = document.querySelector(".todo .todo__update_form");
	const todoUpdateIdField = document.querySelector(".todo .todo__update_form .id");
	const todoUpdateDescriptionField = document.querySelector(".todo .todo__update_form .description");

	todoUpdateForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if (todoUpdateDescriptionField.value.trim().length <= 0) return;
		todo().update({ description: todoUpdateDescriptionField.value }, todoUpdateIdField.value);
		list();
		todoInsertForm.classList.add("todo__insert_form--active");
		todoUpdateForm.classList.remove("todo__update_form--active");
		todoInsertDescriptionField.focus;
	});
	// END: UPDATE

	// START: ACTION
	function actionEvents() {
		const todoDones = document.querySelectorAll(".todo .todo__done");
		const todoRemoves = document.querySelectorAll(".todo .todo__remove");

		todoDones.forEach((item) => {
			item.addEventListener("click", () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				todo().done(id);
				list();
			});
		});

		todoRemoves.forEach((item) => {
			item.addEventListener("click", () => {
				const id = item.closest(".todo__tr").getAttribute("data-id");
				todo().remove(id);
				list();
			});
		});
	}
	// END: ACTION
})();
