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
	getValue() {
		let value = (this.valeur == '10+' ? 10 : parseInt(this.valeur));
		value = isNaN(value) ? 0 : value;
		return [1, value, value];
	}
	toString() {
		return this.valeur;
	}
}