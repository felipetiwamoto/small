function _enemy(level) {
	this.names = ["Slime", "Goblin", "Orc"];
	return {
		generate: () => {
			this.attr.enemy = {
				name: name,
				maxHP: 100,
				currentHP: 100,
				maxSP: 100,
				currentSP: 100,
				stat_point: 1,
				skill_point: 1,
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
		},
	};
}
