// START: SCREEN
const screenEvents = document.querySelectorAll(`[data-screen]`);

screenEvents.forEach((e) => {
	e.addEventListener("click", () => screen(e.getAttribute(`data-screen`)));
});

function screen(selector) {
	const screens = document.querySelectorAll(`.screen`);
	const screen = document.querySelector(`.screen${selector}`);

	screens.forEach((item) => item.classList.remove("screen--active"));
	screen.classList.add("screen--active");
}
// END: SCREEN

// START: DATABASE
function get(name) {
	const data = JSON.parse(localStorage.getItem(name));
	return Object.keys(data || {}).length > 0 ? data : false;
}

function set(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
}

function initDatabase() {
	if (!get("digital_rpg")) {
		const database = {
			account: [],
			character: [],
			character_equip: [],
			character_item: [],
			character_skill: [],
			character_storage: [],
			experience: [],
			item: [],
			job: [
				{ id: 1, name: "Espadachim" },
				{ id: 2, name: "Mago" },
				{ id: 3, name: "Gatuno" },
				{ id: 4, name: "Mercador" },
				{ id: 5, name: "Noviço" },
				{ id: 6, name: "Arqueiro" },
			],
			map: [],
			skill: [],
			storage: [],
		};

		set("digital_rpg", database);
	}
}

initDatabase();
// END: DATABASE

// START: FEEDBACK
function feedback(message) {
	const feedback = document.querySelector(".feedback");
	feedback.style.color = "red";
	feedback.innerHTML = message;

	setTimeout(() => {
		feedback.innerHTML = "";
	}, 5000);
}
// END: FEEDBACK
