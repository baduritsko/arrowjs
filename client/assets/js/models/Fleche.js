class Fleche {
	valeur;
	#volee;

	constructor(volee, valeur) {
		this.#volee = volee;
		this.valeur = valeur;
	}
	getVolee() {
		return this.#volee;
	}
}