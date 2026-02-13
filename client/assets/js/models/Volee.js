class Volee {
	idVolee;
	ordreVolee;
	#seance;
	heure;
	fleches;

	constructor(seance, ordreVolee, idVolee = null, heure = null) {
		this.idVolee = (idVolee == null) ? this.idVolee = crypto.randomUUID() : idVolee;
		this.#seance = seance;
		this.ordreVolee = ordreVolee;
		if(heure == null) {
			const now = new Date(Date.now());
			this.heure = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes());
		}
		else this.heure = heure;
		this.fleches = [];
	}
	
	getId() { return this.idVolee; }
	getSeance() { return this.#seance; }
	getFleches() { return this.fleches; }

	
	toString(longString = false) {
		let retour;
		retour =  this.ordreVolee + " - Volée à " + this.heure;
		if(longString) {
			const score = this.getScore();
			if(score.hasValue()) { //au moins une flèche
				
				retour = this.ordreVolee +  " - Volée de " + score.getNombreFleches(true) +  " à " + this.heure;
				retour += "<br>Total : " + score.getTotal(true) + ", moyenne : " + score.getMoyenne();
			}
		}
		return retour;
	}

	addFleche(fleche) {
		this.fleches.push(fleche);
		return fleche;
	}


	getScore() {
		toLog("get Score volée");
		const score = new Score();
		for(const fleche of this.fleches) {
			toLog("adding flèche");
			score.addFleche(fleche);
		}
		return score;
	}

	/**
	 * Retourne un boléen qui indique si une volée à au moins un flèche tirée
	 * @param {*} onTrue - la valeur à retourner si vrai (true par défaut)
	 * @param {*} onFalse - la valeur à retourner si faux (false par défaut)
	 * @returns - un booléen qui indique si une volée à au moins un flèche tirée
	 */
	hasValue(onTrue = true, onFalse = false) { 
		return (this.getScore().hasValue() ? onTrue : onFalse);
	}
}