function experience() {
	this.attr = {
		experience: {},
	};

	this.load = () => {
		const experienceDB = get("digital_rpg").experience;
		this.attr = experienceDB;
	};

	this.level = (level) => {};
}
