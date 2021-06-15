function characterStorage(characterID) {
	this.attr = {
		storage: [],
	};

	this.load = () => {
		const characterDB = get("digital_rpg").character_storage;
		this.attr.storage = characterDB.find((c) => c.id === characterID);
	};

	this.add = (item) => {};

	this.remove = (item) => {};
}
