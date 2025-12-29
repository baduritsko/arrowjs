class Fleche {
	valeur = -8;
	#volee;

	static valeursFleche = [
		{ name : 'Non tirée', value : '-8' },
		{ name : '10+', value : '11' },
		{ name : '10', value : '10' },
		{ name : '9', value : '9' },
		{ name : '8', value : '8' },
		{ name : '7', value : '7' },
		{ name : '6', value : '6' },
		{ name : '5', value : '5' },
		{ name : '4', value : '4' },
		{ name : '3', value : '3' },
		{ name : '2', value : '2' },
		{ name : '1', value : '1' },
		{ name : '0 - Paille', value : '0' },
		{ name : '0 - Perdue', value : '-1' }
	]

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