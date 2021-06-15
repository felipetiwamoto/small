function characterSkill(characterID) {
	this.attr = {
		skill: {},
	};

	this.load = () => {
		const characterDB = get("digital_rpg").character_skill;
		this.attr.skill = characterDB.find((c) => c.id === characterID);
	};
	
	this.use = (item) => {}
	
	this.passiveCalc = (item) => {}
}
