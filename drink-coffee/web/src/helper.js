export function isLogged() {
	const logged = JSON.parse(localStorage.getItem("logged")) || {};
	return Object.keys(logged).length > 0;
}

export function timestamps(date) {
	const d = new Date(date * 1000);
	const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
	const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
	return day + "/" + month + "/" + d.getFullYear();
}

export function money(value, currency = "$") {
	value = value.length > 0 ? value : 0;
	return `${currency} ${parseFloat(value).toFixed(2)}`;
}
