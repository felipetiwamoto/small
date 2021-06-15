const forms = document.querySelectorAll(`[data-form]`);

if (forms) {
	forms.forEach((form) => {
		form.addEventListener("click", () => {
			switch (form.getAttribute("data-form")) {
				case "character_add":
					return characterAddForm();
			}
		});
	});
}

// START: ADD
function characterAddForm() {
	const name = document.querySelector(".screen--active.character__add #character__add__name");
	const job = document.querySelector(".screen--active.character__add #character__add__job");

	if (!name || !job) return feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");

	if (!_character().add(name.value, job.value))
		feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");

	name.value = "";
	job.value = "1";

	populateLoggedCharacters();
	screen(".character__select");
}

function jobFieldPopulate() {
	const db = get("digital_rpg");
	const characterSelect = document.querySelector(".screen.character__add #character__add__job");

	if (characterSelect) {
		let options = ``;

		db.job.forEach((job) => {
			options += `<option value="${job.id}">${job.name}</option>`;
		});

		characterSelect.innerHTML = options;
	}
}

jobFieldPopulate();
// END: ADD

// START: SELECT
function populateLoggedCharacters() {
	const characterList = document.querySelector(".screen.character__select .character__list");

	const characters = _character().get_by_logged();
	let html = ``;

	characters.forEach((row) => {
		html += `
		<div class="character__list__item" data-id="${row.id}">
			${row.name} - ${row.job.name}
		</div>
		`;
	});
	characterList.innerHTML = html;
	characterListEvent();
}

function characterListEvent() {
	const characterListItems = document.querySelectorAll(".screen.character__select .character__list__item");

	if (characterListItems) {
		characterListItems.forEach((character) => {
			character.addEventListener("click", () => {
				if (character.getAttribute("data-id").length <= 0)
					return feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");

				const newLogged = {
					...get("logged"),
					character: _character().get_by_id(character.getAttribute("data-id")),
				};
				set("logged", newLogged);
				window.location = "./jogo.html";
			});
		});
	}
}
// END: SELECT

populateLoggedCharacters();
screen(".character__select");
