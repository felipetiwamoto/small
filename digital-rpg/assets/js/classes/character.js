function _character() {
	this.attr = {};

	return {
		get_by_id: (id) => {
			const db = get("digital_rpg");
			return db.character.find((row) => row.id == id);
		},
		get_by_logged: () => {
			const db = get("digital_rpg");
			const logged = get("logged");
			let characters = db.character.filter((row) => row.account_id === logged.account.id);
			characters = characters.map((row) => ({
				...row,
				job: db.job.find((relationRow) => relationRow.id * 1 === row.job * 1),
			}));
			return characters;
		},
		add: (name, job) => {
			this.attr.character = {
				id: Math.random(),
				account_id: get("logged").account.id,
				name: name,
				job: job,
				maxHP: 100,
				currentHP: 100,
				maxSP: 100,
				currentSP: 100,
				stat_point: 1,
				skill_point: 1,
				str: 1,
				agi: 1,
				vit: 1,
				int: 1,
				dex: 1,
				luk: 1,
				atk: 1,
				def: 1,
				matk: 1,
				mdef: 1,
				hit: 1,
				flee: 1,
				crit: 1,
				aspd: 1,
				exp: 0,
				zeny: 0,
			};

			const db = get("digital_rpg");
			const newDB = { ...db, character: [...db.character, this.attr.character] };
			set("digital_rpg", newDB);

			const record = get("digital_rpg").character.find((row) => row.id === this.attr.character.id);
			return record ? true : false;
		},
	};
}
