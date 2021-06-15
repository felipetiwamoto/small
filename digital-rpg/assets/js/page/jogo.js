// START: BATTLE
const fps = 30;
let playerActionTimer = 70;
let playerActionTimerEl = document.querySelector(".screen.battle .hud .player__timer");

function timer() {
	playerActionTimer = playerActionTimer > 0 ? --playerActionTimer : 0;
	playerActionTimerEl.style.width = playerActionTimer + "px";
	return playerActionTimer === 0;
}

function shortcut() {
	document.onkeyup = function (e) {
		if (!timer()) return false;
		
		if([1,2,3,4,5,6,7,8,9,0].find((item) => (item == e.key))){
			playerActionTimer = 70;
		}
	};
}

setInterval(() => {
	if (!timer()) return false;
	shortcut();
}, 1000 / fps);
// END: BATTLE

// START: MENU
const menuEvents = document.querySelectorAll(`[data-menu]`);

menuEvents.forEach((e) => {
	e.addEventListener("click", () => menu(e.getAttribute(`data-menu`)));
});

function menu(selector) {
	const menus = document.querySelectorAll(`.menu`);
	const menu = document.querySelector(`.menu${selector}`);

	menus.forEach((item) => item.classList.remove("menu--active"));
	menu.classList.add("menu--active");
}
// END: MENU

screen(".battle");
