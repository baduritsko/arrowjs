class Score {
	#nombreFleches = 0;
	#total = 0;
	#nombreVolees = 0;

	constructor(nombreVolees = 0, nombreFleches = 0, total = 0) {
		this.#nombreFleches = nombreFleches;
		this.#total = total;
		this.#nombreVolees = nombreVolees;
	}

	getTotal(asString = false) { 
		return asString ? accorder(this.#total, 'point', 'points', true) : this.#total; 
	}

	getNombreFleches(asString = false) { 
		return asString ? accorder(this.#nombreFleches, 'flèche', 'flèches', true) : this.#nombreFleches;
	}

	getNombreVolees(asString = false) { 
		return asString ? accorder(this.#nombreVolees, 'volée', 'volées', true) : this.#nombreVolees; 
	}

	getMoyenne() {
		if(this.#nombreFleches == 0) return 0;
		return Math.round(10 * this.#total / this.#nombreFleches) / 10;
	}

	hasValue() {
		return (this.#nombreFleches > 0);
	}

	addFleche(fleche) {
		if(fleche instanceof Fleche) {
			const score = fleche.getScore();
			this.#nombreFleches += 1;
			this.#total += score.getTotal();
		}
	}

	addVolee(volee) {
		if(volee instanceof Volee) {
			const score = volee.getScore();
			this.#nombreFleches += score.getNombreFleches();
			this.#total += score.getTotal();
			this.#nombreVolees += score.getNombreVolees();
		}
	}
}