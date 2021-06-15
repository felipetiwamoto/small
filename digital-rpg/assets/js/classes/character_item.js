function characterItem(characterID) {
	this.attr = {
		item: [],
	};

	this.load = () => {
		const characterDB = get("digital_rpg").character_item;
		this.attr.item = characterDB.find((c) => c.id === characterID);
	};
	
	this.use = (item) => {}
}
