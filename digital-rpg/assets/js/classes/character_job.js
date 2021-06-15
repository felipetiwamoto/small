function characterJob(characterID) {
	this.attr = {
		job: {}
	};
	
	this.load = () => {
		const characterJobDB = get("digital_rpg").character_job;
		this.attr.job = characterJobDB.find((c) => (c.id === characterID));
	}
	
	this.change = () => {}
}
