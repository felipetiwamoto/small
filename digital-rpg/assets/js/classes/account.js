function _account() {
	this.attr = {};

	return {
		load: () => {
			const accountDB = get("digital_rpg").account;
			this.attr.account = accountDB.find((c) => c.id === accountID);
		},
		add: (username, password) => {
			this.attr.account = {
				id: Math.random(),
				username: username,
				password: password
			};

			const db = get("digital_rpg");
			const newDB = { ...db, account: [...db.account, this.attr.account] };
			set("digital_rpg", newDB);

			const record = get("digital_rpg").account.find((row) => row.id === this.attr.account.id);
			return record ? true : false;
		},
	};
}
