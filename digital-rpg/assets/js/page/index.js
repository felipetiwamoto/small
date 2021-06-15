screen(".login");

const forms = document.querySelectorAll(`[data-form]`);

if (forms) {
	forms.forEach((form) => {
		form.addEventListener("click", () => {
			switch (form.getAttribute("data-form")) {
				case "login":
					return loginForm();
				case "register":
					return registerForm();
			}
		});
	});
}

function loginForm() {
	const username = document.querySelector(".screen--active.login #login__username");
	const password = document.querySelector(".screen--active.login #login__password");

	if (username.value.length <= 0 || password.value.length <= 0)
		return feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");
		
	const db = get("digital_rpg");
	const account = db.account.find((row) => row.username === username.value);
	
	console.log(username.value, account);

	if (!account) return feedback("Usuário não encontrado.");
	if (account.password !== password.value) return feedback("Senha incorreta.");

	set("logged", { account });
	window.location = "./personagens.html";
}

function registerForm() {
	const username = document.querySelector(".screen--active.register #register__username");
	const password = document.querySelector(".screen--active.register #register__password");

	if (username.value.length <= 0 || password.value.length <= 0)
		return feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");

	const db = get("digital_rpg");
	const account = db.account.find((row) => row.username === username.value);

	if (account) return feedback("Este usuário já existe.");
	
	if (!_account().add(username.value, password.value))
		return feedback("Ocorreu um erro. Por favor, atualize a página [F5] e tente novamente.");

	feedback("Usuário criado com sucesso. Você já pode entrar.");
	screen(".login");
}