function characterEquip(characterID) {
	this.attr = {
		equip: {
			head_01: null,
			head_02: null,
			head_03: null,
			back_01: null,
			back_02: null,
			back_03: null,
			left_hand: null,
			right_hand: null,
			top: null,
			bottom: null,
			glove: null,
			boot: null,
		}
	};
	
	this.load = () => {
		const characterEquipDB = get("digital_rpg").character_equip;
		this.attr.equip = characterEquipDB.find((c) => (c.id === characterID));
	}
	
	this.equip = () => {}
	
	this.unequip = () => {}
	
	this.passiveCalc = () => {}
}
