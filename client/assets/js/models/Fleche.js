class Fleche {
	valeur = -8;
	#volee;

	constructor(volee, valeur) {
		this.#volee = volee;
		this.valeur = valeur;
	}
	getVolee() {
		return this.#volee;
	}
	getValue(shortReturn = false) {
		let value = (this.valeur == '10+' ? 10 : parseInt(this.valeur));
		value = (isNaN(value) ? 0 : value);
		value = (value < 0 ? 0 : value);
		if(shortReturn) return value;
		return [1, value, value, 0];
	}
	toString() {
		if(this.valeur > 10) return "10+";
		let value = parseInt(this.valeur);
		if(!isNaN(value) && value > 0) return value;
		return "0 - paille";
	}
}